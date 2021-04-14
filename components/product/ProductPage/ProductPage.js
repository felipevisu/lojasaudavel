import { useEffect, useMemo, useState } from 'react'
import Media from './Media'
import { formatMoney } from '../../utils'
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi' 
import { useCommerce } from '../../../framework'

export function ProductPage({product}){
  const { cart } = useCommerce()
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(product.variants.filter((vari) => vari.quantityAvailable > 0)[0] || product.variants[0])
  const [quantity, setQuantity] = useState(1)

  const handleSelect = (e) => {
    setSelected(product.variants.find((vari) => vari.id === e.target.value))
  }

  const handleQuantity = (value) => {
    if(parseInt(value) > 0){
      setQuantity(parseInt(value))
    }
  }

  const handleAdd = async () => {
    setLoading(true)
    const response = await cart.checkoutLinesAdd([{
      quantity: quantity,
      variantId: selected.id
    }])
    if(response.data.checkoutLinesAdd.checkoutErrors.length === 0){
      cart.setOpen(true)
    }
    setLoading(false)
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
          
          {product.variants.length > 1 &&
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
          }

          <div className="mb-6">
            <h4 className="font-semibold mb-1">Quantidade ({selected.quantityAvailable} {selected.quantityAvailable === 1 ? 'disponível' : 'disponíveis'})</h4>
            <div className="flex">
              <button
                type="button"
                onClick={() => handleQuantity(quantity-1)}
                className="appearance-none hover:bg-gray-200 focus:outline-none w-12 border-2 border-gray-400 text-center bg-gray-100 text-gray-600"
              >
                <FiMinus className="mx-auto" />
              </button>
              <div className="w-24">
                <input 
                  type="text" 
                  name="quantity" 
                  value={quantity}
                  onChange={(e) => handleQuantity(e.target.value)}
                  className="appearance-none outline-none focus:ring-0 focus:border-gray-400 text-center w-24 border-t-2 border-b-2 border-l-0 border-r-0 border-gray-400"
                />
              </div>
              
              <button
                type="button"
                onClick={() => handleQuantity(quantity+1)}
                className="appearance-none hover:bg-gray-200 focus:outline-none w-12 border-2 border-gray-400 text-center bg-gray-100 text-gray-600"
              >
                <FiPlus className="mx-auto" />
              </button>
            </div>
          </div>

          <div>
            <button 
              type="button"
              onClick={handleAdd}
              className="appearance-none focus:outline-none hover:bg-green-600 flex items-center bg-green-500 font-semibold text-white rounded px-5 py-3 text-xl"
            >
              {loading
                ? "Carregando..."
                : <>
                    <span className="mr-2"><FiShoppingCart /></span>
                    <span>Adicionar ao carrinho</span>
                  </>
              }
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductPage