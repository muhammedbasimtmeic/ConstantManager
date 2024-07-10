import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import ActionTooltip from "../ToolTip";
import { Edit, Plus, PlusSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModalStore";
import Loading, { BoxesLoadingSkeleton } from "../Loading";
import { Button } from "../ui/button";

export const UngroupedTables = () => {
  const { onOpen } = useModal();

  const fetchData = async (): Promise<SideBarTableData[]> => {
    const url = qs.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/items/ungrouped`,
    });
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Network response was not ok");
    }
  };

  const {
    isLoading,
    isSuccess,
    data: unGroupedTables,
  } = useQuery({
    queryKey: ["ungroupedTables"],
    queryFn: fetchData,
    staleTime: Infinity,
    refetchInterval: false,
  });

  if (isLoading) return <BoxesLoadingSkeleton count={5} />;

  return (
    <div className="p-1 w-full">
      <h1 className="text-lg font-semibold text-sky-500">Ungrouped Tables</h1>
      <p className="text-sm text-zinc-600 text-wrap line-clamp-2">Add new table to the side bar hear and drag and drop to the groups</p>
      <div className="mt-4 flex justify-end items-center group p-2 ps-4 shadow-md border border-zinc-300 rounded-md transition-all hover:shadow-lg  ">
        <p className="font-bold text-zinc-700 mr-auto">Actions</p>
        <Button onClick={() => onOpen("AddSidebarTable")}>
          <Plus className="w-6 h-6 mr-2" /> Add New Table
        </Button>
      </div>
      <div className="mt-4 space-y-3">
        <h1 className="text-lg font-semibold text-zinc-600">Ungrouped Tables</h1>

        {unGroupedTables?.length ? (
          unGroupedTables?.map(({ id, name, tableName, schemaName, dbName, description, icon }) => (
            <div
              key={id}
              className={cn(
                "w-full group p-2 rounded-xl text-zinc-700 items-center border border-zinc-400 drop-shadow  bg-gradient-to-r from-zinc-100 to-zinc-200 transition-all hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-1">
                <Icon name={icon as keyof typeof dynamicIconImports} className="w-8 h-8 mr-2" />
                <div className="flex flex-col">
                  <p className="font-semibold">{tableName}</p>
                  <p className="text-zinc-500 max-w-96 text-wrap line-clamp-2">{description}</p>
                </div>
                <div className="group-hover:flex gap-3 ml-auto mr-2 hidden transition-all">
                  <ActionTooltip label="Edit Table Settings">
                    <Edit
                      className="w-4 h-4 text-zinc-600"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </ActionTooltip>
                  <ActionTooltip label="Delete Table from sidebar">
                    <Trash2
                      className="w-4 h-4 text-zinc-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpen("deleteSidebarTable", { deleteId: id });
                      }}
                    />
                  </ActionTooltip>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-dashed border-zinc-400 w-full h-48 rounded-xl">
            <p className="p-4 text-md text-zinc-600"> No ungrouped tables found</p>
          </div>
        )}
      </div>
    </div>
  );
};
