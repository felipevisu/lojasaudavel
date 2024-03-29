import { useCallback, useContext } from "react";
import { toast } from 'react-toastify';
import { initializeApollo } from "../../lib/apolloClient"
import { AuthContext } from "./context";

import * as ga from '../../lib/analytics'

import {
  loginMutation,
  accountRegisterMutation,
  requestPasswordResetMutation,
  passwordChangeMutation,
  setPasswordMutation,
  accountAddressCreateMutation,
  accountAddressUpdateMutation,
  accountAddressDeleteMutation,
  accountUpdateMutation
} from './mutations'

import {
  meQuery,
  userAddressesQuery
} from './queries'

export function useAuth(){
  const {
    user, 
    setUser, 
    addresses, 
    setAddresses,
    open,
    setOpen,
    loading,
    setLoading,
   } = useContext(AuthContext)

  const apolloClient = initializeApollo();

  const login = async (email, password) => {
    setLoading(true)
    const response = await apolloClient.mutate({
      mutation: loginMutation, 
      variables: {email: email, password: password}
    })
    if(response.data.tokenCreate.token){
      setUser(response.data.tokenCreate.user)
      localStorage.setItem('token', response.data.tokenCreate.token)
      localStorage.setItem('refreshToken', response.data.tokenCreate.refreshToken)
      await getAddresses()
      setOpen(false)
      ga.login()
    }
    setLoading(false)
    return response
  };

  const logout = useCallback(() => {
    setUser(null)
    setAddresses([])
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }, []);

  const accountRegister = async (input) => {
    const response = await apolloClient.mutate({
      mutation: accountRegisterMutation, 
      variables: {input: input}
    })
    const user = response.data.accountRegister.user
    if(user){
      ga.register()
      await login(input.email, input.password)
    }
    return response
  };

  const requestPasswordReset = async (email) => {
    const response = await apolloClient.mutate({
      mutation: requestPasswordResetMutation, 
      variables: {
        email: email,
        redirectUrl: "https://lojasaudavel.com.br/recuperar"
      }
    })
    return response
  }

  const passwordChange = async (newPassword, oldPassword) => {
    const response = await apolloClient.mutate({
      mutation:  passwordChangeMutation, 
      variables: {
        newPassword: newPassword,
        oldPassword: oldPassword,
      }
    })
    if(response.data.passwordChange.user){
      setUser(response.data.passwordChange.user)
      toast.success("Senha alterada com sucesso.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return response
  }

  const setPassword = async (email, password, token) => {
    const response = await apolloClient.mutate({
      mutation: setPasswordMutation, 
      variables: {
        email: email,
        password: password,
        token: token
      }
    })
    const user = response.data.setPassword.user
    if(user){
      setUser(user)
      localStorage.setItem('token', response.data.setPassword.token)
      localStorage.setItem('refreshToken', response.data.setPassword.refreshToken)
    }
    return response
  }

  const accountAddressCreate = async (input) => {
    const response = await apolloClient.mutate({
      mutation: accountAddressCreateMutation, 
      variables: {input: input}
    })
    if(response.data.accountAddressCreate.address){
      setAddresses(response.data.accountAddressCreate.user.addresses)
    }
    return response
  }

  const accountAddressUpdate = async (id, input) => {
    const response = await apolloClient.mutate({
      mutation: accountAddressUpdateMutation, 
      variables: {id: id, input: input}
    })
    if(response.data.accountAddressUpdate.address){
      setAddresses(response.data.accountAddressUpdate.user.addresses)
    }
    return response
  }

  const accountAddressDelete = async (id) => {
    const response = await apolloClient.mutate({
      mutation: accountAddressDeleteMutation, 
      variables: {id: id}
    })
    if(response.data.accountAddressDelete.user){
      setAddresses(response.data.accountAddressDelete.user.addresses)
      toast.success("Endereço excluído com sucesso.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return response
  }

  const accountUpdate = async (input) => {
    const response = await apolloClient.mutate({
      mutation: accountUpdateMutation, 
      variables: {input: input}
    })
    if(response.data.accountUpdate.user){
      setUser(response.data.accountUpdate.user)
      toast.success("Informações salvas com sucesso.", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    return response
  }

  const getUser = async () => {
    const response = await apolloClient.query({query: meQuery})
    if(response?.data?.me){
      setUser(response.data.me)
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }

  const getAddresses = async () => {
    const response = await apolloClient.query({query: userAddressesQuery})
    if(response.data.me){
      setAddresses(response.data.me.addresses)
    }
  }

  const initialize = async () => {
    const token = localStorage.getItem('token')
    if(token){
      await getUser()
      await getAddresses()
    }
    setLoading(false)
  }

  return {
    user,
    setUser,
    addresses,
    open,
    setOpen,
    loading,
    initialize,
    login,
    logout,
    accountRegister,
    accountUpdate,
    requestPasswordReset,
    accountAddressCreate,
    accountAddressUpdate,
    accountAddressDelete,
    passwordChange,
    getUser,
    setPassword,
  }
}

export default useAuth