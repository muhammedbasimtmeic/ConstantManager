"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModal } from "@/hooks/useModalStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, ShieldAlert, ShieldCheck, User, UserCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

const UserControl = () => {
  const user = useCurrentUser();
  const { onOpen } = useModal();

  if (!user) {
    return (
      <Avatar>
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    );
  }

  const roleIconMap = {
    USER: null,
    GUEST: null,
    MODERATOR: <ShieldCheck className="w-4 h-4 ml-3 text-indigo-500" />,
    ADMIN: <ShieldAlert className="w-4 h-4 ml-3 text-rose-500" />,
  };

  return (
    <div className="flex gap-4 items-center">
      <h1 className="text-zinc-100 font-semibold text-base"> {user.name}</h1>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="shadow border-white border-1">
          <Avatar>
            <AvatarImage src={user.image} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} side="bottom" alignOffset={50} className="min-w-48">
          <DropdownMenuLabel className="flex  items-center">
            <UserCircle2 className="w-8 h-8 mr-3 text-zinc-600" />
            <div>
              <div className="flex items-center">
                <p className="font-bond text-md text-zinc-600">{user.name}</p>
                {roleIconMap[user.role]}
              </div>
              <p className="font-semibold text-sm text-zinc-400">{user.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            role="dialog"
            onClick={() =>
              onOpen("userProfile", {
                profile: {
                  name: user.name,
                  role: user.role as any,
                  image: user.image,
                  email: user.email,
                },
              })
            }
          >
            <Settings className="w-4 h-4 mr-2" />
            <p className="font-semibold">Profile</p>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-red-600 hover:text-red-600"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <p className="font-semibold">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserControl;
