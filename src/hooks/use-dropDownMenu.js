import { useEffect, useState } from "react";
import _debounce from "lodash/debounce";

function useDropDownMenu(setRoutes, allRoutes) {
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [pendown, setPendown] = useState(true);
  const [n, setN] = useState(1);

  /**
   * Updating dropDownMenu
   */
  useEffect(() => {
    const resizeHandler = _debounce(() => {
      if (window.innerWidth < 800) {
        setRoutes([]);
        setDropDownMenu(allRoutes);
      } else if (window.innerWidth < 1015) {
        setRoutes(allRoutes.slice(0, -2));
        setDropDownMenu(allRoutes.slice(-2));
      } else if (window.innerWidth < 1120) {
        setRoutes(allRoutes.slice(0, -1));
        setDropDownMenu(allRoutes.slice(-1));
      } else if (window.innerHeight < 1150) {
        setRoutes(allRoutes);
        setDropDownMenu([]);
      }
    }, 500);
    //1020 800 1150
    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [pendown, n, dropDownMenu]);

  return { dropDownMenu };
}

export default useDropDownMenu;
