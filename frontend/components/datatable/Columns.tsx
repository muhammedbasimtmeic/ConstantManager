"use client";

import React, { useState } from "react";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { toast } from "sonner";
import { Ellipsis, PinOff, Pin, X } from "lucide-react";
import { format, parseISO } from "date-fns";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";

import TableHeading from "./TableHeading";
import ActionTooltip from "../ToolTip";
import { cn } from "@/lib/utils";

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

export const createColumnDef = (columnDefnition: columnDefnitionType[]): ColumnDef<any>[] => {
  // function render cell element based on the column dataType
  const renderInput = (dataType: string, value: string | boolean | undefined | number, isPrimaryKey: boolean, constrains: []) => {
    const [fieldValue, setFieldValue] = useState(value);

    if (isPrimaryKey) {
      return <span>{fieldValue}</span>;
    }

    if (constrains.length > 0) {
      return (
        <Select value={fieldValue as string} onValueChange={(value) => setFieldValue(value)}>
          <SelectTrigger className={cn("w-[200px] ", value !== fieldValue && "bg-orange-300 text-red-800")}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {constrains.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    switch (dataType) {
      case "number":
        return (
          <Input
            value={fieldValue as string}
            type="number"
            className={cn("text-center py-0 shadow-none border-none", value !== fieldValue && "bg-orange-300 text-red-800")}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        );
      case "text":
        return (
          <Input
            value={fieldValue as string}
            className={cn("text-center py-0 shadow-none border-none", value !== fieldValue && "bg-orange-300 text-red-800")}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        );
      case "date":
        return (
          // <DateField
          //   value={fieldValue ? dayjs(fieldValue as string) : null}
          //   format="DD-MM-YYYY"
          //   variant="outlined"
          //   size="small"
          //   className="p-0 text-sm"
          //   fullWidth
          // />
          <Input
            value={fieldValue ? format(parseISO(fieldValue as string), "yyyy-MM-dd") : undefined}
            type="date"
            className={cn(
              "text-center py-0 shadow-none border-none w-full",
              value !== fieldValue && "bg-orange-300 text-red-800",
              !fieldValue && "text-muted-foreground"
            )}
            onChange={(e) => setFieldValue(e.target.value)}
          />
        );
      case "time":
        return (
          <Input
            value={fieldValue ? format(parseISO(fieldValue as string), "HH:mm:ss") : undefined}
            type="time"
            className={cn(
              "text-center py-0 shadow-none border-none w-full",
              value !== fieldValue && "bg-orange-300 text-red-800",
              !fieldValue && "text-muted-foreground"
            )}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          // <TimeField
          //   value={fieldValue ? dayjs(value as string) : null}
          //   format="HH:mm:ss"
          //   variant="outlined"
          //   size="small"
          //   fullWidth
          //   className="p-0 !border-none"
          // />
        );
      case "datetime":
        return (
          <Input
            value={fieldValue ? format(parseISO(fieldValue as string), "DD-MM-YYYY HH:mm:ss") : undefined}
            type="datetime-local"
            className={cn(
              "text-center py-0 shadow-none border-none w-full",
              value !== fieldValue && "bg-orange-300 text-red-800",
              !fieldValue && "text-muted-foreground"
            )}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          // <DateTimeField value={value ? dayjs(fieldValue as string) : null} format="DD-MM-YYYY HH:mm:ss" variant="outlined" size="small" fullWidth />
        );
      case "boolean":
        return <Checkbox checked={!!fieldValue} onCheckedChange={(prev) => setFieldValue(!prev)} />;
      default:
        return <span>{fieldValue}</span>;
    }
  };

  const columnDefOrginal: ColumnDef<any>[] = [
    {
      id: "pin",
      size: 50,
      header: ({ table }) => (
        <div className="flex flex-col gap-2">
          <TableHeading title="Pin" describtion="Unpin All" />
          <Button
            variant="ghost"
            onClick={() => {
              table.getIsSomeRowsPinned() && table.resetRowPinning();
            }}
          >
            {table.getIsSomeRowsPinned() === true ? (
              <PinOff className="w-4 h-4 rotate-45 text-violet-700 hover:scale-110 transition-all" />
            ) : (
              <Pin className="w-4 h-4 rotate-45 text-violet-700 hover:scale-110 transition-all" />
            )}
          </Button>
        </div>
      ),
      cell: ({ row }) =>
        row.getIsPinned() ? (
          <Button variant="ghost" size="icon" onClick={() => row.pin(false)}>
            <X className="w-4 h-4 text-red-700 hover:scale-110 transition-all" />
          </Button>
        ) : (
          <div className="flex justify-center">
            {/* Pin to Top Button */}
            <Button variant="transparent" size="icon" onClick={() => row.pin("top")}>
              <Pin className="w-4 h-4 rotate-45 text-violet-700 hover:scale-110 transition-all" />
            </Button>
            {/* Pin to Bottom Button - Disabled now*/}
            {/* <Button variant="ghost" size="icon" onClick={() => row.pin("bottom")}>
          <Pin className="w-4 h-4 rotate-45 text-violet-700 hover:scale-110 transition-all" />
        </Button> */}
          </div>
        ),
    },
    // Row select column
    {
      id: "select",
      size: 25,
      header: ({ table }) => (
        <ActionTooltip label="Select/Unselect All" side="bottom">
          <Checkbox
            checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            aria-label="Select all"
            className="mx-4"
          />
        </ActionTooltip>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mx-4"
        />
      ),
      enableHiding: false,
      enableSorting: false,
      enablePinning: true,
    },
    // Row selection column
    {
      id: "action",
      header: () => <TableHeading title=" Actions " describtion="Row Actions" />,
      size: 80,
      cell: ({ row }) => {
        const person = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none focus:shadow-outline">
                <span className="sr-only">Open menu</span>
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(person)).then(() => {
                    toast("Data copied to clipboard");
                  })
                }
              >
                Copy JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Lock</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
      enableSorting: false,
      enablePinning: true,
    },
  ];

  // # craete other columnDef object from the defnition object
  columnDefnition?.forEach((columnDef: columnDefnitionType) => {
    const { title, id, description, dataType, isPrimaryKey, constrains } = columnDef;

    let colObj: ColumnDef<any> = {
      accessorKey: id,
      header: () => <TableHeading title={title} describtion={description} />,
      cell: ({ row }) => {
        const cellValue = row.original[id];
        return renderInput(dataType, cellValue as string, isPrimaryKey, constrains as []);
      },
      meta: {
        isPrimaryKey,
        filterVariant: (() => {
          if (constrains && constrains.length > 0) {
            return "select";
          }
          if (dataType === "number") {
            return "range";
          } else if (dataType === "boolean") {
            return "select";
          } else {
            return "text";
          }
        })(),

        constrains: (() => {
          if (dataType === "boolean") {
            return ["True", "False"];
          } else {
            return constrains || [];
          }
        })(),
      },
    };
    columnDefOrginal.push(colObj);
  });

  return columnDefOrginal;
};
