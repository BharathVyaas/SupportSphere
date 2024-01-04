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

/* 
// Number 3
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";
import { EventEmitter } from "../util";
import _debounce from "lodash/debounce";
import { defaultConfing } from "../util/defaultConfig";
import _ from "lodash";

const ObjConstructor = {
  init: function (routes, nav, dropdown) {
    this.routes = routes;
    this.nav = nav;
    this.dropdown = dropdown;
    return this;
  },
};

class NavHandler {
  #routes;

  constructor() {
    this.#routes = [
      { id: 1, path: "crowdfunding", title: "Crowdfunding" },
      { id: 2, path: "events", title: "Events" },
      { id: 3, path: "sponsorships", title: "Sponsorships" },
      { id: 4, path: "membership-programs", title: "Membership Programs" },
      { id: 5, path: "awareness-campaigns", title: "Awareness Campaigns" },
    ];
  }

  generateObj(...rest) {
    const resultObj = Object.create(ObjConstructor);
    return resultObj.init(...rest);
  }

  split(navLength) {
    const nav = _.take(this.#routes, navLength);
    const dropdown = _.drop(this.#routes, navLength);
    return this.generateObj(this.#routes, nav, dropdown);
  }

  updateNav(size) {
    // Trying to keep class lean
    switch (size) {
      case "xsm":
      case "sm": {
        return this.generateObj(this.#routes, [], this.#routes);
      }
      case "md": {
        return this.split(2);
      }
      case "lg": {
        return this.split(3);
      }
      case "xl": {
        return this.split(4);
      }
      case "2xl": {
        return this.generateObj(this.#routes, this.#routes, []);
      }
    }
  }
}

function useNavList() {
  let currentNav = {
    routes: [],
    dropdown: [],
    nav: [],
  };
  console.log("useNavList");
  // Requires State
  // const [currentNav, setCurrentNav] = useState({
  //  routes: [],
  //  dropdown: [],
  // nav: [],
  // });

  useEffect(() => {
    const navHandler = new NavHandler();
    const resizeHandler = _debounce(
      (size) => {
        currentNav = navHandler.updateNav(size);
      },
      [defaultConfing.refreshNav]
    );
    EventEmitter.on("reSize", resizeHandler);
    return () => EventEmitter.off("reSize", resizeHandler);
  }, []);

  return currentNav;
}

export default useNavList; */

/**
 * This Method requires an update in EventEmitter class
 * I don't wanna make event-emitter more complicated for now
 * instead I'm using the different approach
 * 
 * // Number 1
 * import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { primaryRouteActions } from "../store/crowdfunding";
import { EventEmitter } from "../util";
import _debounce from "lodash/debounce";
import { defaultConfing } from "../util/defaultConfig";

class Store {
  #dropdown;
  #nav;
  #routes;
  static #store;
  static get storeInstance() {
    if (!this.#store) this.#store = new Store();
    return this.#store;
  }
  constructor() {
    this.#routes = [
      { id: 1, path: "crowdfunding", title: "Crowdfunding" },
      { id: 2, path: "events", title: "Events" },
      { id: 3, path: "sponsorships", title: "Sponsorships" },
      { id: 4, path: "membership-programs", title: "Membership Programs" },
      { id: 5, path: "awareness-campaigns", title: "Awareness Campaigns" },
    ];
    this.#dropdown = [];
    this.#nav = this.#routes;
  }

  updateNav() {
    EventEmitter.on("reSize", (size) => {
      console.log(size);
    });
  }
}

const store = Store.storeInstance;


function useNavList() {
  useEffect(() => {
    const resizeHandler = _debounce((size) => {
      console.log("navlist resizeHandler");

      store.updateNav();
    }, defaultConfing.refreshNav);

    EventEmitter.on("reSize", resizeHandler);
    return () => EventEmitter.off("reSize", resizeHandler);
  }, []);

  const returnVal = { dropdown: [], nav: [], dropdownLength: 0, navLength: 0 };
  return returnVal;
}

export default useNavList;

 */
