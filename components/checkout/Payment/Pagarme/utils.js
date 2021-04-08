import pagarme from 'pagarme'
import { validateCNPJ, validateCPF } from '../../../utils'

export async function validatePagarme(data){

	const cardData = {
		card_number: data.card_number.replace(/-/g, ''),
		card_holder_name: data.card_holder_name,
		card_expiration_date: data.card_expiration_date.replace('/', ''),
		card_cvv: data.card_cvv,
	}

	var document = data.document

	var cardValidations = pagarme.validate({ card: cardData })
	cardValidations.card.document = validateCPF(document) || validateCNPJ(document) 
	
	return cardValidations.card
}