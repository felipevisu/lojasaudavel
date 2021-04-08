import pagarme from 'pagarme'
import { validateCNPJ, validateCPF } from '../../../utils'

export async function validatePagarme(data){

	const cardData = {
		card_number: data.cardNumber.replace(/-/g, ''),
		card_holder_name: data.name,
		card_expiration_date: data.expirationDate.replace('/', ''),
		card_cvv: data.ccvv,
	}

	var document = data.document

	var cardValidations = pagarme.validate({ card: cardData })
	cardValidations.card.document = validateCPF(document) || validateCNPJ(document) 

	return cardValidations.card
}