import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

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
};

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

/**
 * Component for the main navigation in the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function FundraiserMainNavigation() {
  return (
    <nav>
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
      </ul>
    </nav>
  );
}

export default FundraiserMainNavigation;
