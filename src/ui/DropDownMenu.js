import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import arrowActive from "../assets/icons/arrow-down-active.png";
import arrowDisabled from "../assets/icons/arrow-down-disabled.png";
import arrowMenuAttach from "../assets/icons/arrow-down-MenuAttach.png";

/**
 * Animation values for an active menu.
 * @type {Object}
 */
const activeMenuAnimation = {
  rotation: 270,
  damping: 6,
  delay: 0,
};

/**
 * Animation values for an open menu.
 * @type {Object}
 */
const openMenuAnimation = {
  rotation: 0,
  damping: 9,
  delay: 0,
};

/**
 * Variants for the menu animations.
 * @type {Object}
 */
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

/**
 * Variants for menu item animations.
 * @type {Object}
 */
const menuItemVariants = {
  hidden: {
    x: -100,
    opacity: 0.2,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

/**
 * Variants for the menu container animations.
 * @type {Object}
 */
const menuContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }, // Adjust the delay as needed
  },
};

/**
 * Component for rendering a dropdown menu.
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.arrowAnimationValues - Animation values for the arrow.
 * @param {Function} props.setArrowAnimationValues - Function to set arrow animation values.
 * @param {number} props.dropdownLength - Length of the dropdown menu.
 * @returns {JSX.Element} - The rendered component.
 */
function DropDownMenu({
  dropdown,
  arrowAnimationValues,
  setArrowAnimationValues,
}) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  /**
   * Removing border of the last drop menu item.
   */
  const dropDownMenuRef = useRef(null);

  useEffect(() => {
    if (dropDownMenuRef) {
      const dropDownMenu = dropDownMenuRef.current;
      if (dropDownMenu && dropDownMenu.lastChild)
        dropDownMenu.lastChild.style.borderBottom = 0;
    }
  }, [isMenuActive]);

  // ------

  // Using State, Have to declare variants inside function.
  /**
   * Variants for the hover and arrow animations.
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

  // ------

  return (
    <>
      {/* Drop Down Trigger */}
      <li className="grid place-content-center ml-1 p-2-hidden">
        <motion.button
          variants={variants}
          animate="arrowAnimations"
          className="z-[100]"
          onClick={() => {
            if (isMenuActive) {
              setArrowAnimationValues(activeMenuAnimation);
              setIsMenuActive(false);
            } else {
              if (dropdown) {
                setArrowAnimationValues(openMenuAnimation);
                setIsMenuActive(true);
              }
            }
          }}
          disabled={!dropdown}
        >
          {/* Arrow Img */}
          {dropdown ? (
            <img src={arrowActive} alt="arrow" width="14" height="15" />
          ) : (
            <img
              src={arrowDisabled}
              alt="arrowdisabled"
              width="14"
              height="15"
            />
          )}
        </motion.button>
        {/* Drop Down section */}
        <AnimatePresence>
          {dropdown && isMenuActive && (
            <aside className="absolute right-[10rem] top-[60%]">
              {/* Icon Creater FlatIcon */}
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
              {/* End Creater */}
              {/* ----- Drop Down Menu ----- */}
              <motion.section
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                className="bg-sky-500 absolute -top-2 right-0 shadow-2xl overflow-x-hidden overflow-y-auto"
                exit={{ opacity: 0, transition: { duration: 0.9 } }}
              >
                {/* Img used as style for box white arrow attached on top of box */}
                <motion.img
                  src={arrowMenuAttach}
                  width="30"
                  className="absolute right-0 rotate-180 pb-[.1rem]"
                  exit={{ opacity: 0, duration: 0 }}
                />
                {/* Drop Down Menu List */}
                <motion.ul
                  ref={dropDownMenuRef}
                  variants={menuContainerVariants}
                  transition={{ staggerChildren: 0.1 }}
                  className="min-w-[240px] p-3 rounded-md mt-5 border-[#cfcfcf] bg-lightBg border-[1px] text-text"
                >
                  <AnimatePresence>
                    {dropdown.map((element) => {
                      return (
                        <motion.li
                          key={element.id}
                          variants={menuItemVariants}
                          exit={{
                            x: 5,
                            opacity: 0.2,
                          }}
                          className="border-b-2 line-clamp-1"
                        >
                          <Link to={element.link}>{element.title}</Link>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </motion.ul>
              </motion.section>
            </aside>
          )}
        </AnimatePresence>
      </li>
    </>
  );
}

export default DropDownMenu;
