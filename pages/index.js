import Head from 'next/head'

import getAllProducts from '../framework/products'
import getSlideshow from "../framework/slideshow"
import { ProductCard } from '../components/product'

export default function Home({ slideshow, banners, products, granel }) {
  console.log(slideshow)

  return (
    <div>
      <Head>
        <title>Loja Saudável</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        {slideshow.slides.map((slide, key) => 
          <img src={slide.image} key={key} wid />
        )}
      </div>

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

  const slideshow = await getSlideshow("Slideshow Principal")
  const banners = await getSlideshow("Banners")

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

  return {
    props: {
      slideshow,
      banners,
      products: recentes,
      granel: granel
    },
    revalidate: 10000
  }
}
