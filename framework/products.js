import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"

const ProductFragment = gql`
  fragment ProductFragment on Product{
    id
    name
    category{
      name
    }
    media{
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
      media{
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
    $sort: ProductOrder
    $channel: String = "casa-nature"
  ){
    products(
      first: $first
      last: $last
      before: $before
      after: $after
      filter: $filter
      sortBy: $sort
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
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({query: queryProducts, variables: variables});
  return response.data.products
} 

export default getAllProducts