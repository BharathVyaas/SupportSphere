import { createSlice } from "@reduxjs/toolkit";

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
    /**
     * Updates the last checked route size.
     * ```
     * @param {string} action.payload - The last checked route size.
     */
    checkedAt(state, action) {
      state.lastCheckedAt = action.payload;
    },

    /**
     * Sets the navigation routes.
     * ```
     * @param {Object[]} action.payload - The navigation routes.
     */
    setNav(state, action) {
      state.nav = action.payload;
    },

    /**
     * Fills the navigation routes with the primary routes.
     * ```
     */
    fillNav(state) {
      state.nav = state.routes;
    },

    /**
     * Sets the dropdown routes.
     * ```
     * @param {Object[]} action.payload - The dropdown routes.
     */
    setDropDown(state, action) {
      state.dropdown = action.payload;
    },

    /**
     * Fills the dropdown routes with the primary routes.
     * @param {Object} state - The current state.
     */
    fillDropDown(state) {
      state.dropdown = state.routes;
    },

    /**
     * Adds dropdown items based on the lastCheckedAt value.
     * ```
     * @param {Object} action.payload - The dropdown item data.
     * @param {string} action.payload.id - The id of the dropdown item.
     * @param {number} action.payload.data - The number of dropdown items to add.
     * @throws Will throw an error if index overflow occurs.
     * @returns {Object} - The updated state.
     */
    addDropDownItem(state, action) {
      const dropDownLength = state.dropdown.length;
      const routesLength = state.routes.length;
      const list = [];

      if (
        state.lastCheckedAt !== "xsm" &&
        state.lastCheckedAt !== action.payload.id
      ) {
        if (dropDownLength + action.payload.data > routesLength) {
          throw new Error(
            `Index Overflow addDropDownItem ${
              action.payload.data
            } (limit ${routesLength} you are setting ${
              dropDownLength + action.payload.data
            }`
          );
        }
      }

      for (let i = action.payload.data; i >= 1; i--) {
        const n = 5 - i;
        list.push(state.routes[n]);
      }

      return { ...state, dropdown: list };
    },

    /**
     * Adds navigation items based on the provided payload.
     * ```
     * @param {number} action.payload - The number of navigation items to add.
     * @returns {Object} - The updated state.
     */
    addNavItem(state, action) {
      const list = [];

      for (let i = 0; i <= action.payload - 1; i++) {
        list.push(state.routes[i]);
      }

      return { ...state, nav: list };
    },
  },
});

/**
 * Actions from the primaryRouteSlice.
 * @type {Object}
 */
export const primaryRouteActions = primaryRouteSlice.actions;

export default primaryRouteSlice;
