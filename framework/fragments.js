import { gql } from "@apollo/client";

export const addressFragment = gql`
fragment AddressFragment on Address {
  streetAddress1
  streetAddress2
  cityArea
  city
  countryArea
  postalCode
}
`