import { gql } from 'graphql-request'
import { graphqlClient } from '../lib/graphqlClient'

const ProductFragment = gql`
  fragment ProductFragment on Product{
    id
    name
    category{
      name
    }
    images{
      id
      url(size: 300)
    }
    productType{
      hasVariants
    }
    defaultVariant{
      id
    }
    pricing{
      priceRange{
        start{
          gross{
            amount
          }
        }
        stop{
          gross{
            amount
          }
        }
      }
    }
    variants{
      id
      name
      quantityAvailable
      images{
        id
      }
      pricing{
        price{
          gross{
            amount
          }
        }
      }
    }
  }
`

export const queryProducts = gql`
  ${ProductFragment}
  query ProductList(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: ProductFilterInput
    $sortBy: ProductOrder
    $channel: String = "casa-nature"
  ){
    products(
      first: $first
      last: $last
      before: $before
      after: $after
      filter: $filter
      sortBy: $sortBy
      channel: $channel
      stockAvailability: IN_STOCK
    ){
      edges{
        node{
          ...ProductFragment
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export async function getAllProducts(variables={}){
  const response = await graphqlClient.request(queryProducts, variables);
  return response
} 

export default getAllProducts