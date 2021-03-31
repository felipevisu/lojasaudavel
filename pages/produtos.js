import Head from 'next/head'

import 'keen-slider/keen-slider.min.css';
import { ProductList}  from '../components/product';
import getAttributes from '../framework/attributes';

export default function Home({ attributes }) {

  return (
    <div>
      <Head>
        <title>Loja Saudável - Produtos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList attributes={attributes} />
    </div>
  )
  
}

export async function getStaticProps() {
  const attributes = await getAttributes({
    first: 30,
    filter: {
      visibleInStorefront: true,
      channel: "casa-nature"
    }
  })

  return {
    props: {
      attributes: attributes.edges.map(({node}) => node)
    },
    revalidate: 1000
  }
}
