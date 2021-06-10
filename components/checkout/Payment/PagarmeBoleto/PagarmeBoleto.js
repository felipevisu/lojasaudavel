import { useState } from 'react'
import { Field, Button } from '../../../ui'
import { validateDocument, getDocumentType } from '../Pagarme/utils'
import { useCommerce } from '../../../../framework'
import { VscLoading } from 'react-icons/vsc'
import { useRouter } from 'next/router'

export function PagarmeBoleto(props){
  const router = useRouter()

  const { cart } = useCommerce()
  const [active, setActive] = useState('payment')
  const [paymentErrors, setPaymentErrors] = useState([])

  const [document, setDocument] = useState("")

  const [errors, setErrors] = useState({
    document: '',
  })

  const handleDocument = (e) => {
    setDocument(e.target.value)
    setErrors({
      ...errors,
      [e.target.name]: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const document_errors = await validateDocument(document)

    if(document_errors.length === 0){
      props.setTopLoading(true)
      cart.checkoutPaymentCreate({
        gateway: "pagarme-boleto",
        method: "BILLET"
      })
        .then((response) => { 
          if(response.data.checkoutPaymentCreate.paymentErrors.length === 0){
            const extra_data = {
              document: document,
              type: getDocumentType(document)
            }
            cart.checkoutComplete(JSON.stringify(extra_data))
              .then((response) => {
                if(response.data.checkoutComplete.checkoutErrors.length > 0){
                  setPaymentErrors(response.data.checkoutComplete.checkoutErrors)
                  setActive('errors')
                  props.setTopLoading(false)
                } else {
                  router.push('/pedido-finalizado')
                }
              })
              .catch(() => {
                setActive('errors')
                props.setTopLoading(false)
              }) 
          } else {
            setPaymentErrors(response.data.checkoutPaymentCreate.paymentErrors)
            setActive('errors')
            props.setTopLoading(false)
          }
        })
        .catch((error) => {
          setActive('errors')
          props.setTopLoading(false)
        })
    
    } else {
      var new_errors = {}
      document_errors.forEach(error => new_errors[error.field] = error.value)
      setErrors({
        ...errors,
        ...new_errors
      })
      props.setTopLoading(false)
    }
  }

  if(props.topLoading){
    return(
      <div className="p-4 text-center">
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
        </div>
        <Button type="submit" onClick={() => setActive('payment')} value="Concluir pedido" />
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
        <div className="mt-3 md:flex md:flex-wrap">
          <div>
            <Button onClick={() => setActive('payment')} value="Tentar novamente" />  
          </div>
        </div>
      </div>
    )
  }
}

export default PagarmeBoleto