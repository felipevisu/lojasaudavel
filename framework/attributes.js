import { gql } from 'graphql-request'
import { graphqlClient } from '../lib/graphqlClient'

export const queryAttributes = gql`
  query AttributeList(
    $first: Int
    $filter: AttributeFilterInput
  ){
    attributes(
      first: $first
      filter: $filter
    ){
      edges{
        node{
          id
          name
          slug
          values {
            id
            name
            slug
          }
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

export async function getAttributes(variables={}){
  const response = await graphqlClient.request(queryAttributes, variables);
  return response
}

export default getAttributes