import { useEffect } from "react"
import Head from 'next/head'
import useSWR from 'swr'
import { gql, useQuery } from '@apollo/client';
import { request } from 'graphql-request';
import getAllProducts, { queryProducts } from '../framework/products'
import { ProductCard } from '../components/product'

import 'keen-slider/keen-slider.min.css';

export default function Home({ response }) {

  const variables = {
    first: 10,
    channel: "casa-nature",
    sort: {
      field: "NAME",
      direction: "ASC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature"
    }
  }

  const { data, error } = useSWR([variables], (variables) => getAllProducts(variables));

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <Head>
        <title>Loja Saudável - Produtos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        <div className="flex mb-4">
          <h3 className="text-xl font-light">Produtos</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
          
        </div>
      </div>
      
    </div>
  )
}

export async function getStaticProps(context) {
  

  return {
    props: {
      response: [],
    },
    revalidate: 10000
  }
}
