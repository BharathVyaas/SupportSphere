import { useEffect } from "react";
import _debounce from "lodash/debounce";

import { EventEmitter } from "../util";
import { defaultConfing } from "../util/defaultConfig";

/**
 * Custom hook for handling dynamic resizing of navigation elements.
 * @returns {Object} - An object containing properties related to navigation.
 * @property {Array} dropdown - The dropdown menu items.
 * @property {Array} nav - The main navigation items.
 * @property {number} dropdownLength - The length of the dropdown menu.
 * @property {number} navLength - The length of the main navigation.
 */
function useReSize() {
  console.log("useReSize:rerender");
  /**
   * Resize handler function, debounced to prevent excessive calls.
   */
  useEffect(() => {
    const debouncedResizeHandler = _debounce(() => {
      if (window.innerWidth < 500) {
        const type = "xsm";
        const payload = type;
        EventEmitter.emit("reSize", { type, payload });
      } else if (window.innerWidth < 650) {
        const type = "sm";
        const payload = type;
        EventEmitter.emit("reSize", { type, payload });
      } else if (window.innerWidth < 800) {
        const type = "md";
        const payload = type;
        EventEmitter.emit("reSize", { type, payload });
      } else if (window.innerWidth < 1024) {
        const type = "lg";
        const payload = type;
        EventEmitter.emit("reSize", { type, payload });
      } else if (window.innerWidth < 1220) {
        const type = "xl";
        const payload = type;
        EventEmitter.emit("reSize", { type, payload });
      } else if (window.innerWidth > 1225) {
        const type = "2xl";
        const payload = type;
        EventEmitter.emit("reSize", { type, payload });
      }
    }, defaultConfing.refreshResize);

    // Initial call to set the initial state
    debouncedResizeHandler();

    window.addEventListener("resize", debouncedResizeHandler);

    return () => {
      window.removeEventListener("resize", debouncedResizeHandler);
      debouncedResizeHandler.cancel();
    };
  }, []);

  // This Hook Doesn't Return Anything.
}

export default useReSize;
