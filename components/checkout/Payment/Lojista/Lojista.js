import { useState } from 'react'
import { useCommerce } from '../../../../framework'
import { Field, Button, Select } from '../../../ui'


export function Lojista(props){
  const { cart } = useCommerce()
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState("CREDITCARD")
  const [notes, setNotes] = useState("")
  const [active, setActive] = useState('payment')
  const [paymentErrors, setPaymentErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payment = await cart.checkoutPaymentCreate({
      gateway: "lojista",
      method: method,
    })
    const errors = payment.data.checkoutPaymentCreate.paymentErrors

    if(errors.length === 0){
      const response = await cart.checkoutComplete()
      if(response.data.checkoutComplete.checkoutErrors.length > 0){
        setPaymentErrors(response.data.checkoutComplete.checkoutErrors)
        setActive('errors')
      }
    } else {
      setPaymentErrors(errors)
      setActive('errors')
    }

    setLoading(false)
  }

  if(active === 'payment'){
    return(
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
          <div>
            <Select
              label="Forma de pagamento"
              id="method"
              name="method"
              value={method}
              onChange={e => setMethod(e.target.value)}
              error={null}
              options={[{value: "CREDITCARD", name: "Cartão de crédito/débito"}, {value: "MONEY", name: "Dinheiro"}]}
            />
          </div>
          <div>
            <Field
              label="Anotações (opcional)"
              id="notes"
              name="notes"
              value={notes}
              error={null}
              onChange={e => setNotes(e.target.value)}
              placeholder="Ex.: Troco para R$ 50,00"
            />
          </div>
        </div>
        <Button type="submit" value={loading ? 'Carregando...' : 'Concluir pedido' } />
      </form>
    )
  }

  if(active === 'errors'){
    return(
      <div>
        <h3 className="text-2xl font-bold">Ooops!</h3>
        <h4 className="text-xl font-semibold mb-2">Alguma coisa deu errado com seu pagamento. =(</h4>
        {paymentErrors.map((error, key) => 
          <div key={key} className="bg-red-100 text-red-800 border border-red-200 rounded px-4 py-2 mt-2">
            {error.message}
          </div>
        )}
        <div className="mt-3">
          <Button onClick={() => setActive('payment')} value="Tentar novamente" />
        </div>
      </div>
    )
  }
}

export default Lojista