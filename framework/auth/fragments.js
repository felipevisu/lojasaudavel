import { gql } from "@apollo/client";

export const addressFragment = gql`
  fragment AddressFragment on Address {
    id
    streetAddress1
    streetAddress2
    cityArea
    city
    countryArea
    postalCode
    country{
      code
    }
  }
`

export const userFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    phone
  }
`;

export const userAddressesFragment = gql`
  ${addressFragment}
  fragment UserAddressesFragment on User {
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