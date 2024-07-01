"use client";
import React from "react";
import SideBarItem from "./SidebarItem";
import useGetSideBarQuery from "@/hooks/useGetSideBarQuery";
import Loading from "../Loading";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Settings } from "lucide-react";

// const fetchSideBarData = async (): Promise<SidebarData> => {
//   const url = "/api/sideBarList";
//   console.log("render sidebar");

//   try {
//     const res = await fetch(encodeURI(url));
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const sidebardata = await res.json();
//     return sidebardata;
//   } catch (error) {
//     console.error("Failed to fetch data:", error);
//     throw new Error("Failed to fetch data");
//   }
// };

const SideBarMenu = () => {
  const { isSuccess, isPending, data } = useGetSideBarQuery();
  const isAdmin = true;
  return (
    <nav className="p-3 sticky top-0 flex flex-col">
      {/* <DropdownMenu>
        <DropdownMenuTrigger className="w-full flex p-2 text-zinc-600 borcer-b">
          <Settings className="w-5 h-5 mr-2" />
          <span className="font-semibold text-sm">Settings</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Create New Sidebar Group</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}

      {isPending ? (
        <Loading />
      ) : (
        <ScrollArea className="h-[600px] pe-2">
          {data?.map((sidebarGroup) => (
            <SideBarItem
              key={sidebarGroup.id}
              id={sidebarGroup.id}
              title={sidebarGroup.title}
              description={sidebarGroup.description}
              icon={sidebarGroup.icon}
              tables={sidebarGroup.tables}
            />
          ))}
        </ScrollArea>
      )}
    </nav>
  );
};

export default SideBarMenu;
