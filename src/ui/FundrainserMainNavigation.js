import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import DropDownMenu from "./DropDownMenu";
import useNavList from "../hooks/use-navList";

/**
 * Component for the main navigation in the Fundraiser page.
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
function FundraiserMainNavigation() {
  /**
   * State for arrow animation values.
   * @type {Object}
   * @property {number} rotation - Rotation value for arrow animation.
   * @property {number} damping - Damping value for arrow animation.
   * @property {number} delay - Delay value for arrow animation.
   */
  const [arrowAnimationValues, setArrowAnimationValues] = useState({
    rotation: 270,
    damping: 5,
    delay: 0.1,
  });

  /**
   * Hook for handling dropdown and navigation resizing.
   * @type {Object}
   * @property {Object[]} dropdown - Dropdown menu data.
   * @property {Object[]} nav - Navigation routes data.
   * @property {number} dropdownLength - Length of the dropdown menu.
   */
  const { dropdown: dropDownMenu, nav: routes, dropdownLength } = useNavList();

  /**
   * Variants for the hover animation and arrow animations.
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
    <nav className="relative flex max-h-full">
      <ul className="grid place-content-center grid-flow-col my-auto min-h-full text-[1.1rem]">
        {routes &&
          routes.map((route) => (
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
                {route.title}
              </NavLink>
            </motion.li>
          ))}
        <DropDownMenu
          dropDownMenu={dropDownMenu}
          dropdownLength={dropdownLength}
          arrowAnimationValues={arrowAnimationValues}
          setArrowAnimationValues={setArrowAnimationValues}
        />
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
      <aside className="min-h-full ml-[1rem] w-[9rem] text-[1.1rem] mx-2 me-2 grid place-content-center">
        <button className="px-10 py-[.3rem] border-[1px] boreder-text [box-shadow:_1px_2px_4px_#f2f2f4]">
          Login
        </button>
      </aside>
    </nav>
  );
}

export default FundraiserMainNavigation;
