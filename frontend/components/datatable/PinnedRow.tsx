import { Row, Table, flexRender } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const PinnedRow = ({ row, table }: { row: Row<any>; table: Table<any> }) => {
  return (
    <TableRow
      className={cn(row.getIsSelected() && "border-2 border-black")}
      style={{
        backgroundColor: "lightblue",
        position: "sticky",
        top:
          row.getIsPinned() === "top"
            ? `${row.getPinnedIndex() * 26 + 48}px`
            : undefined,
        bottom:
          row.getIsPinned() === "bottom"
            ? `${
                (table.getBottomRows().length - 1 - row.getPinnedIndex()) * 26
              }px`
            : undefined,
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <TableCell
            key={cell.id}
            className={cn(
              "text-center first:sticky",
              cell.column.columnDef.meta?.isPrimaryKey &&
                "text-blue-800 font-semibold"
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default PinnedRow;
