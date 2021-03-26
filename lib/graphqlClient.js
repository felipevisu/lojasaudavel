import { GraphQLClient } from 'graphql-request'

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URI, {})