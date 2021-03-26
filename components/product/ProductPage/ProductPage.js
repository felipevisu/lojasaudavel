import useSWR from 'swr'
import { useState, useMemo } from 'react'
import { graphqlClient } from '../../../lib/graphqlClient'
import { queryProducts } from '../../../framework/products'
import { ProductCard } from '../ProductCard'
import { Paginator } from '../../common'

function ProductPage({category, products}){
  const [categories, setCategories] = useState(() => {
    if(category){
      return [category.id]
    }else{
      return []
    }
  })

  const [navigation, setNavigation] = useState({first: 40})

  const variables = useMemo(() => ({
    ...navigation,
    channel: "casa-nature",
    sort: {
      field: "DATE",
      direction: "DESC"
    },
    filter: {
      isPublished: true,
      channel: "casa-nature",
      categories: categories
    }
  }), [categories, navigation])

  const fetch = (variables) => graphqlClient.request(queryProducts, variables)

  const { data: data, isValidating, mutate } = useSWR([variables], fetch, { initialData: products, revalidateOnFocus: false })

  const onNav = (cursor, direction) =>{
    if(direction === 'next'){
      setNavigation({
        first: 40,
        after: cursor
      })
    } else {
      setNavigation({
        last: 40,
        before: cursor
      })
    }
    mutate(variables)
  }

  return(
    <>
      <div className="container mx-auto px-4">
        {isValidating &&
          <div>Carregando...</div>
        }
        <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6">
          {!isValidating && data.products.edges.map(({node}) =>
            <ProductCard key={node.id} {...node} />
          )}
        </div>
        <hr/>
        <div>
          <Paginator pageInfo={data.products.pageInfo} onNav={onNav} />
        </div>
      </div>
    </>
  )
}

export default ProductPage