import React, { createContext, useContext} from 'react';
import { useTopMenu } from "./menu"

const CommerceContext = createContext({});

export const CommerceProvider = ({ children }) => {
  const menu = useTopMenu()

  return (
    <CommerceContext.Provider value={menu}>
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  return useContext(CommerceContext);
};