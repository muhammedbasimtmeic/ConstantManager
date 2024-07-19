import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TableInfoPopoverProps extends SideBarTableData {
  children: React.ReactNode;
}

const TableInfoPopover = ({ id, tableName, dbName, schemaName, description, icon, children, name }: TableInfoPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-fit bg-gradient-to-b from-slate-50 to-zinc-50" side="right">
        <div className="grid gap-4">
          <div className="space-y-1 ">
            <h3 className="font-medium leading-none text-center text-zinc-700">{name}</h3>
            <p className="text-sm text-muted-foreground text-center ">Table Details</p>
          </div>
          <div className="grid space-y-1 divide-y divide-zinc-200">
            <div className="grid grid-cols-3 items-center gap-4 ">
              <p className="text-zinc-600 text-sm">Database</p>
              <p id="Database" className="col-span-2 text-sky-600 font-semibold">
                {dbName}
              </p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 ">
              <p className="text-zinc-600 text-sm">Schema</p>
              <p id="Schema" className="col-span-2 text-sky-600 font-semibold">
                {schemaName}
              </p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 ">
              <p className="text-zinc-600 text-sm">Table</p>
              <p id="TableName" className="col-span-2 text-sky-600 font-semibold">
                {tableName}
              </p>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 ">
              <p className="text-zinc-600 text-sm">Description</p>
              <p id="Description" className="col-span-2 text-sky-600 font-semibold max-w-64 text-wrap">
                {description}
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TableInfoPopover;
