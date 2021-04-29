import { gql } from "@apollo/client";
import { checkoutFragment } from './fragments'

export const checkoutQuery = gql`
  ${checkoutFragment}
  query Checkout($token: UUID!) {
    checkout(token: $token){
      ...CheckoutFragment
    }
  }
`