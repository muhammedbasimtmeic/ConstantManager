"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UserProfileModal = dynamic(() => import("../user/UserProfileModal"));
const AddSidebarGroup = dynamic(() => import("../sidebar/AddSidebarGroupModal"));
const DeleteSidebarGroupModal = dynamic(() => import("../sidebar/deleteSidebarGroupModal"));
const DeleteSidebarTableModal = dynamic(() => import("../sidebar/deleteSidebarTableModal"));
const EditSidebarGroup = dynamic(() => import("../sidebar/EditSidebarGroupModal"));
const UnGroupSidebarTableModal = dynamic(() => import("../sidebar/UngroupSidebarTableModal"));
const AddSidebarTableModal = dynamic(() => import("../sidebar/AddSidebarTableModal"));

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UserProfileModal />
      <AddSidebarGroup />
      <AddSidebarTableModal />
      <EditSidebarGroup />
      <DeleteSidebarGroupModal />
      <DeleteSidebarTableModal />
      <UnGroupSidebarTableModal />
    </>
  );
};
