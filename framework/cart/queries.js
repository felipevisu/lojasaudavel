import { gql } from "@apollo/client";
import { checkoutFragment } from './fragments'

export const checkoutQuery = gql`
  ${checkoutFragment}
  query Checkout($token: UUID!, $fetchExternalContent: Boolean) {
    checkout(token: $token, fetchExternalContent: $fetchExternalContent){
      ...CheckoutFragment
    }
  }
`