import Head from 'next/head'
import { getAllProducts } from '../framework/products'

import 'keen-slider/keen-slider.min.css';
import { ProductList}  from '../components/product';
import getAttributes from '../framework/attributes';

export default function Home({ attributes, products }) {

  return (
    <div>
      <Head>
        <title>Loja Saudável - Produtos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList attributes={attributes} products={products} />
    </div>
  )
  
}

export async function getStaticProps(context) {
  const products = await getAllProducts({
    first: 30,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC",
      channel: "casa-nature"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
    }
  })

  const attributes = await getAttributes({
    first: 30,
    filter: {
      visibleInStorefront: true,
      channel: "casa-nature"
    }
  })

  return {
    props: {
      attributes: attributes.attributes.edges.map(({node}) => node),
      products: products,
    },
    revalidate: 10000
  }
}
