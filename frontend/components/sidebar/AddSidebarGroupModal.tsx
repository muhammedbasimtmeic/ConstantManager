"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import qs from "query-string";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormDescription, FormField, FormMessage, FormItem, FormLabel } from "@/components/ui/form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { Blocks } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import Icon from "../Icon";
import { useQueryClient } from "@tanstack/react-query";

const iconNames = Object.keys(dynamicIconImports) as (keyof typeof dynamicIconImports)[];

const formSchema = z.object({
  title: z.string().min(1, { message: "Name is Required" }).max(20, { message: "Name should be less than 20 character" }),
  description: z.string(),
  icon: z.string(),
});

const AddSidebarGroup = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "addSidebarGroup";

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "boxes",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/group`,
      });
      await axios.post(url, values);
      toast.success(`New Sidebar Group Created Successfully - ${form.getValues("title")}`);
      queryClient.invalidateQueries({ queryKey: ["sideBarList"] });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to create new Sidebar Group");
      console.log(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gradient-to-br from-[#ececec] via-[#e6ecf7] to-[#f6eeff] text-black overflow-hidden p-1 w-[400px] border-none gap-2">
        <DialogHeader className="space-y-0 p-4 rounded-md text-zinc-700">
          <DialogTitle className="flex justify-center items-center gap-2">
            <Blocks className="w-7 h-7" />
            Add New Group
          </DialogTitle>
          <DialogDescription className="text-center p-2">Add new group to the sidebar here</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4 px-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Group Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none"
                        placeholder="Enter Group Name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Group Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none"
                        placeholder="Enter Group Description"
                        {...field}
                      ></Input>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70"> Group Icon</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-200/60 border-zinc-400 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 outline-none"
                        placeholder="Enter Group Icon name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <div className="border-2 rounded-md border-zinc-300 border-dashed flex justify-between items-center w-full mt-3 p-3 h-14">
                      <p className="font-semibold text-zinc-500">Icon Preview</p>
                      <Icon name={form.getValues("icon") as keyof typeof dynamicIconImports} className="w-8 h-8 text-sky-600" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant="outline" type="reset" disabled={isLoading}>
                Reset
              </Button>
              <Button variant="default" type="submit" disabled={isLoading}>
                Add Group
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSidebarGroup;
