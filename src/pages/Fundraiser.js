import { Route, Routes } from "react-router";
import CrowdFunding from "../components/CrowdFunding";
import FundraiserMainNavigation from "../ui/FundrainserMainNavigation";

/**
 * Component for the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function Fundraiser() {
  return (
    <>
      {/* Header Section */}
      <header className="flex justify-between bg-text text-bg min-h-16">
        {/* Logo */}
        <button className="min-h-full font-roboto font-bold text-2xl px-9 w-1/4 text-left [text-shadow:_0px_2px_3px_#f2f2f4]">
          SupportSphere
        </button>
        {/* Main Navigation */}
        <FundraiserMainNavigation />
        {/* User Actions */}
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto mt-10">
        <Routes>
          <Route path="crowdfunding" element={<CrowdFunding />} />
          {/* Add other routes as needed */}
        </Routes>
      </main>
    </>
  );
}

export default Fundraiser;
