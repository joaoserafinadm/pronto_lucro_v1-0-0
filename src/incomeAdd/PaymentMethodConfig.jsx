import { useState } from "react"
import { maskInputMoney } from "../../utils/mask"




export default function PaymentMethodConfig(props) {

    const { paymentMethod } = props

    const [creditConfig, setCreditConfig] = useState({
        parcelas: 1,
        valorAntecipado: 0,
        taxaValorAntecipado: 0
    })


    return (
        <>
            {paymentMethod === 2 && (
                <div className="row mt-3 d-flex justify-content-between fadeItem">
                    <div className="input-group input-group-sm">

                        <span htmlFor="" className="input-group-text">nº de parcelas</span>
                        <select name="" id="" className="form-select text-center" value={creditConfig?.parcelas} onChange={(e) => setCreditConfig({ ...creditConfig, parcelas: e.target.value })}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                            <option value={12}>12</option>
                        </select>
                    </div>
                    {/* <div className="input-group input-group-sm mt-3">

                        <span htmlFor="" className="input-group-text">Valor antecipado</span>
                        <span htmlFor="" className="input-group-text">R$</span>
                        <input type="text" className="form-control text-end" placeholder="0,00" inputMode="numeric"
                            value={creditConfig?.valorAntecipado} onChange={(e) => setCreditConfig({ ...creditConfig, valorAntecipado: maskInputMoney(e.target.value) })} />
                    </div>
                    {!!creditConfig?.valorAntecipado && (

                        <div className="input-group input-group-sm mt-3 fadeItem">

                            <span htmlFor="" className="input-group-text">Taxa</span>
                            <span htmlFor="" className="input-group-text">R$</span>

                            <input type="text" className="form-control text-end" placeholder="0,00" inputMode="numeric"
                                value={creditConfig?.taxaValorAntecipado} onChange={(e) => setCreditConfig({ ...creditConfig, taxaValorAntecipado: maskInputMoney(e.target.value) })} />
                        </div>
                    )} */}


                </div>
            )}
            

        </>

    )

}