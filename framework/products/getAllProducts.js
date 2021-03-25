import { gql } from "@apollo/client";
import { initializeApollo } from '../../lib/apolloClient'

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
    $first: Int = 30,
    $after: String
    $last: Int
    $before: String
    $filter: ProductFilterInput
    $sort: ProductOrder
    $channel: String = "casa-nature"
  ){
    products(
      before: $before
      after: $after
      first: $first
      last: $last
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

async function getAllProducts(variables={}){
  const apolloClient = initializeApollo();
  const response = await apolloClient.query(
    { 
      query: queryProducts, 
      variables: variables
    }
  );
  return response
} 

export default getAllProducts