import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import arrow from "../assets/icons/arrow-down-active.png";

import { sideNavContext } from "../context/sideNav";

function SideNav() {
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

  const { showSideNav, setShowSideNav } = useContext(sideNavContext);

  return (
    <AnimatePresence>
      {showSideNav && (
        <motion.aside
          exit={{ x: -260, transition: { duration: 0.6 } }}
          className="w-[260px] h-[91vh] fixed top-[9vh] left-0 text-bg flex flex-col justify-between bg-text"
        >
          <button
            onClick={() => setShowSideNav(false)}
            className="absolute w-7 h-12 -right-7 bottom-1/2 rounded-r-full grid place-content-center text-white bg-text"
          >
            <motion.img
              animate={{ rotate: 270, x: -1.2 }}
              exit={{ rotate: 90, x: 0 }}
              src={arrow}
              alt="arrow"
              width="20"
              height="15"
            />
          </button>
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
          <button className="mx-3 my-3 py-3 bg-red rounded-xl">
            Need Help?
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default SideNav;
