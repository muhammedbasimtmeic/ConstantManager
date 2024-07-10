"use client";

import { PlusSquare } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";
import useGetSideBarQuery from "@/hooks/useGetSideBarQuery";
import { Button } from "../ui/button";
import { BoxesLoadingSkeleton } from "../Loading";
import SidebarGorupManage from "./ManageSidebarGorupListItem";

const SidebarGorupManageWrapper = () => {
  const { onOpen } = useModal();
  const { isSuccess, isPending, data: sidebarGroups } = useGetSideBarQuery();

  return (
    <div className="p-1">
      <h1 className="text-lg font-semibold text-sky-500">Sidebar Groups</h1>
      <p className="text-sm text-zinc-600 text-wrap line-clamp-2">Add new sidebar groups and manage existing here</p>

      <div className="mt-4 flex justify-end items-center group p-2 ps-4 shadow-md border border-zinc-300 rounded-md transition-all hover:shadow-lg">
        <p className="font-bold text-zinc-700 mr-auto">Actions</p>
        <Button onClick={() => onOpen("addSidebarGroup")}>
          <PlusSquare className="w-6 h-6 mr-2" /> Add New Group
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <h1 className="text-lg font-semibold text-zinc-700">Sidebar Groups</h1>
        {isSuccess ? (
          sidebarGroups?.map(({ id, title, icon, description, tables }: SidebarItem) => (
            <SidebarGorupManage key={id} id={id} title={title} icon={icon} description={description} tables={tables} />
          ))
        ) : (
          <BoxesLoadingSkeleton count={9} className="bg-zinc-300" />
        )}
      </div>
    </div>
  );
};

export default SidebarGorupManageWrapper;
