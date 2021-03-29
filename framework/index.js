import React, { createContext, useContext} from 'react';
import { useTopMenu } from "./menu"
import { useState } from 'react'

const CommerceContext = createContext({});

export const CommerceProvider = ({ children }) => {
  const menu = useTopMenu()
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <CommerceContext.Provider value={{ setFilterOpen, menu, filterOpen }}>
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  return useContext(CommerceContext);
};