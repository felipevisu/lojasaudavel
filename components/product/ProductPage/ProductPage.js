import { useEffect, useMemo, useState } from 'react'
import Media from './Media'
import { formatMoney } from '../../utils'

export function ProductPage({product}){
  const [selected, setSelected] = useState(product.variants.filter((vari) => vari.quantityAvailable > 0)[0] || product.variants[0])

  const handleSelect = (e) => {
    setSelected(product.variants.find((vari) => vari.id === e.target.value))
  }

  const price = useMemo(() => selected.pricing.price.gross.amount, [selected])
  const priceUndiscounted = useMemo(() => selected.pricing.priceUndiscounted.gross.amount, [selected])

  return(
    <div>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <Media media={product.media} selected={selected} />
        </div>
        <div>

          <div className="mb-4">
            <h4 className="font-semibold">Produto</h4>
            <h3 className="text-4xl font-bold">{product.name}</h3>
            <h3 className="text-xl">Categoria: <span className="font-semibold">{product.category.name}</span></h3>
          </div>

          <div className="mb-4">
            {priceUndiscounted !== price && 
              <span className="text-2xl text-red-500">
                {formatMoney(priceUndiscounted)}
              </span>
            }
            <span className="text-4xl font-light text-green-600">
              {formatMoney(price)}
            </span>
            
          </div>

          <div>
            <h4 className="font-semibold">Opções</h4>
            <span className="text-sm text-gray-500">Clique na opção desejada para selecioná-la.</span>
            <div className="mt-2">
              {product.variants.map((variant) =>
                <button
                  type="button"
                  key={variant.id} 
                  value={variant.id}
                  onClick={handleSelect}
                  className={`${selected.id === variant.id ? 'bg-green-500 text-white' : 'text-green-500'} focus:outline-none appearance-none hover:bg-green-500 hover:text-white font-bold border-2 border-green-500 mr-2 mb-2 rounded-full px-4 py-1`}
                >
                  {variant.name}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductPage