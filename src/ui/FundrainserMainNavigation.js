import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const livariants = {
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

function FundraiserMainNavigation() {
  return (
    <nav>
      <ul className="grid place-content-center grid-flow-col my-auto min-h-full text-[1.1rem]">
        <motion.li
          variants={livariants}
          whileHover="hover"
          className="px-4 line-clamp-1 "
        >
          <NavLink
            className="[text-shadow:_0px_1px_6px_#f2f2f4]"
            to="/crowdfunding"
          >
            Crowdfunding
          </NavLink>
        </motion.li>
        <motion.li
          variants={livariants}
          whileHover="hover"
          className="px-4 line-clamp-1 "
        >
          <NavLink className="[text-shadow:_0px_1px_6px_#f2f2f4]" to="/events">
            Events
          </NavLink>
        </motion.li>
        <motion.li
          variants={livariants}
          whileHover="hover"
          className="px-4 line-clamp-1 "
        >
          <NavLink
            className="[text-shadow:_0px_1px_6px_#f2f2f4]"
            to="/sponsorships"
          >
            Sponsorships
          </NavLink>
        </motion.li>
        <motion.li
          variants={livariants}
          whileHover="hover"
          className="px-4 line-clamp-1 "
        >
          <NavLink
            className="[text-shadow:_0px_1px_6px_#f2f2f4]"
            to="/membership-programs"
          >
            Membership Programs
          </NavLink>
        </motion.li>
        <motion.li
          variants={livariants}
          whileHover="hover"
          className="px-4 line-clamp-1 "
        >
          <NavLink
            className="[text-shadow:_0px_1px_6px_#f2f2f4]"
            to="/awareness-campaigns"
          >
            Awareness Campaigns
          </NavLink>
        </motion.li>
      </ul>
    </nav>
  );
}

export default FundraiserMainNavigation;
