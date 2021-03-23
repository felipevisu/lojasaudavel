import 'tailwindcss/tailwind.css'
import '../assets/fonts.css'
import { ApolloProvider } from "@apollo/client";
import { CommerceProvider } from '../framework';
import { useApollo } from "../lib/apolloClient";
import { Layout } from '../components/common'

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={apolloClient}>
      <CommerceProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CommerceProvider>
    </ApolloProvider>
  )
}

export default App
