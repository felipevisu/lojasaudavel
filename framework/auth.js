import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { addressFragment } from './fragments'

export const userFragment = gql`
  ${addressFragment}
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    phone,
    addresses{
      ...AddressFragment
    }
    defaultShippingAddress{
      ...AddressFragment
    }
    defaultBillingAddress{
      ...AddressFragment
    }
  }
`;

export const accountErrorsFragment = gql`
  fragment AccountErrorsFragment on AccountError{
    field
    message
    code
  }
`

const loginMutation = gql`
  ${userFragment}
  ${accountErrorsFragment}
  mutation Login($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password ){
      token
      refreshToken
      accountErrors{
        ...AccountErrorsFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

const accountRegisterMutation = gql`
  ${userFragment}
  ${accountErrorsFragment}
  mutation AccountRegister($input: AccountRegisterInput!) {
    accountRegister(input: $input){
      accountErrors{
        ...AccountErrorsFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

const requestPasswordResetMutation = gql`
  ${accountErrorsFragment}
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl){
      accountErrors{
        ...AccountErrorsFragment
      }
    }
  }
`

const setPasswordMutation = gql`
  ${userFragment}
  ${accountErrorsFragment}
  mutation SetPassword($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token){
      token
      refreshToken
      accountErrors{
        ...AccountErrorsFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

const passwordChangeMutation = gql`
  ${userFragment}
  ${accountErrorsFragment}
  mutation PasswordChange($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword){
      accountErrors{
        ...AccountErrorsFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

const accountUpdateMutation = gql`
  ${userFragment}
  ${accountErrorsFragment}
  mutation AccountUpdate($input: AccountInput!) {
    accountUpdate(input: $input){
      accountErrors{
        ...AccountErrorsFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

const meQuery = gql`
  ${userFragment}
  query User{
    me{
      ...UserFragment
    }
  }
`

const accountAddressCreateMutation = gql`
  ${accountErrorsFragment}
  ${addressFragment}
  ${userFragment}
  mutation AccountAddressCreate($input: AddressInput!) {
    accountAddressCreate(input: $input){
      accountErrors{
        ...AccountErrorsFragment
      }
      address {
        ...AddressFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

const accountAddressUpdateMutation = gql`
  ${accountErrorsFragment}
  ${addressFragment}
  ${userFragment}
  mutation AccountAddressUpdate($id: ID!, $input: AddressInput!) {
    accountAddressUpdate(id: $id, input: $input){
      accountErrors{
        ...AccountErrorsFragment
      }
      address {
        ...AddressFragment
      }
      user{
        ...UserFragment
      }
    }
  }
`

export function useAuth(){
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  const apolloClient = initializeApollo();

  const login = async (email, password) => {
    const response = await apolloClient.mutate({
      mutation: loginMutation, 
      variables: {email: email, password: password}
    })
    if(response.data.tokenCreate.token){
      setUser(response.data.tokenCreate.user)
      Cookies.set('token', response.data.tokenCreate.token, { expires: 7 })
      Cookies.set('refreshToken', response.data.tokenCreate.refreshToken, { expires: 7 })
      setOpen(false)
    }
    return response
  };

  const accountRegister = async (input) => {
    const response = await apolloClient.mutate({
      mutation: accountRegisterMutation, 
      variables: {input: input}
    })
    const user = response.data.accountRegister.user
    if(user){
      await login(input.email, input.password)
    }
    return response
  };

  const requestPasswordReset = async (email) => {
    const response = await apolloClient.mutate({
      mutation: requestPasswordResetMutation, 
      variables: {
        email: email,
        redirectUrl: "http://localhost:8000/recuperar"
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
      Cookies.set('token', response.data.setPassword.token, { expires: 7 })
      Cookies.set('refreshToken', response.data.setPassword.refreshToken, { expires: 7 })
    }
    return response
  }

  const accountAddressCreate = async (input) => {
    const response = await apolloClient.mutate({
      mutation: accountAddressCreateMutation, 
      variables: {input: input}
    })
    if(response.data.accountAddressCreate.address){
      setUser(response.data.accountAddressCreate.user)
    }
    return response
  }

  const accountAddressUpdate = async (id, input) => {
    const response = await apolloClient.mutate({
      mutation: accountAddressUpdateMutation, 
      variables: {id: id, input: input}
    })
    if(response.data.accountAddressUpdate.address){
      setUser(response.data.accountAddressUpdate.user)
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
    if(response.data.me){
      setUser(response.data.me)
    } else {
      Cookies.remove('token')
      Cookies.remove('refreshToken')
    }
    setAuthLoading(false)
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if(token){
      getUser()
    } else {
      setAuthLoading(false)
    }
  }, [])

  return {
    user,
    open,
    authLoading,
    login,
    accountRegister,
    accountUpdate,
    requestPasswordReset,
    accountAddressCreate,
    accountAddressUpdate,
    passwordChange,
    getUser,
    setUser,
    setPassword,
    setOpen
  }
}

export default useAuth