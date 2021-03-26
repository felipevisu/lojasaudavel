import ProductPage from '../../components/product/ProductPage/ProductPage'
import { getCategory, getAllCategories } from '../../framework/categories'
import { getAllProducts } from '../../framework/products'

export default function Category({category, products}){

  return(
    <>
      <div className="container mx-auto px-4 mb-4">
        <h3 className="text-xl font-light">{category.name}</h3>
      </div>
      <ProductPage category={category} products={products} />
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
  const products = await getAllProducts({
    first: 40,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
      categories: [category.category.id]
    }
  })

  return {
    props: {
      products: products,
      category: category.category
    },
    revalidate: 200,
  }
}