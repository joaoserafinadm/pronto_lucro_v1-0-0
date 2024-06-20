export function maskCep(value) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1");
}

export function maskCpf(value) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
}

export function maskCnpj(value) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
}

export function maskBloco(value) {
	return value.replace(/\D/g, "");
}

export function maskTelefone(value) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
		.replace(/(-\d{4})\d+?$/, "$1");
}

export function maskCelular(value) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
		.replace(/(-\d{4})\d+?$/, "$1");
}

export function maskNumero(value) {
	return value.replace(/\D/g, "");
}

export function maskInputMoney(number) {

	number = number.replace(/\D/g, ''); // Remove all non-digit characters
	number = number.replace(/^0+/, '')
	if (number.length === 1) {
		number = '0,0' + number;
	} else if (number.length === 2) {
		number = '0,' + number;
	} else if (number.length > 2) {
		number = number.replace(/(\d)(\d{2})$/, "$1,$2"); // Formata os últimos dois dígitos como centavos
		number = number.replace(/(?=(\d{3})+(\D))\B/g, "."); // Adiciona pontos como separador de milhares
	}
	return number;
}

export function maskMoneyNumber(value) {


	value = value?.replace(/\D/g, ''); // Remove all non-digit characters

	value = (Number(value) / 100).toFixed(2)
	return value

}



