import _ from "lodash";

/**
 * Updates the last checked route size.
 * ```
 * @param {string} action.payload - The last checked route size.
 */
export function checkedAt(state, action) {
  state.lastCheckedAt = action.payload;
}

/**
 * Sets the navigation routes.
 * ```
 * @param {Object[]} action.payload - The navigation routes.
 */
export function setNav(state, action) {
  state.nav = action.payload;
}

/**
 * Fills the navigation routes with the primary routes.
 * ```
 */
export function fillNav(state) {
  state.nav = state.routes;
}

/**
 * Sets the dropdown routes.
 * ```
 * @param {Object[]} action.payload - The dropdown routes.
 */
export function setDropDown(state, action) {
  state.dropdown = action.payload;
}

/**
 * Fills the dropdown routes with the primary routes.
 * @param {Object} state - The current state.
 */
export function fillDropDown(state) {
  state.dropdown = state.routes;
}

/**
 * Adds dropdown items based on the lastCheckedAt value.
 * ```
 * @param {Object} action.payload - The dropdown item data.
 * @param {string} action.payload.id - The id of the dropdown item.
 * @param {number} action.payload.data - The number of dropdown items to add.
 * @throws Will throw an error if index overflow occurs.
 * @returns {Object} - The updated state.
 */
export function addDropDownItem(state, action) {
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
}

/**
 * Adds navigation items based on the provided payload.
 * ```
 * @param {number} action.payload - The number of navigation items to add.
 * @returns {Object} - The updated state.
 */

export function addNavItem(state, action) {
  const navLength = Math.min(action.payload, state.routes.length);

  const nav = _.take(state.routes, navLength);
  const dropdown = _.drop(state.routes, navLength);

  return { ...state, nav, dropdown };
}

export function updateNav(state, action) {
  console.log("updateNav");
  switch (action.payload) {
    case "xsm":
    case "sm": {
      if (state.lastCheckedAt !== "sm" || state.lastCheckedAt !== "xsm") {
        const newState = { ...state };
        newState.lastCheckedAt = "sm";
        return {
          ...newState,
          nav: [],
          dropdown: [...state.routes],
          lastCheckedAt: "sm",
        };
      }
      console.log("updateNav no change required");
      break;
    }
    case "md": {
      if (state.lastCheckedAt !== "md") {
        const newState = { ...state };
        newState.lastCheckedAt = "md";
        return addNavItem(state, { payload: 2 });
      }
      console.log("updateNav no change required");
      break;
    }
    case "lg": {
      if (state.lastCheckedAt !== "lg") {
        const newState = { ...state };
        newState.lastCheckedAt = "lg";
        return addNavItem(state, { payload: 3 });
      }
      console.log("updateNav no change required");
      break;
    }
    case "xl": {
      if (state.lastCheckedAt !== "xl") {
        const newState = { ...state };
        newState.lastCheckedAt = "xl";
        return addNavItem(state, { payload: 4 });
      }
      console.log("updateNav no change required");
      break;
    }
    case "2xl": {
      if (state.lastCheckedAt !== "2xl") {
        const newState = { ...state };
        newState.lastCheckedAt = "2xl";
        return {
          ...state,
          dropdown: [],
          nav: [...state.routes],
          lastCheckedAt: "sm",
        };
      }
      console.log("updateNav no change required");
      break;
    }
    default:
      throw new Error("Unknown size updateNav");
  }
}
