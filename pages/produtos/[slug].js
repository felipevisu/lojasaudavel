import { queryProductList, queryProduct } from '../../framework/products'
import { initializeApollo } from '../../lib/apolloClient'
import { ProductPage } from '../../components/product'
import Head from 'next/head'
import { useRouter } from 'next/router'

export function Product({product}){
  const router = useRouter()

  if(router.isFallback){
    return(
      <div className="container mx-auto px-4 py-8">Carregando...</div>
    )
  }

  return(
    <>
      <Head>
        <title>Loja Saudável - {product.name}</title>
      </Head>
      <div className="container mx-auto px-4 pb-8 pt-4 xl:pt-6 xl:max-w-screen-xl">
        <ProductPage product={product} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const products = await apolloClient.query({
    query: queryProductList,
    variables: {
      first: 100,
      channel: "casa-nature",
      filter:{
        channel: "casa-nature",
        isPublished: true
      }
    }
  })

  const paths = products.data.products.edges.map(({node}) => ({
    params: { slug: node.slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const product = await apolloClient.query({
    query: queryProduct,
    variables: {
      slug: context.params.slug,
      channel: "casa-nature"
    }
  });

  return {
    props: {
      product: product.data.product
    },
    revalidate: 300,
  }
}

export default Product