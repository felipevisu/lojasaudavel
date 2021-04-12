import { useState } from 'react'
import { Field, Button } from '../../ui'
import { useCommerce } from '../../../framework'
import { formatMoney } from '../../utils'

export function Voucher(){
  const { cart } = useCommerce()
  const [code, setCode] = useState(cart.cart.voucherCode)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await cart.checkoutAddPromoCode(code)
    const response_errors = response.data.checkoutAddPromoCode.checkoutErrors
    if(response_errors.length > 0){
      setErrors(response_errors)
    }
    setLoading(false)
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await cart.checkoutRemovePromoCode(cart.cart.voucherCode)
    const response_errors = response.data.checkoutRemovePromoCode.checkoutErrors
    if(response_errors.length > 0){
      setErrors(response_errors)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setCode(e.target.value)
    setErrors([])
  }

  return(
    <div className="border-b mb-3 pb-4">
      <span className="font-semibold mb-1 text-gray-500 block">Aplicar cupom de desconto</span>
      <form className="flex mb-1" onSubmit={handleSubmit} noValidate>
        <div className="mr-2 w-72">
          <Field 
            id="code"
            name="code"
            value={code}
            error=""
            onChange={handleChange}
            placeholder="Cupom de desconto"
            className="h-10"
          />  
        </div>
        {cart.cart.voucherCode
          ? <button onClick={handleDelete} type="button" className="appearance-none focus:outline-none h-10 px-6 text-white font-semibold bg-red-500 hover:bg-red-600 rounded">
              {loading ? 'Carregando...' : 'Remover'}
            </button>
          : <Button className="h-10" type="submit" value={loading ? 'Carregando...' : 'Aplicar'} />
        }
      </form>
      {cart.cart.voucherCode &&
        <div>
          Desconto: {formatMoney(cart.cart.discount.amount)}
        </div>
      }
      {errors &&
        errors.map((error, key) =>
        <div key={key} className="text-red-500 font-semibold text-sm">
          {error.message}
        </div> 
      )}
    </div>
  )
}

export default Voucher