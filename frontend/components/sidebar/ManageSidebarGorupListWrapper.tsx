"use client";

import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";
import useGetSideBarQuery from "@/hooks/useGetSideBarQuery";
import { Button } from "../ui/button";
import Loading, { BoxesLoadingSkeleton } from "../Loading";
import dynamic from "next/dynamic";
import { Accordion } from "../ui/accordion";
import { useState } from "react";

const SidebarGroupManage = dynamic(() => import("./ManageSidebarGorupListItem"), {
  loading: () => <BoxesLoadingSkeleton count={9} className="bg-zinc-300" />,
});

const SidebarGroupManageWrapper = () => {
  const { onOpen } = useModal();
  const [accordinState, setAccordinState] = useState("");
  const { isSuccess, isPending, data: sidebarGroups } = useGetSideBarQuery();

  return (
    <div className="p-1">
      <h1 className="text-lg font-semibold text-sky-500">Sidebar Groups</h1>
      <p className="text-sm text-zinc-600 text-wrap line-clamp-2">Add new sidebar groups and manage existing here</p>

      <div className="mt-4 flex justify-end items-center group p-2 ps-4 shadow-md border border-zinc-300 rounded-md transition-all hover:shadow-lg">
        <p className="font-bold text-zinc-700 mr-auto">Actions</p>
        <Button onClick={() => onOpen("addSidebarGroup")}>
          <Plus className="w-6 h-6 mr-2" /> Add New Group
        </Button>
      </div>

      <div className="mt-4 space-y-3 h-auto">
        <h1 className="text-lg font-semibold text-zinc-700">Sidebar Groups</h1>
        {isPending && <BoxesLoadingSkeleton count={9} className="bg-zinc-300" />}
        {isSuccess && sidebarGroups?.length === 0 ? (
          <div className="border border-dashed border-zinc-400 w-full h-72 rounded-xl">
            <p className="p-4 text-md text-zinc-600"> No groups found</p>
          </div>
        ) : (
          sidebarGroups?.map(({ id, title, icon, description, tables }) => (
            <Accordion type="single" collapsible={true} className="w-full p-0" value={accordinState} onValueChange={() => setAccordinState(id)}>
              <SidebarGroupManage
                key={id}
                id={id}
                title={title}
                icon={icon}
                description={description}
                tables={tables}
                accordinState={accordinState}
                updateAccordinState={setAccordinState}
              />
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarGroupManageWrapper;
