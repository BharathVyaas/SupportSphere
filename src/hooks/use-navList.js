// There are 3 approaches here now the Number 2 is good enough for now.
// rest of them need more complex code in eventemitter.
// Which wont be necessary right now.

//Number 2

import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import _debounce from "lodash/debounce";

import { primaryRouteActions } from "../store/crowdfunding";
import { EventEmitter } from "../util";
import { defaultConfing } from "../util/defaultConfig";

/**
 * Custom hook to memoize the selected state and prevent unnecessary re-renders.
 * @param {function} selector - Selector function to pick a specific part of the Redux state.
 * @returns {*} - Memoized state that only updates if the selected state changes.
 */
function useDeepEqualSelector(selector) {
  const prevSelectedState = useRef(null);

  const selectedState = useSelector(selector);

  const memoizedState = useMemo(() => {
    if (deepEqual(selectedState, prevSelectedState.current)) {
      // If the state hasn't changed, return the previous state
      return prevSelectedState.current;
    }

    // If the state has changed, update the ref and return the new state
    prevSelectedState.current = selectedState;
    return selectedState;
  }, [selectedState]);

  return memoizedState;
}

/**
 * Custom hook for handling navigation list logic and state updates.
 * @returns {Object} - Object containing dropdown and nav values for the navigation list.
 * @property {Array} dropdown - Dropdown values for the navigation list.
 * @property {Array} nav - Nav values for the navigation list.
 */
function useNavList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const resizeHandler = _debounce((size) => {
      dispatch(primaryRouteActions.updateNav(size));
    }, defaultConfing.refreshNav);

    // Subscribe to resize events and update the navigation list
    EventEmitter.on("reSize", resizeHandler);

    return () => EventEmitter.off("reSize", resizeHandler);
  }, [dispatch]);

  const primaryRoutes = useDeepEqualSelector((state) => state.primaryRoutes);

  const { dropdown, nav } = primaryRoutes;
  return { dropdown, nav };
}

export default useNavList;

/**
 * Helper function to perform a deep equality check between two objects.
 */
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
