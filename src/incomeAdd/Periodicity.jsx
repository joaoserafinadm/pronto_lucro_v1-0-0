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

    useEffect(() => {
        console.log("periodicityConfig", periodicityConfig)

    }, [periodicityConfig])




    return (

        <div className="row d-flex justify-content-between">
            <div className="col-12">

                <FontAwesomeIcon icon={faTable} />
                <span className="small fw-bold mb-2 ms-3">Tipo de lançamento</span>
            </div>
            <div className="col-12 d-flex flex-wrap">
                <span type="button" onClick={() => setPeriodicity('Único')}
                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${periodicity === 'Único' ? type === "income" ? 'ctm-bg-success': 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                    Único
                </span>
                <span type="button" onClick={() => setPeriodicity('Repetido')} 
                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${periodicity === "Repetido" ? type === "income" ? 'ctm-bg-success': 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
                    Repetido
                </span>
                <span type="button" onClick={() => setPeriodicity('Parcelado')}
                    class={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${periodicity === "Parcelado" ? type === "income" ? 'ctm-bg-success': 'ctm-bg-danger' : 'ctm-bg-primary'}`}>
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
                                <select className="form-select" aria-label="selectPeriodicity" onChange={e => setPeriodicityConfig({ ...periodicityConfig, periodicity: e.target.value, parcelaAtual: 1 })} value={periodicityConfig?.periodicity}>
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