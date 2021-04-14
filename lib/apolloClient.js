import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { onError } from "apollo-link-error";
import { fromPromise, ApolloLink } from "apollo-link";
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react'

let apolloClient;

const REFRESH_TOKEN = gql`
  mutation TokenRefresh($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken){
      token
      accountErrors{
        code
        message
        field
      }
    }
  }
`

const getNewToken = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  return apolloClient.query({ query: REFRESH_TOKEN, variables: { refreshToken: refreshToken } }).then((response) => {
    const token = response.data.tokenRefresh.token
    if(token){
      localStorage.setItem("token", token)
    }
    return token
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
      for (let err of graphQLErrors) {
        if(err.extensions.exception.code === "InvalidTokenError"){
          return fromPromise(
            getNewToken().catch((error) => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
              return;
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((token) => {
              const oldHeaders = operation.getContext().headers;
              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `JWT ${token}`,
                },
              });

              // retry the request, returning the new observable
              return forward(operation);
            });
        }
      }
    }
  }
);

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URI,
});

const authLink = setContext((_, { headers }) => {
  var token;
  
  if (typeof window !== "undefined") {
    token = localStorage.getItem('token')
  } else {
    token = null
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}