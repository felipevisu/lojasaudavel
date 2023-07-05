import Head from 'next/head'
import { getAllProducts } from '../framework/products'
import { getSlideshow } from '../framework/slideshow'
import { ProductCard } from '../components/product'
import { Slideshow } from '../components/common/'
import { Banner } from '../components/common'

import 'keen-slider/keen-slider.min.css';

export default function Home({ slideshow, banners, products, granel }) {
  return (
    <>
      <Head>
        <title>Loja Saudável - Início</title>
      </Head>
      <div className="py-6">
        {
          slideshow &&
          <div className="container mx-auto px-4 mb-6">
            <Slideshow slides={slideshow.slides} />
          </div>
        }

        <div className="container mx-auto px-4 mb-6">
          <div className="flex mb-4">
            <h3 className="text-xl font-light">Produtos em destaque</h3>
          </div>
          <div className="productGrid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
            {products.map((product, key) => 
              <ProductCard key={key} {...product} />
            )}
          </div>
        </div>

        {
          banners &&
          <div className="container mx-auto px-4 mb-6">
            <div className="bannersGrid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
              {banners.slides.map((banner, key) => 
                <Banner key={key} banner={banner} />
              )}
            </div>
          </div>
        }

        <div className="container mx-auto px-4">
          <div className="flex mb-4">
            <h3 className="text-xl font-light">Produtos a granel</h3>
          </div>
          <div className="productGrid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
            {granel.map((product, key) => 
              <ProductCard key={key} {...product} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps(context) {

  const slideshow = await getSlideshow("Slideshow Principal")
  const banners = await getSlideshow("Banners")

  const recentes = await getAllProducts({
    first: 10,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC",
      channel: "casa-nature"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature"
    }
  })

  const granel = await getAllProducts({
    first: 10,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC",
      channel: "casa-nature"
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
      products: recentes.edges.map(({node}) => node),
      granel: granel.edges.map(({node}) => node)
    },
    revalidate: 1000
  }
}
