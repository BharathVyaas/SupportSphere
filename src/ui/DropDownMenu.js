import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import arrowActive from "../assets/icons/arrow-down-active.png";
import arrowDisabled from "../assets/icons/arrow-down-disabled.png";
import arrowMenuAttach from "../assets/icons/arrow-down-MenuAttach.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
    x: -50,
    opacity: 0.2,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const menuContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

function DropDownMenu({
  arrowAnimationValues,
  setArrowAnimationValues,
  dropdownLength,
}) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isMenuAvailable, setIsMenuAvailable] = useState(true);

  useEffect(() => {
    if (dropdownLength < 1) {
      setIsMenuAvailable(false);
    }
  }, [dropdownLength]);

  const dropdown = useSelector((state) => state.primaryRoutes.dropdown);

  useEffect(() => {
    setIsMenuAvailable(dropdown && dropdown.length);
  }, [dropdown]);

  /**
   * Removing border of last drop menu item
   */
  const dropDownMenuRef = useRef(null);

  useEffect(() => {
    if (dropDownMenuRef) {
      const dropDownMenu = dropDownMenuRef.current;
      if (dropDownMenu && dropDownMenu.lastChild)
        dropDownMenu.lastChild.style.borderBottom = 0;
    }
  }, [isMenuActive, dropdown]);

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
    <>
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
              if (isMenuAvailable) {
                setArrowAnimationValues(openMenuAnimation);
                setIsMenuActive(true);
              }
            }
          }}
          disabled={!isMenuAvailable}
        >
          {isMenuAvailable ? (
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
        <AnimatePresence>
          {isMenuAvailable && isMenuActive && (
            <aside className="absolute right-[10rem] top-[60%]">
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
                exit={{ opacity: 0, transition: { duration: 0.9 } }}
              >
                <motion.img
                  src={arrowMenuAttach}
                  width="30"
                  className="absolute right-0 rotate-180 pb-[.1rem]"
                  exit={{ opacity: 0, duration: 0 }}
                />
                <motion.ul
                  ref={dropDownMenuRef}
                  variants={menuContainerVariants}
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
                          className="border-b-2 line-clamp-1 "
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
