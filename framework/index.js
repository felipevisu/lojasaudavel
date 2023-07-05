import React, { createContext, useContext, useState } from 'react'
import useMenu from './menu';

export const SiteContext = createContext({});

export const SiteProvider = ({ children }) => {
  const menu = useMenu()
  const [menuOpen, setMenuOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <SiteContext.Provider value={{
      menu,
      menuOpen,
      setMenuOpen,
      filterOpen,
      setFilterOpen,
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  return useContext(SiteContext);
};