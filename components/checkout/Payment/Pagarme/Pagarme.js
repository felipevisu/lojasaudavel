import { useEffect, useState } from 'react'
import { Field, Button } from '../../../ui'
import { validateCard, validateDocument, generateToken, getDocumentType } from './utils'
import { useCommerce } from '../../../../framework'
import { useRouter } from 'next/router'
import { formatMoney } from '../../../utils'

export function Pagarme(props){
  const { cart } = useCommerce()
  const router = useRouter()
  const [finalized, setFinalized] = useState(false)
  const [loading, setLoading] = useState(false)

  const [active, setActive] = useState('payment')
  const [paymentErrors, setPaymentErrors] = useState([])

  const [card, setCard] = useState({
    card_holder_name: '',
    card_number: '',
    card_expiration_date: '',
    card_cvv: ''
  })

  const [document, setDocument] = useState("")
  const [installments, setInstallments] = useState(1)

  const [errors, setErrors] = useState({
    installments: '',
    document: '',
    card_holder_name: '',
    card_number: '',
    card_expiration_date: '',
    card_cvv: '',
    installments: ''
  })

  const handleChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  const handleDocument = (e) => {
    setDocument(e.target.value)
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  const handleInstallments = (e) => {
    setInstallments(parseInt(e.target.value))
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  useEffect(() =>{
    return () => {
      if(finalized){
        cart.clearCart()
      }
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const card_errors = await validateCard(card)
    const document_errors = await validateDocument(document)

    if(card_errors.length === 0 && document_errors.length === 0){
      const token = await generateToken(card)
      const payment = await cart.checkoutPaymentCreate({
        gateway: "pagarme",
        method: "CREDITCARD",
        token: token,
        installments: installments
      })
      const errors = payment.data.checkoutPaymentCreate.paymentErrors
      if(errors.length === 0){
        const extra_data = {
          document: document,
          type: getDocumentType(document)
        }
        const {loading: load, data, errors: errs} = await cart.checkoutComplete(JSON.stringify(extra_data))
        const order = data.checkoutComplete.order
        if(order){
          setFinalized(true)
          router.push('/checkout/finalizado')
        } else {
          setPaymentErrors(data.checkoutComplete.checkoutErrors)
          setActive('errors')
        }
      } else {
        setPaymentErrors(errors)
        setActive('errors')
      }
    } else {
      var new_errors = {}
      card_errors.forEach(error => new_errors[error.field] = error.value)
      document_errors.forEach(error => new_errors[error.field] = error.value)
      setErrors({
        ...errors,
        ...new_errors
      })
    }

    setLoading(false)
  }

  if(active === 'payment'){
    return(
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-b pb-4">
          <div className="col-span-2">
            <Field
              label="Documento (CPF ou CNPJ)"
              id="document"
              name="document"
              value={document}
              error={errors.document}
              onChange={handleDocument}
              placeholder="123.456.789-10"
            />
          </div>
          <div className="col-span-2">
            <Field
              label="Nome (como aparece no cartão)"
              id="card_holder_name"
              name="card_holder_name"
              value={card.card_holder_name}
              error={errors.card_holder_name}
              onChange={handleChange}
              placeholder="José da Silva"
            />
          </div>
          <div className="col-span-2">
            <Field
              label="Número do cartão"
              id="card_number"
              name="card_number"
              value={card.card_number}
              error={errors.card_number}
              onChange={handleChange}
              placeholder="4111-1111-1111-1111"
            />
          </div>
          <div className="col-span-1">
            <Field
              label="Validade"
              id="card_expiration_date"
              name="card_expiration_date"
              value={card.card_expiration_date}
              error={errors.card_expiration_date}
              onChange={handleChange}
              placeholder="05/24"
            />
          </div>
          <div className="col-span-1">
            <Field
              label="Código"
              id="card_cvv"
              name="card_cvv"
              value={card.card_cvv}
              error={errors.card_cvv}
              onChange={handleChange}
              placeholder="123"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-500 text-sm font-semibold mb-1" htmlFor="installments">
              Parcelas
            </label>
            <select 
                id="installments" 
                name="installments" 
                value={installments} 
                onChange={handleInstallments}
                className="appearance-none w-full rounded border-gray-300 focus:ring-0 focus:border-green-500"
              >
              <option value="1">1 x de {formatMoney(cart.cart.totalPrice.gross.amount)}</option>
              <option value="2">2 x de {formatMoney(cart.cart.totalPrice.gross.amount/2)}</option>
              <option value="3">3 x de {formatMoney(cart.cart.totalPrice.gross.amount/3)}</option>
              <option value="4">4 x de {formatMoney(cart.cart.totalPrice.gross.amount/4)}</option>
              <option value="5">5 x de {formatMoney(cart.cart.totalPrice.gross.amount/5)}</option>
              <option value="6">6 x de {formatMoney(cart.cart.totalPrice.gross.amount/6)}</option>
            </select>
          </div>
        </div>
        <Button type="submit" onClick={() => setActive('payment')} value={loading ? 'Carregando...' : 'Concluir pedido'} />
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
          <h5 className="font-semibold">Dicas</h5>
          <p className="text-sm">
            - Verifique se seu banco utiliza cartões virtuais para compras online;<br/>
            - Realizar várias tentativas seguidas pode barrar seu pagamento no sistema antifraude;<br/>
            - Você também pode pagar em dinheiro ou na maquininha de cartão no ato da entrega/retirada.
          </p>
        </div>
        <div className="mt-3">
          <Button onClick={() => setActive('payment')} value="Tentar novamente" />
          <span className="pl-2">
            <Button outline onClick={() => {props.changeMethod('lojista'), setActive('payment')}} value="Pagar na entrega/retirada" />
          </span>
        </div>
      </div>
    )
  }
}

export default Pagarme