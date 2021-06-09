import { useFilter } from '../../../framework/filter'
import { queryProducts } from '../../../framework/products'
import { ProductCard } from '../ProductCard'
import { Paginator } from '../../common'
import { Header } from '../Header'
import { Filter } from '../../common'
import { useQuery } from '@apollo/client';
import { Loading } from '../../common/loading'


export function ProductList({attributes, category}){
  const filter = useFilter({category: category})

  const { loading, data: products } = useQuery(queryProducts, {
    variables: filter.variables
  });

  return(
    <>
      <Filter attributes={attributes} />

      <div className="container mx-auto px-4">
        <Header category={category} total={products?.products?.totalCount || 0} />
        {loading && <Loading />}
        {products &&
          <>
            {
              products.products.edges.length === 0 &&
              <div className="pb-8">
                Nenhum produto encontrado.
              </div>
            }
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-6 mb-6">
              {products.products.edges.map(({node}) =>
                <ProductCard key={node.id} {...node} />
              )}
            </div>
            <hr/>
            <div>
              <Paginator pageInfo={products.products.pageInfo} paginator={filter.setFilter} />
            </div>
          </>
        }
      </div>
    </>
  )
}

export default ProductList