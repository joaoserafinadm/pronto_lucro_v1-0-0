import { useEffect, useState } from "react"
import { maskInputMoney, maskMoneyNumber, maskNumberMoney, maskNumero } from "../../utils/mask"




export default function PaymentMethodConfig(props) {

    const { paymentMethod, value, section } = props

    const [creditConfig, setCreditConfig] = useState({
        parcelas: 1,
        taxa: 0
    })
    const [tax, setTax] = useState('')

    useEffect(() => {
        props.setCreditConfig(creditConfig)

    }, [creditConfig])

    const numberFormat = (number, divisor) => {

        const inputValue = maskMoneyNumber(number) * (1 + (+tax / 100))

        return maskNumberMoney(inputValue / +divisor)

    }


    return (
        <>
            {paymentMethod === 2 && (
                <div className="row mt-3 d-flex justify-content-between fadeItem">
                    <div className="col-12 col-md-6 my-2">

                        <div className="input-group input-group-sm">

                            <span htmlFor="" className="input-group-text">nº de parcelas</span>
                            <select name="" id="" className="form-select text-center" value={creditConfig?.parcelas} onChange={(e) => setCreditConfig({ ...creditConfig, parcelas: e.target.value })}>
                                <option value={1}>1 X {numberFormat(value, 1)}</option>
                                <option value={2}>2 X {numberFormat(value, 2)}</option>
                                <option value={3}>3 X {numberFormat(value, 3)}</option>
                                <option value={4}>4 X {numberFormat(value, 4)}</option>
                                <option value={5}>5 X {numberFormat(value, 5)}</option>
                                <option value={6}>6 X {numberFormat(value, 6)}</option>
                                <option value={7}>7 X {numberFormat(value, 7)}</option>
                                <option value={8}>8 X {numberFormat(value, 8)}</option>
                                <option value={9}>9 X {numberFormat(value, 9)}</option>
                                <option value={10}>10 X {numberFormat(value, 10)}</option>
                                <option value={11}>11 X {numberFormat(value, 11)}</option>
                                <option value={12}>12 X {numberFormat(value, 12)}</option>
                            </select>
                        </div>
                    </div>

                    {section === 'expense' && (
                        <div className="col-12 col-md-6 my-2">

                            <div className="input-group input-group-sm ">

                                <span htmlFor="" className="input-group-text">Juros</span>
                                <input
                                    type="text"
                                    className="form-control text-end"
                                    placeholder="0"
                                    onChange={(e) => setTax(e.target.value)}
                                    value={tax}
                                    inputMode="numeric"
                                />
                                <span htmlFor="" className="input-group-text">%</span>
                            </div>
                        </div>
                    )}
                    {section === 'income' && (
                        <div className="col-12 col-md-6 my-2">

                            <div className="input-group input-group-sm ">

                                <span htmlFor="" className="input-group-text">Taxa</span>
                                <input
                                    type="text"
                                    className="form-control text-end"
                                    placeholder="0"
                                    onChange={(e) => setTax(e.target.value)}
                                    value={tax}
                                    inputMode="numeric"
                                />
                                <span htmlFor="" className="input-group-text">%</span>
                            </div>
                        </div>

                    )}



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