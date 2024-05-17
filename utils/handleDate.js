export function dateObject(date, countDays = 0) {
    // Garantir que o parâmetro é uma instância de Date
    if (!(date instanceof Date)) {
        throw new Error("O parâmetro deve ser uma instância de Date");
    }

    // Extrair o dia, mês e ano
    const day = date.getDate() + countDays;
    const month = date.getMonth() + 1; // Os meses em JavaScript são baseados em zero
    const year = date.getFullYear();

    // Criar o objeto date
    const dateObject = {
        day: day,
        month: month,
        year: year
    };


    return dateObject;
}