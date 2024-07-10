"use client";

import { useEffect, useState } from "react";
import UserProfileModal from "../user/UserProfileModal";
import AddSidebarGroup from "../sidebar/AddSidebarGroupModal";
import DeleteSidebarGroupModal from "../sidebar/deleteSidebarGroupModal";
import DeleteSidebarTableModal from "../sidebar/deleteSidebarTableModal";
import EditSidebarGroup from "../sidebar/EditSidebarGroupModal";
import UnGroupSidebarTableModal from "../sidebar/UngroupSidebarTableModal";
import AddSidebarTableModal from "../sidebar/AddSidebarTableModal";

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
