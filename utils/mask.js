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
