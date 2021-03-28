import useSWR from 'swr'
import { useFilter } from '../../../framework/filter'
import { graphqlClient } from '../../../lib/graphqlClient'
import { queryProducts } from '../../../framework/products'
import { ProductCard } from '../ProductCard'
import { Filter } from "../../common/filter"
import { Paginator } from '../../common'

export function ProductList({attributes, category, products}){
  const filter = useFilter({category: category})
  const fetch = (variables) => graphqlClient.request(queryProducts, variables)

  const { data: data, isValidating, mutate } = useSWR(
    [filter.variables], 
    fetch, 
    { 
      initialData: products, 
      revalidateOnMount: false, 
      revalidateOnFocus: false 
    }
  )

  if(isValidating){
    return(
      <div className="container mx-auto px-4">
          Carregando...
      </div>
    )
  }
  
  return(
    <>
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-5 gap-6 mb-6">
          {data.products.edges.map(({node}) =>
            <ProductCard key={node.id} {...node} />
          )}
        </div>
        <hr/>
        <div>
          <Paginator pageInfo={data.products.pageInfo} paginator={filter.setFilter} />
        </div>
      </div>
    </>
  )
}

export default ProductList