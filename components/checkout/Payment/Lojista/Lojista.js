import { useState } from 'react'
import { Field, Button, Select } from '../../../ui'
import { VscLoading } from 'react-icons/vsc'
import { useRouter } from 'next/router'
import { useCart } from '../../../../framework/cart'

export function Lojista(props){
  const router = useRouter()
  const cart = useCart()
  const [method, setMethod] = useState("CREDITCARD")
  const [notes, setNotes] = useState("")
  const [active, setActive] = useState('payment')
  const [paymentErrors, setPaymentErrors] = useState([])

  const handleErrors = (errors) => {
    setPaymentErrors(errors || [])
    setActive('errors')
    props.setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    props.setLoading(true)

    cart.checkoutPaymentCreate({
      gateway: "lojista",
      method: method,
    })
      .then((response) => {
        if(response.data.checkoutPaymentCreate.paymentErrors.length === 0){
          cart.checkoutComplete()
            .then((response) => {
              if(response.data.checkoutComplete.checkoutErrors.length === 0){
                router.push('/pedido-finalizado')
              } else {
                handleErrors(response.data.checkoutComplete.checkoutErrors)
              }
            })
            .catch(() => {
              handleErrors(null)
            })
        } else {
          handleErrors(response.data.checkoutPaymentCreate.paymentErrors)
        }
      })
      .catch(() => {
        handleErrors(null)
      })
  }

  if(props.loading){
    return(
      <div className="rounded p-4 text-center">
        <VscLoading className="mx-auto text-4xl animate-spin text-green-500" />
        <div className="mt-2 text-xl">
          Estamos processando seu pagamento.<br/>
          Aguarde alguns segundos...  
        </div>
      </div>
    )
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
        <Button type="submit" value="Concluir pedido" />
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