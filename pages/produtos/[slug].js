import { queryProductList, queryProduct } from '../../framework/products'
import { initializeApollo } from '../../lib/apolloClient'


export function Product({product}){
  console.log(product)

  return(
    <div className="container mx-auto px-4 py-6 lg:py-50">
      <div className="grid grid-cols-2">
        <div>
          {product.media.map((media) =>
            <img src={media.url} alt={product.name} />
          )}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const products = await apolloClient.query({
    query: queryProductList,
    variables: {
      first: 100
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