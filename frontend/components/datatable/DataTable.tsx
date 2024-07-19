"use client";

import React, { useEffect, useRef, useState } from "react";
import { Columns3, Key, ArrowUp, ArrowDown, Settings } from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  RowData,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnPinningState,
  RowPinningState,
} from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { DataTablePagination } from "./Pagination";

import { cn } from "@/lib/utils";
import Filter from "./FilteredInput";
import PinnedRow from "./PinnedRow";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
    isPrimaryKey?: boolean;
    constrains?: string[];
    min?: number;
    max?: number;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  // To fix the hydration warning
  const [isMounted, setIsMounted] = useState(false);

  const globalSearchRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [copyPinnedRows, setCopyPinnedRows] = useState(false);
  const [rowPinning, setRowPinning] = useState<RowPinningState>({
    top: [],
    bottom: [],
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    onColumnPinningChange: setColumnPinning,

    //  enableSorting: false,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      columnPinning,
    },
    initialState: {
      columnPinning: {
        left: ["select", "action"],
        right: [],
      },
    },
  });

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        globalSearchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => document.removeEventListener("keydown", keyDown);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="rounded-md p-4 shadow-md bg-white relative">
      {/* header filter column select */}
      <div className="flex items-center py-4 justify-between">
        {/* Global Search Filed */}
        <div className="relative flex items-center w-96">
          <Input
            placeholder="Search in Table"
            ref={globalSearchRef}
            value={(globalFilter as string) || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full"
          />
          <div className="absolute bg-zinc-300/20 border border-zinc-300/20 text-muted-foreground px-[2px] text-sm rounded-md right-2 top-1/2 -translate-y-1/2">
            ⌘+K
          </div>
        </div>
        <div className="flex gap-2">
          {/* table settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm" className="m-auto">
                <Settings className="mr-2 w-4 h-4" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex justify-between items-center w-[250px]" onSelect={(e) => e.preventDefault()}>
                <span className="text-xs">Keep Orginal of Pinned Row</span>
                <Switch
                  checked={copyPinnedRows}
                  onCheckedChange={() => {
                    setCopyPinnedRows((prev) => !prev);
                  }}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* vivible columns */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="default" size="sm" className="ml-auto">
                <Columns3 className="mr-2 w-4 h-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* table */}
      <div className="shadow-md ">
        <Table className="border-none ">
          <TableHeader className="rounded-t-md border-none">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id} className="border-none rounded-t-md bg-gradient-to-b from-stone-400 to-stone-300 ">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="p-1 text-center text-nowrap border-none  text-zinc-800 first-of-type:rounded-tl-md last-of-type:rounded-tr-md"
                        style={{ minWidth: `${header.getSize()}px` }}
                      >
                        <div className="flex flex-col gap-1 w-full justify-start items-start">
                          <Button
                            variant="transparent"
                            size="sm"
                            className="p-0 w-full flex justify-center items-center gap-2"
                            onClick={() => {
                              header.column.toggleSorting(header.column.getIsSorted() === "asc");
                            }}
                            onDoubleClick={() => {
                              header.column.clearSorting();
                            }}
                          >
                            {header.column.columnDef.meta?.isPrimaryKey && <Key className="w-3 h-3" />}
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() ? (
                              header.column.getIsSorted() === false ? (
                                // <ArrowDownUp className="ml-0 h-3 w-3" />
                                ""
                              ) : header.column.getIsSorted() === "asc" ? (
                                <ArrowUp className="ml-0 h-3 w-3" />
                              ) : (
                                <ArrowDown className="ml-0 h-3 w-3" />
                              )
                            ) : null}
                          </Button>
                          {header.column.getCanFilter() ? <Filter column={header.column} /> : null}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody className="">
            {/* pinned Rows */}
            {table.getTopRows().map((row) => (
              <PinnedRow key={row.id} row={row} table={table} />
            ))}

            {/* unpinned rows */}
            {table.getRowModel().rows?.length ? (
              (copyPinnedRows ? table.getRowModel().rows : table.getCenterRows()).map((row) => {
                return (
                  <TableRow key={row.id} className={cn("bg-white mx-2 rounded-md", row.getIsSelected() && "!bg-[#cfe4fa] rounded-md")}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn("text-center p-1", cell.column.columnDef.meta?.isPrimaryKey && "text-blue-800 font-semibold")}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className=" text-stone-700 font-semibold">
                  No Data Found ..
                </TableCell>
              </TableRow>
            )}
            {/* bottomn pinned rows */}
            {table.getBottomRows().map((row) => (
              <PinnedRow key={row.id} row={row} table={table} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* footer pagination */}
      <div className="w-full py-4 h-1/5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}

export default DataTable;
