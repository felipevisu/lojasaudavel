import Head from 'next/head'
import { ProductList } from '../../components/product'
import getAttributes from '../../framework/attributes'
import { getCategory, getAllCategories } from '../../framework/categories'
import { getAllProducts } from '../../framework/products'

export default function Category({category, attributes, products}){

  return(
    <>
      <Head>
        <title>Loja Saudável - {category.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList category={category} attributes={attributes} products={products} />
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
  
  const products = await getAllProducts({
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
      categories: [category.category.id]
    }
  })

  return {
    props: {
      category: category.category,
      attributes: attributes.attributes.edges.map(({node}) => node),
      products: products
    },
    revalidate: 1000,
  }
}