import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"
import Cookies from 'js-cookie'


const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password ){
      token
      refreshToken
      accountErrors{
        field
        message
        code
      }
      user{
        id
        firstName
        lastName
        email
      }
    }
  }
`

const registerMutation = gql`
  mutation Register($input: AccountRegisterInput!) {
    accountRegister(input: $input){
      accountErrors{
        field
        message
        code
      }
      user{
        id
        firstName
        lastName
        email
      }
    }
  }
`

const requestPasswordResetMutation = gql`
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl){
      accountErrors{
        field
        message
        code
      }
    }
  }
`

const setPasswordMutation = gql`
  mutation SetPassword($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token){
      token
      refreshToken
      accountErrors{
        field
        message
        code
      }
      user{
        id
        firstName
        lastName
        email
      }
    }
  }
`

const meQuery = gql`
  query User{
    me{
      id
      firstName
      lastName
      email
    }
  }
`

export function useAuth(){
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

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

  const logout = () => {
    setUser(null)
    Cookies.remove('token')
    Cookies.remove('refreshToken')
  };

  const register = async (params) => {
    const response = await apolloClient.query({query: registerMutation, variables: {input: params}})
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

  const getUser = async () => {
    const response = await apolloClient.query({query: meQuery})
    if(response.data.me){
      setUser(response.data.me)
    }
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if(token){
      getUser()
    }
  }, [])

  return {
    user,
    open,
    login,
    logout,
    register,
    requestPasswordReset,
    setPassword,
    setOpen
  }
}

export default useAuth