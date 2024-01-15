import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import arrowIcon from "../assets/icons/arrow-down-active.png";

import { sideNavContext } from "../context/sideNav";

/**
 * Variants for animating the title of each side navigation item.
 * @type {Object}
 */
const titleVariants = {
  hidden: { opacity: 0.7, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

/**
 * Variants for animating the list of side navigation items.
 * @type {Object}
 */
const listVariants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * Component representing the side navigation bar.
 * @component
 * @returns {JSX.Element} The rendered JSX element for the SideNav component.
 */
function SideNav() {
  const { pathname } = useLocation();

  /**
   * Array of side navigation items.
   * @type {Array.<Object>}
   */
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

  /**
   * Side navigation context for controlling the visibility of the side navigation bar.
   * @type {Object}
   */
  const { showSideNav, setShowSideNav } = useContext(sideNavContext);

  return (
    <>
      <AnimatePresence>
        {showSideNav && (
          <motion.aside
            initial={{ x: -200, opacity: 0.7 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { duration: 0.6 },
            }}
            exit={{ x: -260, opacity: 0.8, transition: { duration: 0.6 } }}
            className="w-[260px] h-[91vh] fixed top-[9vh] left-0 text-bg flex flex-col justify-between bg-text shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.40)]"
          >
            <button
              onClick={() => setShowSideNav(false)}
              className="absolute w-7 h-12 -right-7 bottom-1/2 rounded-r-full grid place-content-center text-white bg-text shadow-[0_25px_50px_-12px_rgb(0_0_0_/_0.40)]"
            >
              <motion.img
                animate={{ rotate: 90, x: -4 }}
                exit={{ rotate: 270, x: 0 }}
                src={arrowIcon}
                alt="arrow"
                width="20"
                height="15"
              />
            </button>
            <nav>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                {sideNavList.map((element) => (
                  <motion.li
                    variants={titleVariants}
                    className="px-8 py-2 mt-2"
                    key={element.id}
                  >
                    <Link
                      to={`${pathname}/${element.link}`}
                      className="text-[1.1rem]"
                    >
                      {element.title}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <button className="mx-3 my-3 py-3 bg-red rounded-xl">
              Need Help?
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
      {!showSideNav && (
        <aside className="w-[2px] h-[91vh] fixed top-[9vh] left-0 bg-text">
          <motion.button
            onClick={() => setShowSideNav(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute w-7 h-12 -right-7 bottom-1/2 rounded-r-full grid place-content-center text-white bg-text shadow-2xl"
          >
            <motion.img
              animate={{ rotate: 270 }}
              src={arrowIcon}
              alt="arrow"
              width="20"
              height="15"
            />
          </motion.button>
        </aside>
      )}
    </>
  );
}

export default SideNav;
