import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import arrowActive from "../assets/icons/arrow-down-active.png";
import arrowDisabled from "../assets/icons/arrow-down-disabled.png";
import arrowMenuAttach from "../assets/icons/arrow-down-MenuAttach.png";

/**
 * Array of route information.
 * @type {Array}
 */
const routes = [
  { id: 1, link: "/crowdfunding", textContent: "Crowdfunding" },
  { id: 2, link: "/events", textContent: "Events" },
  { id: 3, link: "/sponsorships", textContent: "Sponsorships" },
  { id: 4, link: "/membership-programs", textContent: "Membership Programs" },
  { id: 5, link: "/awareness-campaigns", textContent: "Awareness Campaigns" },
];

const activeMenuAnimation = {
  rotation: 270,
  damping: 6,
  delay: 0,
};

const openMenuAnimation = {
  rotation: 0,
  damping: 9,
  delay: 0,
};

const menuVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
};

const menuItemVariants = {
  hidden: {
    x: 40,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

/**
 * Component for the main navigation in the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function FundraiserMainNavigation() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isMenuAvailable, setIsMenuAvailable] = useState(true);
  const [arrowAnimationValues, setArrowAnimationValues] = useState({
    rotation: 270,
    damping: 5,
    delay: 0.1,
  });

  /**
   * Variants for the hover animation.
   * @type {Object}
   */
  const variants = {
    hover: {
      scale: 1.18,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        type: "spring",
        duration: 1,
        damping: 10,
        stiffness: 50,
      },
    },
    arrowAnimations: {
      rotateZ: arrowAnimationValues.rotation,
      transition: {
        delay: arrowAnimationValues.delay,
        duration: 1,
        type: "spring",
        damping: arrowAnimationValues.damping,
      },
    },
  };

  return (
    <nav className="relative">
      <ul className="grid place-content-center grid-flow-col my-auto min-h-full text-[1.1rem]">
        {routes.map((route) => (
          <motion.li
            key={route.id}
            variants={variants}
            whileHover="hover"
            className="px-4 line-clamp-1 text-shadow"
          >
            <NavLink
              className="[text-shadow:_0px_1px_4px_#f2f2f4]"
              to={route.link}
            >
              {route.textContent}
            </NavLink>
          </motion.li>
        ))}
        <li className="grid place-content-center ml-1 p-2">
          <motion.button
            variants={variants}
            animate="arrowAnimations"
            className="z-[100]"
            onClick={() => {
              if (isMenuActive) {
                setArrowAnimationValues(activeMenuAnimation);
                setIsMenuActive(false);
              } else {
                if (isMenuAvailable) {
                  setArrowAnimationValues(openMenuAnimation);
                  setIsMenuActive(true);
                }
              }
            }}
          >
            {isMenuAvailable && (
              <img src={arrowActive} alt="arrow" width="14" height="15" />
            )}
            {!isMenuAvailable && (
              <img
                src={arrowDisabled}
                alt="arrowdisabled"
                width="14"
                height="15"
              />
            )}
          </motion.button>
          <AnimatePresence>
            {isMenuActive && (
              <aside className="absolute top-[60%] right-0">
                <div className="hidden">
                  Icons made by
                  <a
                    href="https://www.flaticon.com/authors/taufik"
                    title="Taufik"
                  >
                    Taufik
                  </a>
                  from
                  <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com'
                  </a>
                </div>
                <motion.section
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute -top-2 right-0 shadow-2xl overflow-x-hidden overflow-y-auto z-10"
                  transition={{ staggerChildren: 1 }}
                  exit={{
                    x: 50,
                    opacity: 0,
                    transition: { duration: 0.8 },
                  }}
                >
                  <motion.img
                    src={arrowMenuAttach}
                    width="30"
                    className="absolute right-0 rotate-180 pb-[.1rem]"
                    exit={{ opacity: 0, duration: 0 }}
                  />
                  <motion.ul
                    variants={{
                      visible: {
                        transition: { staggerChildren: 0.07 },
                      },
                    }}
                    className="min-w-[280px] p-3 pb-0 rounded-md mt-5 border-[#cfcfcf] bg-lightBg border-[1px] text-text"
                  >
                    <motion.li
                      variants={menuItemVariants}
                      exit={{ x: 20, opacity: 0, transition: { duration: 1 } }}
                      className="border-b-2 line-clamp-1"
                    >
                      This is Test
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      exit={{ x: 20, opacity: 0, transition: { duration: 1 } }}
                      className="border-b-2 line-clamp-1 "
                    >
                      This is also a Test
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      exit={{ x: 20, opacity: 0, transition: { duration: 1 } }}
                      className="border-b-2 line-clamp-1 "
                    >
                      This is Test
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      exit={{ x: 20, opacity: 0, transition: { duration: 1 } }}
                      className="border-b-2 line-clamp-1 "
                    >
                      This is also a Test
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      exit={{ x: 20, opacity: 0, transition: { duration: 1 } }}
                      className="border-b-2 line-clamp-1 "
                    >
                      This is Test
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      exit={{ x: 20, opacity: 0, transition: { duration: 1 } }}
                      className="border-b-2 line-clamp-1 "
                    >
                      This is also a Test
                    </motion.li>
                  </motion.ul>
                </motion.section>
              </aside>
            )}
          </AnimatePresence>
        </li>
      </ul>
      {/* ----- Icon CopyRights ------------ */}
      <div className="hidden -left-[1000rem]">
        Icons made by
        <a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          rel="nofollow"
        >
          Freepik
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com'
        </a>
      </div>
      {/* ----- Icon CopyRight End ------------ */}
    </nav>
  );
}

export default FundraiserMainNavigation;
