import { queryProductList, queryProduct } from '../../framework/products'
import { initializeApollo } from '../../lib/apolloClient'
import { ProductPage } from '../../components/product'

export function Product({product}){
  return(
    <div className="container mx-auto px-4 py-6 lg:py-10">
      <ProductPage product={product} />
    </div>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const products = await apolloClient.query({
    query: queryProductList,
    variables: {
      first: 1000,
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

  return { paths, fallback: 'blocking'}
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