import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "../ui/table";
import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  rows: number;
  cols: number;
}

const TableSkeleton = ({ rows = 10, cols = 5 }: TableSkeletonProps) => {
  return (
    <div className="flex flex-col space-y-10">
      {/* <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div> */}
      <div className="border rounded-md bg-white p-4">
        <div className="py-4 flex justify-between">
          <Skeleton className="h-7 w-[350px]" />
          <Skeleton className="h-7 w-[100px]" />
        </div>

        <div className="flex justify-between rounded-md shadow-sm">
          <Table className="border rounded-md bg-white p-4">
            <TableHeader className="rounded-md hover">
              <TableRow key={1} className="text-center">
                {Array.from({ length: cols }).map((value, index) => (
                  <TableHead key={index} className={cn("py-4 px-3 space-y-2 bg-zinc-200", index == 0 && "w-[100px]", index == 1 && "w-[50px]")}>
                    <Skeleton className={cn("h-5 w-full bg-zinc-100")} />
                    <Skeleton className={cn("h-5 w-full bg-zinc-100")} />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="rounded-md">
              {Array.from({ length: rows }).map((value, index) => (
                <TableRow key={index} className="text-center">
                  {Array.from({ length: cols }).map((value, index) => (
                    <TableCell key={index} className={cn("py-4 px-3 space-y-2 bg-zinc-100", index == 0 && "w-[100px]", index == 1 && "w-[50px]")}>
                      <Skeleton className={cn("h-5 w-full bg-zinc-300")} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="py-5 flex justify-between">
          <Skeleton className="h-5 w-[200px] " />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-[50px]" />
            <Skeleton className="h-5 w-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
