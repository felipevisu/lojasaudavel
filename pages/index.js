import Head from 'next/head'

import getAllProducts from '../framework/products'
import { ProductCard } from '../components/product'

export default function Home({ products, granel }) {
  return (
    <div>
      <Head>
        <title>Loja Saudável</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-6">
          {products.map((product, key) => 
            <ProductCard key={key} {...product} />
          )}
        </div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-6">
          {granel.map((product, key) => 
            <ProductCard key={key} {...product} />
          )}
        </div>
      </div>
      
    </div>
  )
}

export async function getStaticProps(context) {
  const { products: recentes } = await getAllProducts({
    first: 10,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature"
    }
  })

  const { products: granel } = await getAllProducts({
    first: 10,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel:"casa-nature",
      attributes: [
        {
          slug: "formato",
          values: ["granel"]
        }
      ]
    }
  })

  const { products: destaque } = await getAllProducts({
    first: 10,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature"
    }
  })

  return {
    props: {
      products: recentes,
      granel: granel
    },
    revalidate: 10000
  }
}
