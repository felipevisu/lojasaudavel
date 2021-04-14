import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"
import { ProductFragment, ProductDetailFragment } from './fragments'


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

export const queryProductList = gql`
  query ProductList(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: ProductFilterInput
    $sort: ProductOrder
    $channel: String
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
          slug
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
`

export const queryProduct = gql`
  ${ProductDetailFragment}
  query Product(
    $slug: String!
    $channel: String!
  ){
    product(
      slug: $slug
      channel: $channel
    ){
      ...ProductDetailFragment
    }
  }
`

export async function getAllProducts(variables={}){
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({query: queryProducts, variables: variables});
  return response.data.products
} 

export default getAllProducts