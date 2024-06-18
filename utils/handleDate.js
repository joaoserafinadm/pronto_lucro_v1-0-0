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

export function reverseDateObject(dateObj) {
    // Garantir que o parâmetro é um objeto e contém as propriedades day, month e year
    if (typeof dateObj !== 'object' || !dateObj.day || !dateObj.month || !dateObj.year) {
        throw new Error("O parâmetro deve ser um objeto contendo as propriedades day, month e year");
    }

    const { day, month, year } = dateObj;

    // Criar uma instância de Date com os valores fornecidos
    // Note que os meses em JavaScript são baseados em zero, então subtraímos 1 do mês
    const date = new Date(year, month - 1, day);

    return date;
}