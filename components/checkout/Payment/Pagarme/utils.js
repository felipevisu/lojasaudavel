import pagarme from 'pagarme'
import { validateCNPJ, validateCPF } from '../../../utils'

function generateCardData(card){
	const cardData = {
		card_number: card.card_number.replace(/-/g, ''),
		card_holder_name: card.card_holder_name,
		card_expiration_date: card.card_expiration_date.replace('/', ''),
		card_cvv: card.card_cvv,
	}
	return cardData
}

export async function validateCard(card){
	const cardData = generateCardData(card)
	var cardValidations = pagarme.validate({ card: cardData })
	var errors = []
	
	if(!cardValidations.card.card_holder_name){
		errors.push({field: "card_holder_name", value: "Nome inválido"})
	}
	if(!cardValidations.card.card_number){
		errors.push({field: "card_number", value: "Número de cartão inválido"})
	}
	if(!cardValidations.card.card_expiration_date){
		errors.push({field: "card_expiration_date", value: "Data de expiração inválida"})
	}
	if(!cardValidations.card.card_cvv){
		errors.push({field: "card_cvv", value: "Código inválido"})
	}
	
	return errors
}

export async function validateDocument(document){
	if(validateCPF(document) || validateCNPJ(document)){
		return []
	} else {
		return [{field: "document", value: "Documento inválido"}]
	}
}

export function getDocumentType(document){
	if(validateCPF(document)){
		return "cpf"
	} else if(validateCNPJ(document)){
		return "cnpj"
	}
}

export async function generateToken(card, encryption_key){
	const cardData = generateCardData(card)

	return pagarme.client.connect({ encryption_key: encryption_key})
		.then(client => client.security.encrypt(cardData))
		.then(card_hash => card_hash)
}