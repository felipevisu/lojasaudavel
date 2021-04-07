import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"
import Cookies from 'js-cookie'

import { addressFragment } from './fragments'

export const userFragment = gql`
  ${addressFragment}
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
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

const registerMutation = gql`
  ${userFragment}
  ${accountErrorsFragment}
  mutation Register($input: AccountRegisterInput!) {
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

  const register = async (params) => {
    const response = await apolloClient.mutate({mutation: registerMutation, variables: {input: params}})
    const errors = response.data.accountRegister.accountErrors
    const user = response.data.accountRegister.user
    if(errors.length === 0 && user){
      await login(params.email, params.password)
    }
    return { errors: errors }
  };

  const requestPasswordReset = async (email) => {
    const response = await apolloClient.mutate({
      mutation: requestPasswordResetMutation, 
      variables: {
        email: email,
        redirectUrl: "http://localhost:8000/conta/recuperar"
      }
    })
    const errors = response.data.requestPasswordReset.accountErrors
    return { errors: errors }
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
    const errors = response.data.setPassword.accountErrors
    if(user){
      setUser(user)
      Cookies.set('token', response.data.setPassword.token, { expires: 7 })
      Cookies.set('refreshToken', response.data.setPassword.refreshToken, { expires: 7 })
    }
    return { user: user, errors: errors }
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
    register,
    requestPasswordReset,
    accountAddressCreate,
    getUser,
    setUser,
    setPassword,
    setOpen
  }
}

export default useAuth