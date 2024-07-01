"use client";
import React, { Suspense } from "react";
import Loading from "../Loading";
import SideBarMenu from "./SidebarMenu";

const SideBarMenuWrapper = () => (
  <Suspense fallback={<Loading />}>
    <SideBarMenu />
  </Suspense>
);

export default SideBarMenuWrapper;
