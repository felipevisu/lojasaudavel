import { gql } from "@apollo/client";
import { userAddressesFragment, userFragment } from './fragments'

export const userAddressesQuery = gql`
  ${userAddressesFragment}
  query UserAddresses{
    me{
      ...UserAddressesFragment
    }
  }
`;

export const meQuery = gql`
  ${userFragment}
  query User{
    me{
      ...UserFragment
    }
  }
`