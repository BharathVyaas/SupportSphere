import { Route, Routes, useLocation } from "react-router";
import CrowdFunding from "../components/CrowdFunding";
import FundraiserMainNavigation from "../ui/FundrainserMainNavigation";
import { Link } from "react-router-dom";

/**
 * Component for the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function Fundraiser() {
  const { pathname } = useLocation();
  const sideNavList = [
    { id: 1, link: "medical-expenses", title: "Medical Expenses" },
    { id: 2, link: "education-fund", title: "Education Fund" },
    { id: 3, link: "community-projects", title: "Community Projects" },
    { id: 4, link: "disaster-relief", title: "Disaster Relief" },
    {
      id: 5,
      link: "nonprofit-organizations",
      title: "Nonprofit Organizations",
    },
  ];
  return (
    <>
      {/* Header Section */}
      <header className="flex justify-between fixed top-0 bg-text text-bg w-full h-[9vh]">
        {/* Logo */}
        <button className="min-h-full font-roboto font-bold text-2xl px-8 text-left [text-shadow:_0px_2px_3px_#f2f2f4]">
          SupportSphere
        </button>
        {/* Main Navigation */}
        <FundraiserMainNavigation />
        {/* User Actions */}
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto mt-10">
        <aside className="w-[260px] h-[91vh] fixed top-[9vh] left-0 text-bg flex flex-col justify-between bg-text">
          <nav>
            <ul className="mt-2">
              {sideNavList.map((element) => (
                <li className="px-8 py-2 mt-2" key={element.id}>
                  <Link
                    to={`${pathname}/${element.link}`}
                    className="text-[1.1rem]"
                  >
                    {element.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button className="mx-3 my-2 px-5 py-4 bg-orange-700">
            Need Help?
          </button>
        </aside>
        <Routes>
          <Route path="crowdfunding" element={<CrowdFunding />} />
          {/* Add other routes as needed */}
        </Routes>
      </main>
    </>
  );
}

export default Fundraiser;
