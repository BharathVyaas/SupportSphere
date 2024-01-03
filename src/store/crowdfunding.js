import { createSlice } from "@reduxjs/toolkit";
import {
  addDropDownItem,
  addNavItem,
  checkedAt,
  fillDropDown,
  fillNav,
  setDropDown,
  setNav,
  updateNav,
} from "./util/updateNav";

/**
 * Note: This JSDoc documentation covers major properties and methods.
 * Some additional properties and methods may exist but are not documented here.
 */

/**
 * Primary routes data.
 * @type {Object[]}
 */
const primaryRoutes = [
  { id: 1, path: "crowdfunding", title: "Crowdfunding" },
  { id: 2, path: "events", title: "Events" },
  { id: 3, path: "sponsorships", title: "Sponsorships" },
  { id: 4, path: "membership-programs", title: "Membership Programs" },
  { id: 5, path: "awareness-campaigns", title: "Awareness Campaigns" },
];

/**
 * Initial state for the primary route slice.
 * @type {Object}
 */
const initialState = {
  routes: primaryRoutes,
  nav: primaryRoutes,
  dropdown: [],
  lastCheckedAt: "xxl",
};

/**
 * Slice for managing primary routes state.
 * @type {Object}
 */
const primaryRouteSlice = createSlice({
  name: "primaryRoutes",
  initialState: initialState,
  reducers: {
    updateNav: (state, action) => updateNav(state, action),

    checkedAt: (state, action) => checkedAt(state, action),

    setNav: (state, action) => setNav(state, action),

    fillNav: (state) => fillNav(state),

    setDropDown: (state, action) => setDropDown(state, action),

    fillDropDown: (state) => fillDropDown(state),

    addDropDownItem: (state, action) => addDropDownItem(state, action),

    addNavItem: (state, action) => addNavItem(state, action),
  },
});

/**
 * Actions from the primaryRouteSlice.
 * @type {Object}
 */
export const primaryRouteActions = primaryRouteSlice.actions;

export default primaryRouteSlice;
