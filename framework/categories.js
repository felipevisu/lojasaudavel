import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"

const CategoryFragment = gql`
  fragment CategoryFragment on Category{
    id
    name
    slug
    description
  }
`

export const queryCategories = gql`
  query CategoryList(
    $first: Int = 100,
    $after: String,
    $last: Int,
    $before: String,
    $filter: CategoryFilterInput,
    $sort: CategorySortingInput
  ){
    categories(
      before: $before
      after: $after
      first: $first
      last: $last
      filter: $filter
      sortBy: $sort
    ){
      edges{
        node{
          id
          name
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
`;

export const queryCategory = gql`
  ${CategoryFragment}
  query Category($slug: String){
    category(slug: $slug){
      ...CategoryFragment
    }
  }
`;

export async function getCategory(slug){
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({query: queryCategory, variables: {slug: slug}});
  return response.data.category
} 

export async function getAllCategories(variables={}){
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({query: queryCategories, variables: variables});
  return response.data.categories
} 