import { createContext } from 'use-context-selector'
import { useCallback, useState } from "react"

export const CommerceContext = createContext({})

export function CommerceProvider({children}){
  const [cart, setCart] = useState(null)
  const [user, setUser] = useState(null)
  const [addresses, setAddresses] = useState(null)
  const [cartLoading, setCartLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)

  const handleCart = useCallback((cart) => {
    setCart(cart)
  })

  const handleUser = useCallback((user) => {
    setUser(user)
  })

  const handleAddresses = useCallback((addresses) => {
    setAddresses(addresses)
  })
  
  const handleCartLoading = useCallback((loading) => {
    setCartLoading(loading)
  })

  const handleAuthLoading = useCallback((loading) => {
    setAuthLoading(loading)
  })

  return (
    <CommerceContext.Provider 
      value={{ 
        cart,
        user,
        addresses,
        cartLoading,
        authLoading,
        handleCart,
        handleUser,
        handleAddresses,
        handleCartLoading,
        handleAuthLoading,
      }}
    >
      {children}
    </CommerceContext.Provider>
  )
}