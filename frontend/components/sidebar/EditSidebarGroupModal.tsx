"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import qs from "query-string";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormDescription, FormField, FormMessage, FormItem, FormLabel } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { Blocks } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import Icon from "../Icon";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const iconNames = Object.keys(dynamicIconImports) as (keyof typeof dynamicIconImports)[];

const formSchema = z.object({
  title: z.string().min(1, { message: "Name is Required" }).max(20, { message: "Name should be less than 20 character" }),
  description: z.string(),
  icon: z.string(),
});

const EditSidebarGroup = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { sidebarGroupData } = data;
  console.log(sidebarGroupData);
  const isModalOpen = isOpen && type === "editSidebarGroup";

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

  useEffect(() => {
    if (sidebarGroupData) {
      form.setValue("title", sidebarGroupData?.title);
      form.setValue("description", sidebarGroupData?.description);
      form.setValue("icon", sidebarGroupData?.icon);
    }
  }, [sidebarGroupData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/group/${sidebarGroupData?.id}`,
      });
      await axios.put(url, values);
      toast.success(`Sidebar Group Updated Successfully - ${form.getValues("title")}`);
      queryClient.invalidateQueries({ queryKey: ["sideBarList"] });

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to update Sidebar Group");
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
      <DialogContent className="bg-gradient-to-b from-stone-300 to-stone-100 text-black overflow-hidden p-0 w-[400px] border-none gap-2">
        <DialogHeader className="space-y-0 p-4 rounded-b-3xl ">
          <DialogTitle className="flex justify-center items-center gap-2">
            <Blocks className="w-7 h-7" />
            Update Sidebar Group
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center p-0">Add new group to the sidebar here</DialogDescription>

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
                        className="bg-zinc-300/60 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
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
                        className="bg-zinc-300/60 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
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
                        className="bg-zinc-300/60 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Group Icon name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <div className="border-2 rounded-md border-zinc-300 border-dashed flex justify-between items-center w-full mt-3 p-3 h-14">
                      <p className="font-semibold text-zinc-500">Icon Preview</p>
                      <Icon name={form.getValues("icon") as keyof typeof dynamicIconImports} className="w-8 h-8 text-zinc-500" />
                    </div>

                    {/* <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}> */}
                    {/* <FormControl> */}
                    {/* <SelectTrigger className="bg-zinc-300/60 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"> */}
                    {/* <SelectValue placeholder="Select a Channel Icon" /> */}
                    {/* </SelectTrigger> */}
                    {/* </FormControl> */}
                    {/* <SelectContent> */}
                    {/* {Object.values(iconNames).map((icon) => ( */}
                    {/* <SelectItem key={icon} value={icon} className="flex gap-2"> */}
                    {/* <Icon name={icon} className="w-5 h-5 mr-2" /> */}
                    {/* {icon.toLowerCase()} */}
                    {/* </SelectItem> */}
                    {/* ))} */}
                    {/* </SelectContent> */}
                    {/* </Select> */}
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="default" disabled={isLoading}>
                Update Group
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSidebarGroup;
