import { useCallback, useEffect, useRef, useState, useMemo } from "react";

import { EventEmitter } from "../util";
import { defaultConfing } from "../util/defaultConfig";

/**
 * Custom hook for handling crowd funding logic and styles.
 * @returns {Object} - Object containing state and functions for crowdfunding logic.
 * @property {Array} sizes - Array to track the sizes based on window resizing.
 * @property {Function} setResizeStyles - Function to set the resizing styles.
 * @property {string} resizeStyles - The styles for the crowdfunding component based on window size.
 */
function useCrowdFunding() {
  console.log("useCrowdFunding:rerender");
  /**
   * State for managing styles of the crowdfunding component.
   * @type {string}
   */
  const [panelStyles, setPanelStyles] = useState(defaultConfing.showSideNav);

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
   * Tailwind for the initial view size.
   * @type {string}
   */
  const view = " view-size animate-margin-left ";

  /**
   * State for managing resizing styles of the crowdfunding component.
   * @type {string}
   */
  const [resizeStyles, setResizeStyles] = useState(
    panelStyles
      ? "margin-start-260 " + view + "grid-columns-1"
      : "margin-start-0 " + view + "grid-columns-1"
  );

  const handleResize = useCallback(
    (size) => {
      console.log("handleResize:call", panelStyles);
      if (size === "2xl") {
        sizes.current.push(size);
        if (panelStyles)
          setResizeStyles("margin-start-260 " + view + " grid-columns-3");
        else {
          setResizeStyles("margin-start-0 " + view + " grid-columns-3");
        }
      } else if (size === "xl") {
        sizes.current.push(size);
        if (panelStyles)
          setResizeStyles("margin-start-260 " + view + " grid-columns-2");
        else {
          setResizeStyles("margin-start-0 " + view + " grid-columns-3");
        }
      } else if (size === "lg" || size === "md") {
        sizes.current.push(size);
        if (panelStyles)
          setResizeStyles("margin-start-260 " + view + " grid-columns-1");
        else setResizeStyles("margin-start-0 " + view + " grid-columns-2");
      } else if (size === "sm" || size === "xsm") {
        sizes.current.push(size);
        setResizeStyles("margin-start-0 " + view + " grid-columns-1");
      }
    },
    [panelStyles]
  );

  useEffect(() => {
    const length = sizes.current.length - 1;
    if (sizes.current) handleResize(sizes.current[length]);

    EventEmitter.on("reSize", handleResize);
    EventEmitter.on("togglePanel", handleResize);

    return () => {
      EventEmitter.off("reSize", handleResize);
      EventEmitter.off("togglePanel", handleResize);
    };
  }, [panelStyles, view, handleResize]);

  // Reload when component rendered
  useEffect(() => {
    handleResize(defaultConfing.initialSize);
  }, [handleResize]);

  const returnValue = useMemo(() => {
    return { sizes, setResizeStyles, resizeStyles };
  }, [sizes, setResizeStyles, resizeStyles]);

  return returnValue;
}

export default useCrowdFunding;
