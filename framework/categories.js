import { gql } from 'graphql-request'
import { graphqlClient } from '../lib/graphqlClient'

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
  const response = await graphqlClient.request(queryCategory, {slug: slug});
  return response
} 

export async function getAllCategories(variables={}){
  const response = await graphqlClient.request(queryCategories, variables);
  return response
} 