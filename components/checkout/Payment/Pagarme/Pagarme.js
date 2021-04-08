import { useState } from 'react'
import { Field } from '../../../ui'
import { validateCard, validateDocument, generateToken, getDocumentType } from './utils'
import { useCommerce } from '../../../../framework'
import { useRouter } from 'next/router'

export function Pagarme(props){
  const { cart } = useCommerce()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [card, setCard] = useState({
    card_holder_name: '',
    card_number: '',
    card_expiration_date: '',
    card_cvv: ''
  })

  const [document, setDocument] = useState("")

  const [errors, setErrors] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const card_errors = await validateCard(card)
    const document_errors = await validateDocument(document)

    if(card_errors.length === 0 && document_errors.length === 0){
      const token = await generateToken(card)
      const response = await cart.checkoutPaymentCreate({
        gateway: "pagarme",
        method: "CREDITCARD",
        token: token
      })
      const errors = response.data.checkoutPaymentCreate.paymentErrors
      if(errors.length === 0){
        const extra_data = {
          document: document,
          type: getDocumentType(document)
        }
        localStorage.setItem("extra_data", JSON.stringify(extra_data))
        router.push('/checkout/revisao')
      } else {
        console.log('deu ruim')
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

  return(
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-4 gap-4 mb-4 border-b pb-4">
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
      </div>
      <button type="submit" className="bg-green-500 hover:bg-green-600 appearance-none focus:outline-none text-white font-semibold px-6 py-2 rounded">
        {loading ? 'Carregando...' : 'Finalizar' }
      </button>
    </form>
  )
}

export default Pagarme