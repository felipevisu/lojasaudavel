import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient"

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
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({query: queryAttributes, variables: variables});
  return response.data.attributes
}

export default getAttributes