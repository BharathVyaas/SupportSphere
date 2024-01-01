import { useEffect, useMemo } from "react";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";

function useReSize() {
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
        dispatch(primaryRouteActions.checkedAt("xsm"));
      } else if (window.innerWidth < 800) {
        if (primaryRoutesLength !== 3) {
          dispatch(primaryRouteActions.addNavItem(2));
          dispatch(primaryRouteActions.addDropDownItem({ data: 3, id: "sm" }));
          dispatch(primaryRouteActions.checkedAt("sm"));
        }
      } else if (window.innerWidth < 1015) {
        if (primaryRoutesLength !== 2) {
          dispatch(primaryRouteActions.addNavItem(3));
          dispatch(primaryRouteActions.addDropDownItem({ data: 2, id: "md" }));
          dispatch(primaryRouteActions.checkedAt("md"));
        }
      } else if (window.innerWidth < 1120) {
        if (primaryRoutesLength !== 1) {
          dispatch(primaryRouteActions.addNavItem(4));
          dispatch(primaryRouteActions.addDropDownItem({ data: 1, id: "lg" }));
          dispatch(primaryRouteActions.checkedAt("lg"));
        }
      } else if (window.innerHeight < 1150) {
        dispatch(primaryRouteActions.fillNav());
        dispatch(primaryRouteActions.setDropDown([]));
        dispatch(primaryRouteActions.checkedAt("xl"));
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

export default useReSize;
