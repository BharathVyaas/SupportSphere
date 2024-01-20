import { createContext, useEffect, useState } from "react";
import { EventEmitter } from "../util";
import _debounce from "lodash/debounce";
import { defaultConfing } from "../util/defaultConfig";

/**
 *
 * Events :- togglePanel
 * type :- {type: string, payload: boolean}
 */

/**
 * Context for managing the state of the side navigation.
 * @typedef {Object} SideNavContext
 * @property {boolean} showSideNav - Indicates whether the side navigation is visible.
 * @property {Function} setShowSideNav - Function to update the visibility of the side navigation.
 */

/**
 * React context for the side navigation state.
 * @type {React.Context<SideNavContext>}
 */
export const sideNavContext = createContext({});

/**
 * Provider component for the side navigation context.
 * @component
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 * @returns {JSX.Element} - The rendered component.
 */
export function SideNavProvider({ children }) {
  /**
   * State indicating whether the side navigation is visible.
   * @type {boolean}
   */
  const [showSideNav, setShowSideNav] = useState(defaultConfing.initialSideNav);
  defaultConfing.showSideNav = showSideNav;
  /**
   * Effect to emit a togglePanel event whenever the showSideNav state changes.
   */
  useEffect(() => {
    const debouncedEmit = _debounce(() => {
      EventEmitter.emit("togglePanel", {
        type: "sideBar",
        payload: showSideNav,
      });
    }, 10);

    debouncedEmit();
    return debouncedEmit.cancel;
  }, [showSideNav]);

  return (
    <sideNavContext.Provider value={{ showSideNav, setShowSideNav }}>
      {children}
    </sideNavContext.Provider>
  );
}
