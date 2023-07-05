import 'tailwindcss/tailwind.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/fonts.css'
import '../assets/global.css'

import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify';
import { Layout } from '../components/common'
import { useApollo } from "../lib/apolloClient";

import { SiteProvider } from '../framework'
import { AuthProvider, useAuth } from '../framework/auth'
import { CartProvider } from '../framework/cart'

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description" content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
          Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e 
          todos que buscam uma vida mais saudável." 
        />
        <meta name="keywords" content="Loja Saudável" />
        <title>Loja Saudável</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name='theme-color' content='#FFFFFF' />
      </Head>
      <ApolloProvider client={apolloClient}>
        <SiteProvider>
          <AuthProvider>
            <CartProvider>
              <Layout> 
                <ToastContainer />         
                <Component {...pageProps} />
              </Layout>
            </CartProvider>
          </AuthProvider>
        </SiteProvider>
      </ApolloProvider>
    </>
  )
}

export default App
