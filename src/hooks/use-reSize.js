import { useEffect, useMemo } from "react";
import _debounce from "lodash/debounce";

import { EventEmitter } from "../util";

/**
 * Custom hook for handling dynamic resizing of navigation elements.
 * @returns {Object} - An object containing properties related to navigation.
 * @property {Array} dropdown - The dropdown menu items.
 * @property {Array} nav - The main navigation items.
 * @property {number} dropdownLength - The length of the dropdown menu.
 * @property {number} navLength - The length of the main navigation.
 */
function useReSize() {
  /**
   * Resize handler function, debounced to prevent excessive calls.
   */
  const resizeHandler = useMemo(
    () =>
      _debounce(() => {
        if (window.innerWidth < 500) {
          const type = "xsm";
          const payload = "xsm";
          EventEmitter.emit("reSize", { type, payload });
        } else if (window.innerWidth < 650) {
          const type = "sm";
          const payload = type;
          EventEmitter.emit("reSize", { type, payload });
        } else if (window.innerWidth < 800) {
          const type = "md";
          const payload = type;
          EventEmitter.emit("reSize", { type, payload });
        } else if (window.innerWidth < 1015) {
          const type = "lg";
          const payload = type;
          EventEmitter.emit("reSize", { type, payload });
        } else if (window.innerWidth < 1225) {
          const type = "xl";
          const payload = type;
          EventEmitter.emit("reSize", { type, payload });
        } else if (window.innerWidth > 1225) {
          const type = "2xl";
          const payload = type;
          EventEmitter.emit("reSize", { type, payload });
        }
      }, 10),
    []
  );

  /**
   * Effect to update dropdown menu on component mount and resize.
   */
  useEffect(() => {
    resizeHandler();
  }, [resizeHandler]);

  //..
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [resizeHandler]);

  /**
   * Memoized return value to avoid unnecessary re-renders.
   */
  /*   const returnValue = useMemo(() => {
    return { dropdown, nav, dropdownLength, navLength };
  }, [dropdown, nav, dropdownLength, navLength]);

  return returnValue; */
}

export default useReSize;
