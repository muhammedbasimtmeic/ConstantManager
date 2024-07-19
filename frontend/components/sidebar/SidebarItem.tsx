import { useState } from "react";
import Icon from "../Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from "lucide-react";
import ActionTooltip from "../ToolTip";
import { useParams } from "next/navigation";
import TableInfoPopover from "./tableInfoPopover";

interface ExtendedSidebarItem extends SidebarItem {
  accordinState: string[]; // New prop
  updateAccordinState?: CallableFunction;
}

const SideBarItem = ({ title, id, description, icon, tables, accordinState, updateAccordinState }: ExtendedSidebarItem) => {
  const params = useParams();
  const subMenuActive = tables.some((table) => table.id == params?.tableId);

  return (
    <AccordionItem value={id} className={cn("rounded-r-lg w-full")}>
      <AccordionTrigger
        className={cn(
          "p-3 group relative hover:bg-gradient-to-r from-orange-500 to-amber-400 hover:no-underline transition-all",
          subMenuActive && "bg-zinc-300 ",
          accordinState.includes(id) ? "rounded-tr-lg bg-zinc-300" : "rounded-r-lg"
        )}
      >
        <div
          className={cn(
            "absolute left-0 bg-orange-700 transition-all w-[4px] group-hover:h-full",
            (accordinState.includes(id) || subMenuActive) && "h-full"
          )}
        />
        <div className="flex">
          <Icon name={icon as keyof typeof dynamicIconImports} className="w-5 h-5 mr-2 group-hover:text-white" />
          <span className=" font-semibold no-underline group-hover:text-white">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul className={cn("rounded-r-lg ", accordinState.includes(id) && "border-l-4 border-orange-700 rounded-br-lg")}>
          {tables.map((subMenu: SideBarTableData, index) => (
            <li
              key={subMenu.id}
              aria-details={subMenu.name}
              className={cn(
                "w-full group last-of-type:rounded-br-lg  text-zinc-700 items-center hover:text-white bg-zinc-200 hover:bg-gradient-to-r from-orange-500 to-amber-400 transition-all",
                params?.tableId == subMenu.id && "bg-gradient-to-r from-zinc-700 to-zinc-600 text-white shadow"
              )}
            >
              <Link className="flex w-full justify-between p-3" href={`/table/${subMenu.id}`}>
                <div className="flex items-center w-[80%] overflow-hidden">
                  <Icon name={subMenu.icon as keyof typeof dynamicIconImports} className="w-5 h-5 mr-2" />
                  <p className="font-semibold ">{subMenu.tableName.length > 10 ? `${subMenu.tableName.slice(0, 20)}..` : subMenu.tableName}</p>
                </div>
                <TableInfoPopover {...subMenu}>
                  <Info className="w-4 h-4 text-blue-500 group-hover:text-white" />
                </TableInfoPopover>
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SideBarItem;
