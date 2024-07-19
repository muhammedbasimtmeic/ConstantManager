"use client";

import React, { useState } from "react";
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
import { ArrowRight, Monitor, Moon, Settings, Sun, SunMoon, TestTube, TriangleAlert, Wrench } from "lucide-react";
import Link from "next/link";
import { Accordion } from "../ui/accordion";

const SideBarMenu = () => {
  const { isSuccess, isPending, data } = useGetSideBarQuery();
  const [accordinState, setAccordinState] = useState<string[]>([]);

  const handleValueChange = (value: string) => {
    setAccordinState((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value); // Remove the id if it's already in the state
      } else {
        return [...prev, value]; // Add the id if it's not in the state
      }
    });
  };

  return (
    <nav className="p-3 flex flex-col h-full relative">
      {isPending ? (
        <Loading />
      ) : (
        <ScrollArea className="h-[600px] pe-2 max-w-[270px]">
          {data?.length == 0 && (
            <div className="flex flex-col gap-2 items-center">
              <TriangleAlert className="w-9 h-9 text-red-500" />
              <p className="font-normal text-sm text-center text-wrap text-zinc-600"> Sidebar is not Configured...</p>
            </div>
          )}
          {data?.map(({ id, title, icon, description, tables }) => (
            <Accordion type="multiple" className="p-0 mb-1" value={accordinState} onValueChange={() => handleValueChange(id)}>
              <SideBarItem key={id} id={id} title={title} description={description} icon={icon} tables={tables} accordinState={accordinState} />
            </Accordion>
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
