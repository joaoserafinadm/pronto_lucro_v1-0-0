import { useEffect, useState } from "react"
import { maskInputMoney, maskNumero } from "../../utils/mask"




export default function PaymentMethodConfig(props) {

    const { paymentMethod } = props

    const [creditConfig, setCreditConfig] = useState({
        parcelas: 1,
        taxa: 0
    })

    useEffect(() => {
        props.setCreditConfig(creditConfig)

    }, [creditConfig])


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
                    {/* {props.section === 'income' && (

                        <div className="input-group input-group-sm mt-3">

                            <span htmlFor="" className="input-group-text">Taxa</span>
                            <input type="number" className="form-control text-end" placeholder="0" inputMode="numeric"
                                value={creditConfig?.taxa} onChange={(e) => setCreditConfig({ ...creditConfig, taxa: e.target.value })} />
                            <span htmlFor="" className="input-group-text">%</span>
                        </div>
                    )} */}



                </div>
            )}


        </>

    )

}