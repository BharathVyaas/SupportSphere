import { useEffect, useRef, useState } from "react";

import { EventEmitter } from "../util";

/**
 * Custom hook for handling crowd funding logic and styles.
 * @returns {Object} - Object containing state and functions for crowdfunding logic.
 * @property {Array} sizes - Array to track the sizes based on window resizing.
 * @property {Function} setResizeStyles - Function to set the resizing styles.
 * @property {string} resizeStyles - The styles for the crowdfunding component based on window size.
 */
function useCrowdFunding() {
  /**
   * State for managing styles of the crowdfunding component.
   * @type {string}
   */
  const [panelStyles, setPanelStyles] = useState(true);

  useEffect(() => {
    const handlePanelToggle = (showPanel) => {
      setPanelStyles(showPanel);
    };

    EventEmitter.on("togglePanel", handlePanelToggle);

    return () => EventEmitter.off("togglePanel", handlePanelToggle);
  }, []);

  /**
   * Ref to track window resizing sizes.
   * @type {Array}
   */
  const sizes = useRef([]);

  /**
   * CSS class for the initial view size.
   * @type {string}
   */
  const viewSize = " mt-[5rem] grid grid-cols-";

  /**
   * State for managing resizing styles of the crowdfunding component.
   * @type {string}
   */
  const [resizeStyles, setResizeStyles] = useState(
    panelStyles ? "ms-[260px] " : "ms-[0px] " + viewSize + "1"
  );

  useEffect(() => {
    const handleResize = (size) => {
      if (size === "2xl" || size === "xl") {
        sizes.current.push(size);
        if (panelStyles) setResizeStyles("ms-[260px] " + viewSize + 2);
        else setResizeStyles("ms-[0px] " + viewSize + 3);
      } else if (size === "lg" || size === "md") {
        sizes.current.push(size);
        if (panelStyles) setResizeStyles("ms-[260px] " + viewSize + 1);
        else setResizeStyles("ms-[0px] " + viewSize + 2);
      } else if (size === "sm" || size === "xsm") {
        sizes.current.push(size);
        setResizeStyles("ms-[0px] " + viewSize + 1);
      }
    };

    const length = sizes.current.length - 1;
    if (sizes.current) handleResize(sizes.current[length]);

    EventEmitter.on("reSize", handleResize);

    return () => EventEmitter.off("reSize", handleResize);
  }, [panelStyles, viewSize]);

  return { sizes, setResizeStyles, resizeStyles };
}

export default useCrowdFunding;
