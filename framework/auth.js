import { useEffect, useState } from "react";
import { gql } from 'graphql-request'
import { graphqlClient } from "../lib/graphqlClient"
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

  const login = async (email, password) => {
    const response = await graphqlClient.rawRequest(loginMutation, {email, password})
    if(response.status === 200 && response.data.tokenCreate.token){
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
    const response = await graphqlClient.rawRequest(registerMutation, {input: params})
    const errors = response.data.accountRegister.accountErrors
    const user = response.data.accountRegister.user
    if(errors.length === 0 && user){
      await login(params.email, params.password)
    }
    return { errors: errors }
  };

  const getUser = async (token) => {
    graphqlClient.setHeader("Authorization", `JWT ${token}`)
    const response = await graphqlClient.rawRequest(meQuery)
    if(response.status === 200){
      setUser(response.data.me)
    }
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if(token){
      getUser(token)
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