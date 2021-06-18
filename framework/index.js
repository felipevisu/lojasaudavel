import React, { createContext, useContext} from 'react'
import { useTopMenu } from "./menu"
import { useState, useEffect } from 'react'
import useAuth from './auth'
import useCart from './cart'
import Cookies from 'js-cookie'

const CommerceContext = createContext({});

export const CommerceProvider = ({ children }) => {
  const auth = useAuth()
  const cart = useCart()
  const menu = useTopMenu()
  const [filterOpen, setFilterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    auth.setUser(null)
    cart.setCart(null)
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    Cookies.remove('checkoutId')
    Cookies.remove('checkoutToken')
  };

  useEffect(() => {
    if(auth.user && cart.cart){
      if(cart.cart.email !== auth.user.email){
        cart.checkoutCustomerAttach(auth.user.id)
      }
    }
  }, [auth.user, cart.cart])
  
  return (
    <CommerceContext.Provider value={{
      auth,
      cart,
      menu,
      menuOpen,
      filterOpen,
      setMenuOpen,
      setFilterOpen,
      logout
    }}>
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  return useContext(CommerceContext);
};