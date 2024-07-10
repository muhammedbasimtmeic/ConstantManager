"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const DeleteSidebarGroupModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { deleteId } = data;
  const isModalOpen = isOpen && type === "deleteSidebarGroup";

  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (id: number) => {
    setIsLoading(true);
    try {
      const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/group/${id}`,
      });
      await axios.delete(url);
      toast.success(`Sidebar Group Deleted Successfully`);
      queryClient.invalidateQueries({ queryKey: ["sideBarList"] });
      queryClient.invalidateQueries({ queryKey: ["ungroupedTables"] });
      setIsLoading(false);
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to delete Sidebar Group");
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-gradient-to-b from-stone-300 to-stone-100 text-black overflow-hidden p-3 w-[400px] border-none gap-2"
        hideCloseButton={true}
      >
        <DialogHeader className="space-y-0 p-4 rounded-b-3xl ">
          <DialogTitle className="text-center text-2xl ">Are you sure to delete</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center p-0">Please confirm to delete, Action will permanatly delete the sidebar group</DialogDescription>
        <DialogFooter className="flex gap-2 mt-4">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onSubmit(deleteId)} disabled={isLoading}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSidebarGroupModal;
