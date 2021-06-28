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
import { useEffect } from "react"

function App({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

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
