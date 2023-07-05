import Cookies from 'js-cookie';
import { useRouter } from 'next/dist/client/router';
import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [order, setOrder] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [finalized, setFinalized] = useState(false)

  const router = useRouter()

  const handleRouteChange = () => {
    if(finalized){
      Cookies.remove('checkoutId')
      Cookies.remove('checkoutToken')
      setCart(null)
      setFinalized(false)
    }
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    };
  }, [router.events])

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      order,
      setOrder,
      open,
      setOpen,
      loading, 
      setLoading,
      finalized, 
      setFinalized
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider