"use client";
import { useState } from "react";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import ActionTooltip from "../ToolTip";
import { useModal } from "@/hooks/useModalStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SidebarTableListItemManage from "./ManageSidebarTableListItem";

const SidebarGorupManage = ({ id, title, description, icon, tables }: SidebarItem) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen } = useModal();
  return (
    <Accordion type="single" collapsible className="w-full p-0" onValueChange={() => setIsOpen((prev) => !prev)}>
      <AccordionItem value={id} className={cn("shadow-lg p-0 transition-all relative rounded-xl", isOpen && "bg-zinc-100 drop-shadow-md")}>
        <AccordionTrigger
          className={cn(
            "p-3  group relative overflow-hidden border bg-gradient-to-r from-zinc-100 to-zinc-200 border-amber-500 hover:opacity-100 opacity-95",
            isOpen ? "rounded-t-xl" : "rounded-xl"
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

        <AccordionContent className="p-2 grid sm:grid-cols-1 md:grid-cols-2 gap-2">
          {tables?.length == 0 && <p className="text-sm text-zinc-600">No Table found</p>}
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
    </Accordion>
  );
};

export default SidebarGorupManage;
