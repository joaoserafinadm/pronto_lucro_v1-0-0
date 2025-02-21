export function maskCep(value) {
	if (value) return value
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1");
	else return ''
}

export function maskCpf(value) {
	if (value) return value?.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");

	else return ''
}

export function maskCnpj(value) {
	if (value) return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");

	else return ''
}

export function maskBloco(value) {
	if (value) return value.replace(/\D/g, "");
	else return ''
}

export function maskTelefone(value) {
	if (value) return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
		.replace(/(-\d{4})\d+?$/, "$1");
	else return ''
}

export function maskCelular(value) {
	if (value) return value?.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "($1) $2")
		.replace(/(\d{4})(\d)/, "$1-$2")
		.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
		.replace(/(-\d{4})\d+?$/, "$1");
	else return ''
}

export function maskNumero(value) {
	if (value) return value?.replace(/[^0-9.,]/g, '');
	else return ''
}

export function maskInputMoney(number) {

	number = number?.replace(/\D/g, ''); // Remove all non-digit characters
	number = number?.replace(/^0+/, '')
	if (number?.length === 1) {
		number = '0,0' + number;
	} else if (number?.length === 2) {
		number = '0,' + number;
	} else if (number?.length > 2) {
		number = number?.replace(/(\d)(\d{2})$/, "$1,$2"); // Formata os últimos dois dígitos como centavos
		number = number?.replace(/(?=(\d{3})+(\D))\B/g, "."); // Adiciona pontos como separador de milhares
	}
	return number;
}

export function maskMoneyNumber(value) {

	if (value) {


		value = value?.replace(/\D/g, ''); // Remove all non-digit characters

		value = (Number(value) / 100).toFixed(2)
		return +value
	} else {
		return 0;
	}

}


export function formatDate(dateObj) {
	const day = String(dateObj.day).padStart(2, '0');
	const month = String(dateObj.month+1).padStart(2, '0');
	const year = dateObj.year;
	return `${day}/${month}/${year}`;
}


export function maskNumberMoney(value) {

	if (value) {

		const brlNumber = {
			format: (value) => value.toLocaleString('pt-BR', { decimal: '.', style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
		}

		const number = brlNumber.format(value)


		return maskInputMoney(number.toString());
	} else {
		return '0,00';
	}

}


