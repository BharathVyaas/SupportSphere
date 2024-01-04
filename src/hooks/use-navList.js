import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";
import { EventEmitter } from "../util";
import _debounce from "lodash/debounce";

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
  console.log("navlist");
  useEffect(() => {
    // Receives custom size ex:- xl 2xl xsm
    const resizeHandler = _debounce((size) => {
      dispatch(primaryRouteActions.updateNav(size));
    }, 500);
    EventEmitter.on("reSize", resizeHandler);
    return () => EventEmitter.off("reSize", resizeHandler);
  }, [dispatch]);

  return { dropdown, nav, dropdownLength, navLength };
}

export default useNavList;
