import { useEffect, useMemo, useState } from "react";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";

function useDropDownMenu() {
  const primaryRoutes = useSelector((state) => state.primaryRoutes);
  const dropdown = primaryRoutes.dropdown;
  const routes = primaryRoutes.nav;
  const primaryRoutesLength = dropdown.length;
  const dispatch = useDispatch();

  /**
   * Updating dropDownMenu
   */
  useEffect(() => {
    const resizeHandler = _debounce(() => {
      if (window.innerWidth < 700) {
        dispatch(primaryRouteActions.setNav([]));
        dispatch(primaryRouteActions.fillDropDown());
        dispatch(primaryRouteActions.checkedAt("sm"));
      } else if (window.innerWidth < 800) {
        if (primaryRoutesLength !== 2) {
          dispatch(primaryRouteActions.addNavItem(2));
          dispatch(primaryRouteActions.addDropDownItem(3));
        }
      } else if (window.innerWidth < 1015) {
        if (primaryRoutesLength !== 2) {
          dispatch(primaryRouteActions.addNavItem(3));
          dispatch(primaryRouteActions.addDropDownItem(2));
        }
      } else if (window.innerWidth < 1120) {
        if (primaryRoutesLength !== 1) {
          dispatch(primaryRouteActions.addNavItem(4));
          dispatch(primaryRouteActions.addDropDownItem(1));
        }
      } else if (window.innerHeight < 1150) {
        dispatch(primaryRouteActions.fillNav());
        dispatch(primaryRouteActions.setDropDown([]));
      }
    }, 500);
    //1020 800 1150
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const returnValue = useMemo(() => {
    return { dropdown, routes };
  }, [dropdown, routes]);
  return returnValue;
}

export default useDropDownMenu;
