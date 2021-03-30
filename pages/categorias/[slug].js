import Head from 'next/head'
import { ProductList } from '../../components/product'
import getAttributes from '../../framework/attributes'
import { getCategory, getAllCategories } from '../../framework/categories'

export default function Category({category, attributes}){

  return(
    <>
      <Head>
        <title>Loja Saudável - {category.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList category={category} attributes={attributes} />
    </>
  )
}

export async function getStaticPaths() {
  const response = await getAllCategories()

  const paths = response.categories.edges.map(({node}) => ({
    params: { slug: node.slug },
  }))

  return { paths, fallback: 'blocking'}
}

export async function getStaticProps(context) {
  const category = await getCategory(context.params.slug)
  const attributes = await getAttributes({
    first: 30,
    filter: {
      visibleInStorefront: true,
      inCategory: category.category.id,
      channel: "casa-nature"
    }
  })

  return {
    props: {
      category: category.category,
      attributes: attributes.attributes.edges.map(({node}) => node),
    },
    revalidate: 1000,
  }
}