import { createContext, useState } from "react";

export const sideNavContext = createContext({});

export function SideNavProvider({ children }) {
  const [showSideNav, setShowSideNav] = useState(true);

  return (
    <sideNavContext.Provider value={{ showSideNav, setShowSideNav }}>
      {children}
    </sideNavContext.Provider>
  );
}
