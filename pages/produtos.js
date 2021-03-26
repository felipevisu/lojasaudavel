import Head from 'next/head'
import { getAllProducts } from '../framework/products'

import 'keen-slider/keen-slider.min.css';
import ProductPage from '../components/product/ProductPage/ProductPage';

export default function Home({ products }) {

  return (
    <div>
      <Head>
        <title>Loja Saudável - Produtos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4 mb-4">
        <h3 className="text-xl font-light">Produtos</h3>
      </div>
      <ProductPage products={products} />
    </div>
  )
  
}

export async function getStaticProps(context) {
  const products = await getAllProducts({
    first: 40,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
    }
  })

  return {
    props: {
      products: products,
    },
    revalidate: 10000
  }
}
