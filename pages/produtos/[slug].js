import { queryProductList, queryProduct } from '../../framework/products'

export function Produto(props){
  return(
    <div>
      Produto
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
      slug: context.params.slug
    }
  });

  return {
    props: {
      product: product
    },
    revalidate: 300,
  }
}