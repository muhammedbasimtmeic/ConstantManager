"use client";
import { useState } from "react";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit, Trash2 } from "lucide-react";
import ActionTooltip from "../ToolTip";
import { useModal } from "@/hooks/useModalStore";
import SidebarTableListItemManage from "./ManageSidebarTableListItem";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface ExtendedSidebarItem extends SidebarItem {
  accordinState: string; // New prop
  updateAccordinState: CallableFunction;
}

const updateSidebarItemGroup = async (groupId: string, tableId: string) => {
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/item/group/${tableId}/${groupId}`);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error updating sidebar item group:", error);
    return false;
  }
};

const SidebarGorupManage = ({ id, title, description, icon, tables, accordinState, updateAccordinState }: ExtendedSidebarItem) => {
  const { onOpen } = useModal();
  const [draggingOver, setDraggingOver] = useState<{ [key: string]: boolean }>({});
  const queryClient = useQueryClient();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dropZoneId: string) => {
    e.preventDefault();
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: true }));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, dropZoneId: string) => {
    e.preventDefault();
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: true }));
  };

  const handleDragLeave = (dropZoneId: string) => {
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: false }));
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, dropZoneId: string) => {
    e.preventDefault();
    setDraggingOver((prev) => ({ ...prev, [dropZoneId]: false }));
    const tableData: SideBarTableData = JSON.parse(e.dataTransfer.getData("application/json"));
    handleDrop(id, tableData.id);
    console.log(tableData);
  };
  ``;
  const handleDrop = async (groupId: string, tableId: string) => {
    const res = await updateSidebarItemGroup(groupId, tableId);
    if (res) {
      queryClient.invalidateQueries({ queryKey: ["sideBarList"] });
      queryClient.invalidateQueries({ queryKey: ["ungroupedTables"] });
      toast.success("Table moved to group");
    } else {
      toast.error("Failed to move the table to the group");
    }
  };

  return (
    <AccordionItem
      value={id}
      className={cn("shadow-lg p-0 transition-all relative rounded-xl", accordinState === id && "bg-zinc-100 drop-shadow-md")}
      onDragOver={(e) => handleDragOver(e, id)}
      onDragEnter={(e) => handleDragEnter(e, id)}
      onDragLeave={() => handleDragLeave(id)}
      onDrop={(e) => handleDragDrop(e, id)}
    >
      <AccordionTrigger
        onDragOver={() => updateAccordinState(id)}
        className={cn(
          "p-3  group relative overflow-hidden border bg-gradient-to-r from-zinc-100 to-zinc-200 border-amber-500 hover:opacity-100 opacity-95",
          accordinState === id ? "rounded-t-xl" : "rounded-xl"
        )}
      >
        <div className="flex items-center w-full z-20 text-white">
          <Icon name={icon as keyof typeof dynamicIconImports} className="w-8 h-8 mr-4" />
          <div className="flex flex-col items-start ">
            <p className="font-bold text-lg ">{title}</p>
            <p className="font-semibold text-md  text-zinc-200 max-w-96 text-wrap line-clamp-2">{description}</p>
          </div>
          <div className="group-hover:flex hidden gap-3 ml-auto mr-10 text-zinc-600">
            <ActionTooltip label="Edit Group Settings" side="left">
              <Edit
                className="w-5 h-5 "
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen("editSidebarGroup", {
                    sidebarGroupData: { id: id, title: title, description: description, icon: icon as string },
                  });
                }}
              />
            </ActionTooltip>
            <ActionTooltip label="Delete Group" side="left">
              <Trash2
                className="w-5 h-5 0"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen("deleteSidebarGroup", { deleteId: id });
                }}
              />
            </ActionTooltip>
          </div>
        </div>
        <div className=" absolute -rotate-45 rounded-3xl -left-16 top-1/3 -translate-y-1/2 min-w-96 min-h-96 shadow bg-gradient-to-r from-orange-500 to-amber-400 z-0" />
        <div className=" absolute -rotate-45 rounded-3xl -left-20 top-1/3 -translate-y-1/2 min-w-96 min-h-96 shadow bg-gradient-to-r from-sky-950 to-sky-900 z-10" />
      </AccordionTrigger>

      <AccordionContent className="p-2 grid sm:grid-cols-1 md:grid-cols-2 gap-2 min-h-20 ">
        {draggingOver[id] && (
          <div className="w-full group p-2 rounded-xl  border-2 border-dashed border-zinc-600 bg-zinc-300/60 text-center text-zinc-600"> New</div>
        )}
        {tables?.length == 0 && !draggingOver[id] && <p className="text-sm text-zinc-600">No Table found</p>}
        {tables?.map((table: SideBarTableData, index) => (
          <SidebarTableListItemManage
            key={index}
            id={table.id}
            name={table.name}
            tableName={table.tableName}
            schemaName={table.schemaName}
            dbName={table.dbName}
            description={table.description}
            icon={table.icon}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SidebarGorupManage;
