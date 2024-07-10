"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

import qs from "query-string";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormDescription, FormField, FormMessage, FormItem, FormLabel } from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, Edit, EllipsisVertical, ShieldAlert, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }).max(20, { message: "Name should be less than 20 character" }),
  image: z.string(),
});

const CreateChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { profile } = data;
  console.log(profile);

  const roleIconMap = {
    USER: null,
    MODERATOR: <ShieldCheck className="w-5 h-5 ml-3 text-indigo-500" />,
    ADMIN: <ShieldAlert className="w-5 h-5 ml-3 text-rose-500" />,
  };

  const isModalOpen = isOpen && type === "userProfile";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-stone-50 text-black overflow-hidden p-0 w-[400px] border-none" hideCloseButton={true}>
        <DialogHeader className="bg-gradient-to-b from-stone-400 to-stone-200 space-y-0 p-3 rounded-b-3xl ">
          <DialogTitle className=" flex justify-between items-center ">
            <ChevronLeft className="w-6 h-6" />
            <h1 className="text-center text-3xl font-bold text-zinc-800">{profile?.name}</h1>
            <EllipsisVertical className="w-6 h-6" />
          </DialogTitle>
          <Image
            src={profile?.image as string}
            alt={profile?.name.toUpperCase()[0] as string}
            width={120}
            height={120}
            className="mx-auto drop-shadow-sm"
          />
          <h1 className="text-center text-md font-semibold text-zinc-600 ">{profile?.email}</h1>
        </DialogHeader>
        <div className="p-3 mx-auto">
          <Tabs defaultValue="account" className="w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="shadow-none">
                <CardHeader className="flex-col">
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={profile?.name} />
                  </div>
                </CardContent>
                <CardFooter className="gap-2 justify-end">
                  <Button variant="outline" onClick={() => handleClose()}>
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="shadow-none">
                <CardHeader className="flex-col">
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="gap-2 justify-end">
                  <Button variant="outline" onClick={() => handleClose()}>
                    Cancel
                  </Button>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
