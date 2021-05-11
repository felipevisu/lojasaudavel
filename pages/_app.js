import 'tailwindcss/tailwind.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
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
        <meta name="theme-color" content="#38A169" />
        <meta
          name="description" content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
          Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e 
          todos que buscam uma vida mais saudável." 
        />
        <meta name="creator" content="Felipe Faria" />
        <meta name="author" content="Visualize Comunicação" />
        <meta name="copyright" content="Visualize Comunicação" />
        <meta name="robots" content="FOLLOW,INDEX,ALL" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Loja Saudável - Casa Nature - Guaxupé/MG" />
        <meta property="og:description" content="Loja Saudável - Sua nova loja online de alimentos saudáveis. 
        Suplementos, alimentos diet, light, sem lactose, sem glútem, para diabéticos, atletas e todos que 
        buscam uma vida mais saudável." />

        <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Regular.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Demi.woff2" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/avenir/AvenirNextLTPro-Bold.woff2" as="font" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
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
        <link rel="apple-touch-icon" href="/icons/apple-icon.png"></link>
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
