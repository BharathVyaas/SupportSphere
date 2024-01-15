import React from "react";
import { Outlet } from "react-router";

import SideNav from "../ui/SideNav";
import { SideNavProvider } from "../context";

function CrowdFunding() {
  console.log("CrowdFunding:render");

  return (
    <>
      <SideNavProvider>
        <SideNav />
      </SideNavProvider>
      <Outlet />
    </>
  );
}

export default CrowdFunding;
