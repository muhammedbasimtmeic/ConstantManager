"use client";
import { useState } from "react";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import ActionTooltip from "../ToolTip";
import { useModal } from "@/hooks/useModalStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SidebarTableListItemManage = ({ id, name, dbName, tableName, schemaName, description, icon }: SideBarTableData) => {
  const { onOpen } = useModal();

  return (
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
          <ActionTooltip label="Edit Table Settings" side="left">
            <Edit
              className="w-4 h-4 text-zinc-600"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </ActionTooltip>
          <ActionTooltip label="Delete from the group / Move to ungrouped" side="left">
            <SquareArrowOutUpRight
              className="w-4 h-4 text-zinc-600"
              onClick={(e) => {
                e.stopPropagation();
                onOpen("unGroupSidebarTable", { unGroupTableId: parseInt(id) });
              }}
            />
          </ActionTooltip>
        </div>
      </div>
    </div>
  );
};

export default SidebarTableListItemManage;
