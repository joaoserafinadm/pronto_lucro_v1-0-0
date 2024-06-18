export function dateVerify(date) {

    let error = false

    // Verificar se o objeto date existe
    if (!date) {
        error = true;
    }

    // Verificar se o objeto date contém as propriedades day, month, e year
    if (!('day' in date) || !('month' in date) || !('year' in date)) {
        error = true;
    }

    // Extrair as propriedades do objeto date
    const { day, month, year } = date;

    // Verificar se as propriedades são números
    if (typeof day !== 'number' || typeof month !== 'number' || typeof year !== 'number') {
        error = true;
    }

    // Criar um objeto Date em JavaScript (os meses em JavaScript são baseados em zero, então subtrair 1 do mês)
    const jsDate = new Date(year, month - 1, day);

    // Verificar se a data é válida
    if (isNaN(jsDate.getTime())) {
        error = true;
    }

    // Obter o dia da semana (0 para domingo, 6 para sábado)
    const dayOfWeek = jsDate?.getDay();

    // Verificar se o dia da semana é sábado (6) ou domingo (0)
    if (dayOfWeek === 0 || dayOfWeek === 6) error = true

    if (error === true) {
        const newData = {
            ...date,
            day: date.day + 1,
        }

        const isValid = dateVerify(newData)


        if (isValid) return newData
    } else {
        return date
    }



}