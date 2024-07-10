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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ArrowRight, Monitor, Moon, Settings, Sun, SunMoon, TestTube, Wrench } from "lucide-react";
import Link from "next/link";

const SideBarMenu = () => {
  const { isSuccess, isPending, data } = useGetSideBarQuery();
  const isAdmin = true;
  return (
    <nav className="p-3 flex flex-col h-full">
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
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="w-full flex p-2 text-zinc-700 bg-zinc-200 mt-auto items-center border border-zinc-300 rounded-md shadow-sm hover:shadow-md hover:bg-gradient-to-r from-orange-500 to-amber-400 hover:text-zinc-100 transition-all duration-500">
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-semibold ">Settings</span>
          <ArrowRight className="w-5 h-5 ml-auto" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">
            <p>App Settings</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/sidebar-setting">
            <DropdownMenuItem className="flex items-center text-zinc-700">
              <Wrench className="w-5 h-5 mr-3" />
              <p className="font-semibold text-sm">Configure Sidebar</p>
            </DropdownMenuItem>
          </Link>
          <Link href="/background">
            <DropdownMenuItem className="flex items-center text-zinc-700">
              <TestTube className="w-5 h-5 mr-3" />
              <p className="font-semibold text-sm">Test</p>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default SideBarMenu;
