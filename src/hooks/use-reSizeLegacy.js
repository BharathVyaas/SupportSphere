import { useEffect, useMemo } from "react";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";

/**
 * Custom hook for handling dynamic resizing of navigation elements.
 * @returns {Object} - An object containing properties related to navigation.
 * @property {Array} dropdown - The dropdown menu items.
 * @property {Array} nav - The main navigation items.
 * @property {number} dropdownLength - The length of the dropdown menu.
 * @property {number} navLength - The length of the main navigation.
 */
function useReSize() {
  const primaryRoutes = useSelector((state) => state.primaryRoutes);
  const dropdown = primaryRoutes.dropdown;
  const nav = primaryRoutes.nav;
  const primaryRoutesLength = dropdown.length;
  const dropdownLength = dropdown.length;
  const navLength = nav.length;
  const dispatch = useDispatch();

  /**
   * Resize handler function, debounced to prevent excessive calls.
   */
  const resizeHandler = useMemo(
    () =>
      _debounce(() => {
        if (window.innerWidth < 700) {
          dispatch(primaryRouteActions.setNav([]));
          dispatch(primaryRouteActions.fillDropDown());
          dispatch(primaryRouteActions.checkedAt("xsm"));
        } else if (window.innerWidth < 800) {
          if (primaryRoutesLength !== 3) {
            dispatch(primaryRouteActions.addNavItem(2));
            dispatch(
              primaryRouteActions.addDropDownItem({ data: 3, id: "sm" })
            );
            dispatch(primaryRouteActions.checkedAt("sm"));
          }
        } else if (window.innerWidth < 1015) {
          if (primaryRoutesLength !== 2) {
            dispatch(primaryRouteActions.addNavItem(3));
            dispatch(
              primaryRouteActions.addDropDownItem({ data: 2, id: "md" })
            );
            dispatch(primaryRouteActions.checkedAt("md"));
          }
        } else if (window.innerWidth < 1120) {
          if (primaryRoutesLength !== 1) {
            dispatch(primaryRouteActions.addNavItem(4));
            dispatch(
              primaryRouteActions.addDropDownItem({ data: 1, id: "lg" })
            );
            dispatch(primaryRouteActions.checkedAt("lg"));
          }
        } else if (window.innerHeight < 1150) {
          dispatch(primaryRouteActions.fillNav());
          dispatch(primaryRouteActions.setDropDown([]));
          dispatch(primaryRouteActions.checkedAt("xl"));
        }
      }, 500),
    [dispatch, primaryRoutesLength]
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
  const returnValue = useMemo(() => {
    return { dropdown, nav, dropdownLength, navLength };
  }, [dropdown, nav, dropdownLength, navLength]);

  return returnValue;
}

export default useReSize;
