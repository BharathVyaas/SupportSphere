import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import FundraiserMainNavigation from "../ui/FundraiserMainNavigation";
import SideNav from "../ui/SideNav";

// Context
import { SideNavProvider } from "../context";

// Lazy Loading
const CrowdFunding = lazy(() => import("../components/CrowdFunding"));

/**
 * Component for the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function Fundraiser() {
  return (
    <>
      {/* Header Section */}
      <header className="flex justify-between fixed top-0 bg-text text-bg w-full h-[9vh] shadow-2xl">
        {/* Logo */}
        <button className="min-h-full font-roboto font-bold text-2xl px-8 text-left [text-shadow:_0px_2px_3px_#f2f2f4ef]">
          SupportSphere
        </button>
        {/* Main Navigation */}
        <FundraiserMainNavigation />
        {/* User Actions */}
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto mt-10">
        <SideNavProvider>
          <SideNav />
        </SideNavProvider>
        <Routes>
          <Route
            path="crowdfunding"
            element={
              <Suspense fallback="loading...">
                <CrowdFunding />
              </Suspense>
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </main>
    </>
  );
}

export default Fundraiser;
