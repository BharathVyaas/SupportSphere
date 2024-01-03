import { useEffect, useMemo } from "react";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";
import { EventEmitter } from "../util";

/**
 * Custom hook for handling dynamic resizing of navigation elements.
 * @returns {Object} - An object containing properties related to navigation.
 * @property {Array} dropdown - The dropdown menu items.
 * @property {Array} nav - The main navigation items.
 * @property {number} dropdownLength - The length of the dropdown menu.
 * @property {number} navLength - The length of the main navigation.
 */
function useNavList() {
  const primaryRoutes = useSelector((state) => state.primaryRoutes);
  const dropdown = primaryRoutes.dropdown;
  const nav = primaryRoutes.nav;
  const dropdownLength = dropdown.length;
  const navLength = nav.length;
  const dispatch = useDispatch();

  useEffect(() => {
    const resizeHandler = (data) => {
      dispatch(primaryRouteActions.updateNav(data));
    };
    EventEmitter.on("reSize", resizeHandler);
    return () => EventEmitter.off("reSize", resizeHandler);
  }, []);

  /**
   * Memoized return value to avoid unnecessary re-renders.
   */
  const returnValue = useMemo(() => {
    return { dropdown, nav, dropdownLength, navLength };
  }, [dropdown, nav, dropdownLength, navLength]);

  return returnValue;
}

export default useNavList;
