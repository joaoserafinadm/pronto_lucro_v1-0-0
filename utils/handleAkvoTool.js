export default function handleAkvoTool(akvoTool) {
	switch (akvoTool) {
		case "geeCalculator":
			return "Calculadora GEE";

		case "geeAgro":
			return "GEE Agro";

		case "esgIndicators":
			return "Indicadores ESG";

		case "pcaf":
			return "Emissões Financiadas";

		default:
			return "";
	}
}
