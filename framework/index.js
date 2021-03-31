import React, { createContext, useContext} from 'react'
import { useTopMenu } from "./menu"
import { useState } from 'react'
import useAuth from './auth'

const CommerceContext = createContext({});

export const CommerceProvider = ({ children }) => {
  const auth = useAuth()
  const menu = useTopMenu()
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <CommerceContext.Provider value={{
      auth,
      menu,
      filterOpen,
      setFilterOpen
    }}>
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  return useContext(CommerceContext);
};