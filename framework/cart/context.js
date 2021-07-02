import React, { createContext, useState } from 'react'

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [order, setOrder] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      order,
      setOrder,
      open,
      setOpen,
      loading, 
      setLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider