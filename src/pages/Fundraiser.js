import { Outlet } from "react-router";

import FundraiserMainNavigation from "../ui/FundraiserMainNavigation";

/**
 * Component for the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function Fundraiser() {
  console.log("Fundraiser:render");
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
        <Outlet />
      </main>
    </>
  );
}

export default Fundraiser;
