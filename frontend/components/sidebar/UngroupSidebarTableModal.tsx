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

const UnGroupSidebarTableModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { unGroupTableId } = data;
  const isModalOpen = isOpen && type === "unGroupSidebarTable";

  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (id: number) => {
    setIsLoading(true);
    try {
      const url = qs.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/sidebar/item/ungroup/${id}`,
      });
      await axios.put(url);
      toast.success(`Sidebar table moved to ungrouped tables Successfully`);
      queryClient.invalidateQueries({ queryKey: ["sideBarList"] });
      queryClient.invalidateQueries({ queryKey: ["ungroupedTables"] });
      setIsLoading(false);
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to remove sidebar table");
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
          <DialogTitle className="text-center text-2xl ">Are you sure</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center p-0">Please confirm to move table out of the current group</DialogDescription>
        <DialogFooter className="flex gap-2 mt-4">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onSubmit(unGroupTableId as number)} disabled={isLoading}>
            Move Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnGroupSidebarTableModal;
