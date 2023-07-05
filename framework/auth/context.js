import React, { createContext, useState } from 'react'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      addresses,
      setAddresses,
      open,
      setOpen,
      loading,
      setLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider 