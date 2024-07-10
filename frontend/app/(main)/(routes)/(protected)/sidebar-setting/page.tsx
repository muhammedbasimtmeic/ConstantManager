"use client";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { UngroupedTables } from "@/components/sidebar/UngroupedTables";

const SidebarGorupManageWrapper = dynamic(() => import("@/components/sidebar/ManageSidebarGorupListWrapper"), {
  loading: () => (
    <>
      <Loading />
    </>
  ),
});

const SidebarSettingsPage = () => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="p-6 w-full z-10">
        <header className="w-full">
          <h1 className="font-bold text-2xl  text-sky-950">Sidebar Settings</h1>
          <p className="text-sm  text-zinc-500 line-clamp-2 text-wrap">
            Configure the sidebar Groups here. Drag and drop the tables between the groups to re-arrage
          </p>
        </header>
        <section className="w-full h-auto grid grid-cols-1 lg:grid-cols-3  gap-8">
          <div className="mt-6 col-span-2">
            <SidebarGorupManageWrapper />
          </div>
          <div className="mt-6 col-span-1">
            <UngroupedTables />
          </div>
        </section>
      </main>
    </DragDropContext>
  );
};

export default SidebarSettingsPage;
