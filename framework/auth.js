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
    setOpen
  }
}

export default useAuth