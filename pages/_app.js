import 'tailwindcss/tailwind.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/fonts.css'
import '../assets/global.css'

import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify';
import { CommerceProvider } from '../framework'
import { Layout } from '../components/common'
import { useApollo } from "../lib/apolloClient";

function App({ Component, pageProps }) {

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <CommerceProvider>
          <Layout> 
            <ToastContainer />         
            <Component {...pageProps} />
          </Layout>
        </CommerceProvider>
      </ApolloProvider>
    </>
  )
}

export default App
