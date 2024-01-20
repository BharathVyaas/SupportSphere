// Finesh this.

let initialSize;

if (window.innerWidth < 500) {
  initialSize = "xsm";
} else if (window.innerWidth < 650) {
  initialSize = "sm";
} else if (window.innerWidth < 800) {
  initialSize = "md";
} else if (window.innerWidth < 1024) {
  initialSize = "lg";
} else if (window.innerWidth < 1220) {
  initialSize = "xl";
} else if (window.innerWidth > 1225) {
  initialSize = "2xl";
}

export const defaultConfing = {
  initialSideNav: false,
  initialSize: initialSize,
  refreshNav: 1000,
  refreshResize: 300,
  eventTypes: ["sideBar", "xsm", "sm", "md", "lg", "xl", "2xl"],
  eventKeys: ["togglePanel", "reSize"],
  showSideNav: false,
};
