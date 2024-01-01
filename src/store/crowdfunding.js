import { createSlice } from "@reduxjs/toolkit";

const primaryRoutes = [
  { id: 1, path: "crowdfunding", title: "Crowdfunding" },
  { id: 2, path: "events", title: "Events" },
  { id: 3, path: "sponsorships", title: "Sponsorships" },
  { id: 4, path: "membership-programs", title: "Membership Programs" },
  { id: 5, path: "awareness-campaigns", title: "Awareness Campaigns" },
];

const initialState = {
  routes: primaryRoutes,
  nav: primaryRoutes,
  dropdown: [],
  lastCheckedAt: "xxl",
};

const primaryRouteSlice = createSlice({
  name: "primaryRoutes",
  initialState: initialState,
  reducers: {
    checkedAt(state, action) {
      state.lastCheckedAt = action.payload;
    },
    setNav(state, action) {
      state.nav = action.payload;
    },
    fillNav(state) {
      state.nav = state.routes;
    },
    setDropDown(state, action) {
      state.dropdown = action.payload;
    },
    fillDropDown(state) {
      state.dropdown = state.routes;
    },
    addDropDownItem(state, action) {
      const dropDownLength = state.dropdown.length;
      let routesLength = state.routes.length;
      const list = [];
      if (state.lastCheckedAt !== "sm")
        if (dropDownLength + action.payload > routesLength)
          throw new Error(
            `Index Overflow addDropDownItem ${
              action.payload
            } (limit ${routesLength} your are setting ${
              dropDownLength + action.payload
            }`
          );

      for (let i = action.payload; i >= 1; i--) {
        const n = 5 - i;
        list.push(state.routes[n]);
      }
      return { ...state, dropdown: list };
    },
    addNavItem(state, action) {
      const list = [];

      for (let i = 0; i <= action.payload - 1; i++) {
        list.push(state.routes[i]);
      }
      return { ...state, nav: list };
    },
  },
});

export const primaryRouteActions = primaryRouteSlice.actions;

export default primaryRouteSlice;
