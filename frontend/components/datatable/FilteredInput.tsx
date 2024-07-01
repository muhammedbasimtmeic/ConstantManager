"use-client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Column } from "@tanstack/react-table";
import { CircleXIcon, ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import DebouncedInput from "./DebounceInput";

import React from "react";

const Filter = ({ column }: { column: Column<any, unknown> }) => {
  const [columnFilterValue, setColumnFilterValue] = useState(column.getFilterValue());
  const { filterVariant } = column.columnDef.meta ?? {};
  switch (filterVariant) {
    case "range":
      return (
        <div className="flex space-x-1 text-muted-foreground text-xs w-full">
          {/* See faceted column filters example for min max values functionality */}
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
            placeholder={`Min`}
            className="min-w-20 bg-white text-muted-foreground text-xs w-full border-none"
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
            placeholder={`Max`}
            className="min-w-20 bg-white text-muted-foreground text-xs w-full border-none"
          />
        </div>
      );
    case "select":
      return (
        <div className="relative w-full">
          <Select onValueChange={(value) => column.setFilterValue(value)} value={columnFilterValue?.toString()}>
            <SelectTrigger className="w-full bg-white text-muted-foreground text-xs">
              <SelectValue placeholder={columnFilterValue?.toString() || "Choose"} className="w-full" />
            </SelectTrigger>
            <SelectContent sideOffset={10} alignOffset={10}>
              {column.columnDef.meta?.constrains?.map((option) => {
                return (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {column.getIsFiltered() && (
            <CircleXIcon
              onClick={() => {
                column.setFilterValue("");
                setColumnFilterValue("");
              }}
              className="absolute -top-2 -right-2 w-4 h-4 font-thin"
            />
          )}
        </div>
      );

    default:
      return (
        <div className="relative w-full">
          <DebouncedInput
            className="min-w-48 bg-white text-muted-foreground text-xs w-full border-none"
            onChange={(value) => column.setFilterValue(value)}
            placeholder="Search..."
            type="text"
            value={(columnFilterValue ?? "") as string}
          />
          {column.getIsFiltered() && <ListFilter className="w-4 h-4 text-black absolute right-3 top-1/2 -translate-y-1/2" />}
        </div>
      );
  }
};

export default Filter;
