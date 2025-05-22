import { faMoneyBill, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { maskInteiro, maskMoneyNumber, maskNumberMoney, maskNumero } from "../../utils/mask";




export default function Periodicity(props) {

    const { value,
        type,
        periodicity,
        setPeriodicity,
        periodicityConfig,
        setPeriodicityConfig } = props


    useEffect(() => {
        setPeriodicityConfig(null)
    }, [periodicity])

    const handleRepetido = (periodicityValue) => {

        const data = {
            qtd: 1,
            periodicity: periodicityValue,
            nextTransaction: handleNextTransaction(periodicityValue),
        }

        console.log('data', data)
        setPeriodicityConfig(data)
    }

    const handleNextTransaction = (periodicityValue) => {
        const localdate = new Date();

        // Obter o offset de Brasília em relação ao UTC
        const brasiliaOffset = -3; // Brasília é UTC-3 (ou UTC-2 no horário de verão)
        const utcTime = localdate.getTime() + (localdate.getTimezoneOffset() * 60000);
        const date = new Date(utcTime + (brasiliaOffset * 3600000));
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        let nextDate = new Date(date);
        console.log('date', date, day, month, year, nextDate)

        switch (periodicityValue) {
            case 'Diariamente':
                nextDate.setDate(day + 1);
                console.log('nextDate', nextDate)
                break;

            case 'Semanalmente':
                nextDate.setDate(day + 7);
                break;

            case 'Mensalmente':
                // Avança para o próximo mês
                nextDate.setMonth(month + 1);

                // Verifica quantos dias tem o próximo mês
                const daysInNextMonth = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();

                // Se o dia atual for maior que os dias do próximo mês, 
                // define para o último dia do próximo mês
                if (day > daysInNextMonth) {
                    nextDate.setDate(daysInNextMonth);
                } else {
                    nextDate.setDate(day);
                }
                break;

            case 'Anualmente':
                nextDate.setFullYear(year + 1);

                // Tratamento especial para ano bissexto (29 de fevereiro)
                if (month === 1 && day === 29) { // Fevereiro, dia 29
                    const nextYear = year + 1;
                    const isNextYearLeap = (nextYear % 4 === 0 && nextYear % 100 !== 0) || (nextYear % 400 === 0);

                    if (!isNextYearLeap) {
                        // Se o próximo ano não for bissexto, define para 28 de fevereiro
                        nextDate.setDate(28);
                    }
                }
                break;

            default:
                // Se não for nenhuma das opções, retorna a data atual
                return {
                    day: date.getDate(),
                    month: date.getMonth() + 1, // +1 porque getMonth() retorna 0-11
                    year: date.getFullYear()
                };
        }

        // Retorna a data no formato {day: number, month: number, year: number}
        return {
            day: nextDate.getDate(),
            month: nextDate.getMonth() + 1, // +1 porque getMonth() retorna 0-11
            year: nextDate.getFullYear()
        };
    };


    return (

        <div className="row d-flex justify-content-between">
            <div className="col-12">

                <FontAwesomeIcon icon={faTable} />
                <span className="small fw-bold mb-2 ms-3">Tipo de lançamento</span>
            </div>
            <div className="col-12 d-flex flex-wrap">
                <span type="button" onClick={() => setPeriodicity('Único')}
                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${periodicity === 'Único' ? type === "income" ? 'ctm-bg-success' : 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                    Único
                </span>
                <span type="button" onClick={() => setPeriodicity('Repetido')}
                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${periodicity === "Repetido" ? type === "income" ? 'ctm-bg-success' : 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                    Repetido
                </span>
                <span type="button" onClick={() => setPeriodicity('Parcelado')}
                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${periodicity === "Parcelado" ? type === "income" ? 'ctm-bg-success' : 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                    Parcelado
                </span>
            </div>
            {periodicity === 'Repetido' && (
                <div className="fadeItem">
                    <div className="col-12 ">
                        <span className="small fw-bold mb-2">Repetir a {type === "income" ? "receita" : "despesa"}:</span>
                    </div>
                    <div className="col-12 ">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-8">
                                <select className="form-select" aria-label="selectPeriodicity" onChange={e => handleRepetido(e.target.value)} value={periodicityConfig?.periodicity}>
                                    <option selected disabled value={''}>Escolha</option>
                                    <option value={'Diariamente'}>Diariamente</option>
                                    <option value={'Semanalmente'}>Semanalmente</option>
                                    <option value={'Mensalmente'}>Mensalmente</option>
                                    <option value={'Anualmente'}>Anualmente</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <span className="small mb-2 text-danger">&#x2022; Você pode pausar a repetição da {type === "income" ? "receita" : "despesa"} na página de <b className="fw-bold"><FontAwesomeIcon icon={faMoneyBill} className="small" /> Transações</b>.</span>
                    </div>
                    <div className="col-12">
                        <span className="small mb-2 text-danger">&#x2022; As {type === "income" ? "receitas" : "despesas"} repetidas serão contabilizadas nas transações conforme a periodicidade escolhida.</span>
                    </div>
                    {periodicityConfig?.periodicity && (

                        <div className="col-12 d-flex  align-items-center fadeItem">
                            <span className="small fw-bold">
                                Próxima transação:
                            </span>
                            <div className="ms-2">

                                <span className={`badge ${type === "income" ? 'ctm-bg-success' : 'ctm-bg-danger'}`} >
                                    {periodicityConfig?.nextTransaction?.day?.toString().padStart(2, '0')}/{periodicityConfig?.nextTransaction?.month?.toString().padStart(2, '0')}/{periodicityConfig?.nextTransaction?.year}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {periodicity === 'Parcelado' && (
                <div className="fadeItem">

                    <div className="col-12 ">
                        <span className="small fw-bold mb-2">Parcelamento em:</span>
                    </div>
                    <div className="col-12 ">
                        <div className="row">
                            <div className="col-lg-2 col-md-3 col-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={e =>
                                        setPeriodicityConfig({
                                            ...periodicityConfig,
                                            qtd: maskInteiro(e.target.value) || '',
                                        })
                                    }
                                    placeholder="Vezes"
                                    value={periodicityConfig?.qtd}
                                />
                            </div>
                            <div className="col-lg-4 col-md-6 col-8">
                                <select className="form-select" aria-label="selectPeriodicity" onChange={e => setPeriodicityConfig({ ...periodicityConfig, periodicity: e.target.value })} value={periodicityConfig?.periodicity}>
                                    <option selected disabled>Escolha</option>
                                    <option value={'Dias'}>Dias</option>
                                    <option value={'Semanas'}>Semanas</option>
                                    <option value={'Meses'}>Meses</option>
                                    <option value={'Anos'}>Anos</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <span className="small fw-bold mb-2">Valor da parcela: R$ {maskNumberMoney(maskMoneyNumber(value) / (+periodicityConfig?.qtd || 1))}</span>

                    </div>
                </div>
            )}

        </div>
    )
}