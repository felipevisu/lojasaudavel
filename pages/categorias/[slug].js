import Head from 'next/head'
import { ProductList } from '../../components/product'
import { queryAttributes } from '../../framework/attributes'
import { queryCategory, queryCategories } from '../../framework/categories'
import { queryProducts } from '../../framework/products'
import { initializeApollo } from "../../lib/apolloClient"
import Container from '../../components/common/container'

export default function Category(props){

  return(
    <Container>
      <Head>
        <title>Loja Saudável - {props.category.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList category={props.category} attributes={props.attributes} />
    </Container>
  )
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const categories = await apolloClient.query({
    query: queryCategories,
    variables: {
      first: 100
    }
  })

  const paths = categories.data.categories.edges.map(({node}) => ({
    params: { slug: node.slug },
  }))

  return { paths, fallback: 'blocking'}
}

export async function getStaticProps(context) {
  const apolloClient = initializeApollo();

  const category = await apolloClient.query({
    query: queryCategory,
    variables: {
      slug: context.params.slug
    }
  });

  const attributes = await apolloClient.query({
    query: queryAttributes,
    variables: {
      first: 30,
      filter: {
        visibleInStorefront: true,
        inCategory: category.data.category.id,
        channel: "casa-nature"
      }
    }
  })

  await apolloClient.query({
    query: queryProducts,
    variables: {
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
        categories: [category.data.category.id],
        attributes: [],
        search: ""
      }
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      category: category.data.category,
      attributes: attributes.data.attributes.edges.map(({node}) => node),
    },
    revalidate: 1000,
  }
}