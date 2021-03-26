import Head from 'next/head'
import useSWR from 'swr'
import { request } from 'graphql-request';
import { queryProducts } from '../framework/products'
import { ProductCard } from '../components/product'

import 'keen-slider/keen-slider.min.css';

export default function Home({ response }) {

  const variables = {
    first: 30,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
      categories: ["Q2F0ZWdvcnk6MQ=="]
    }
  }

  const fetch = (query) => request("http://localhost:8000/graphql/", query, variables)

  const { data: data, mutate, error } = useSWR([queryProducts], fetch, { initialData: response, revalidateOnMount: true })

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
        {data?.products.edges.map(({node}, key) =>
          <ProductCard key={key} {...node} />
        )}
        </div>
      </div>
      
    </div>
  )
  
}

export async function getStaticProps(context) {
  const response = await request("http://localhost:8000/graphql/", queryProducts, {
    first: 30,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
      categories: ["Q2F0ZWdvcnk6MQ=="]
    }
  })

  return {
    props: {
      response: response,
    },
    revalidate: 10000
  }
}
