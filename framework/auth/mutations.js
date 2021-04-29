import { gql } from "@apollo/client";
import { accountErrorsFragment, addressFragment, userFragment, userAddressesFragment } from './fragments'

export const loginMutation = gql`
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

export const accountRegisterMutation = gql`
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

export const requestPasswordResetMutation = gql`
  ${accountErrorsFragment}
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl){
      accountErrors{
        ...AccountErrorsFragment
      }
    }
  }
`

export const setPasswordMutation = gql`
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

export const passwordChangeMutation = gql`
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

export const accountUpdateMutation = gql`
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

export const accountAddressCreateMutation = gql`
  ${accountErrorsFragment}
  ${addressFragment}
  ${userAddressesFragment}
  mutation AccountAddressCreate($input: AddressInput!) {
    accountAddressCreate(input: $input){
      accountErrors{
        ...AccountErrorsFragment
      }
      address {
        ...AddressFragment
      }
      user{
        ...UserAddressesFragment
      }
    }
  }
`

export const accountAddressUpdateMutation = gql`
  ${accountErrorsFragment}
  ${addressFragment}
  ${userAddressesFragment}
  mutation AccountAddressUpdate($id: ID!, $input: AddressInput!) {
    accountAddressUpdate(id: $id, input: $input){
      accountErrors{
        ...AccountErrorsFragment
      }
      address {
        ...AddressFragment
      }
      user{
        ...UserAddressesFragment
      }
    }
  }
`

export const accountAddressDeleteMutation = gql`
  ${accountErrorsFragment}
  ${userAddressesFragment}
  mutation AccountAddressDelete($id: ID!) {
    accountAddressDelete(id: $id){
      accountErrors{
        ...AccountErrorsFragment
      }
      user{
        ...UserAddressesFragment
      }
    }
  }
`