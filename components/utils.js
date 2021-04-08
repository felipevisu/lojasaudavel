export function formatMoney(number, decPlaces=2, decSep=',', thouSep='.') {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  var j = (j = i.length) > 3 ? j % 3 : 0;
  
  return 'R$ ' + sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

export function validateCPF(cpf) {
  var add, i, rev
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
  add = 0;
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

export function validateCNPJ(cnpj) {
 
	cnpj = cnpj.replace(/[^\d]+/g,'');

	if(cnpj == '') return false;
	 
	if (cnpj.length != 14)
			return false;

	// Elimina CNPJs invalidos conhecidos
	if (cnpj == "00000000000000" || 
			cnpj == "11111111111111" || 
			cnpj == "22222222222222" || 
			cnpj == "33333333333333" || 
			cnpj == "44444444444444" || 
			cnpj == "55555555555555" || 
			cnpj == "66666666666666" || 
			cnpj == "77777777777777" || 
			cnpj == "88888888888888" || 
			cnpj == "99999999999999")
			return false;
			 
	// Valida DVs
	var tamanho = cnpj.length - 2
	var numeros = cnpj.substring(0,tamanho);
	var digitos = cnpj.substring(tamanho);
	var soma = 0;
	var pos = tamanho - 7;
	var i

	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
					pos = 9;
	}

	var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(0))
			return false;
			 
	tamanho = tamanho + 1;
	numeros = cnpj.substring(0,tamanho);
	soma = 0;
	pos = tamanho - 7;

	for (i = tamanho; i >= 1; i--) {
		soma += numeros.charAt(tamanho - i) * pos--;
		if (pos < 2)
					pos = 9;
	}
	
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado != digitos.charAt(1))
				return false;
				 
	return true;
	
}

export function validatePhone(phone) {
  var expression = '^\\(?[1-9]{2}\\)? ?(?:[2-8]|9[1-9])[0-9]{3}\\-?[0-9]{4}$'
	const validPhoneRegex = new RegExp(expression)
	return validPhoneRegex.test(phone)
}