import { gql } from "@apollo/client";
import { checkoutFragment, checkoutShippingMethodsFragment } from './fragments'

export const checkoutShippingMethodsQuery = gql`
  ${checkoutShippingMethodsFragment}
  query Checkout($token: UUID!) {
    checkout(token: $token){
      ...CheckoutShippingMethodsFragment
    }
  }
`

export const checkoutQuery = gql`
  ${checkoutFragment}
  query Checkout($token: UUID!) {
    checkout(token: $token){
      ...CheckoutFragment
    }
  }
`