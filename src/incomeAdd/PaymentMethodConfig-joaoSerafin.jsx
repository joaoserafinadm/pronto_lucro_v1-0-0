import { useEffect, useState } from "react"
import { maskInputMoney, maskMoneyNumber, maskNumberMoney, maskNumero } from "../../utils/mask"
import CategorySelectedComponent from "./categorySelectedComponent"
import TagSelected from "../transactions/tagSelected"




export default function PaymentMethodConfig(props) {

    const { paymentMethod, value, section, creditNetworkTaxes, categories } = props

    const [creditConfig, setCreditConfig] = useState({
        parcelas: 1
    })

    const [network, setNetwork] = useState(null)
    const [tax, setTax] = useState('')
    const [automaticTax, setAutomaticTax] = useState(true)
    const [debitOnPaymentDay, setDebitOnPaymentDay] = useState(true)

    useEffect(() => {
        if (section === "income") setDebitOnPaymentDay(false)
        else setDebitOnPaymentDay(true)
    }, [section])

    useEffect(() => {

        let data

        if (section === 'income') {
            data = {
                ...creditConfig,
                network: network?._id,
                taxMonth: taxValue(value, creditConfig.parcelas, network?.tax)?.value || 0,
                taxTotal: taxValue(value, creditConfig.parcelas, network?.tax)?.totalValue || 0,
                subCategory_id: "84",
                automaticTax,
                debitOnPaymentDay
            }

            console.log("data1", data)
            props.setCreditConfig(data)
        }

        if (section === 'expense') {

            data = {
                ...creditConfig,
                network: network?._id,
                taxMonth: taxValue(value, creditConfig.parcelas, tax)?.value || 0,
                taxTotal: taxValue(value, creditConfig.parcelas, tax)?.totalValue || 0,
                subCategory_id: "84",
                automaticTax,
                debitOnPaymentDay
            }

            console.log("data1", data)
            props.setCreditConfig(data)

        }



    }, [creditConfig, network, automaticTax, debitOnPaymentDay, tax])

    const numberFormat = (number, divisor) => {

        const inputValue = maskMoneyNumber(number)

        return maskNumberMoney(inputValue / +divisor)

    }
    const taxValue = (number, divisor, tax) => {

        const inputValue = maskMoneyNumber(number) * (((+tax || 0) / 100))

        const data = {
            totalValue: maskNumberMoney(inputValue),
            value: maskNumberMoney(inputValue / +divisor)
        }

        return data

    }

    const handleNetworkSelect = (id) => {

        const network = creditNetworkTaxes?.find(elem => elem?._id?.toString() === id?.toString())

        setNetwork(network)
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

                    {section === 'income' && (
                        <>
                            <div className="col-12 col-md-6 my-2">


                                <div class="form-check form-switch mt-0">
                                    <input class="form-check-input form-check-input-income" type="checkbox" role="switch" id="automaticTaxSelect" checked={automaticTax} onChange={(e) => setAutomaticTax(e.target.checked)} aria-checked="true" />
                                    <label class="form-check-label " for="automaticTaxSelect" checked={automaticTax} onChange={(e) => setAutomaticTax(e.target.checked)} aria-checked="true">Incluir taxa</label>
                                </div>
                            </div>
                            {automaticTax && (
                                <div className="col-12   my-2 small  card fadeItem">
                                    <div className="card-body d-flex flex-column p-1">
                                        <span className="fw-bold mb-2">Cálculo da taxa</span>
                                        <div className="input-group input-group-sm mb-2">

                                            <span htmlFor="" className="input-group-text">Bandeira</span>
                                            <select className="form-select" value={network?.id} onChange={(e) => handleNetworkSelect(e.target.value)} aria-label="Default select example">
                                                <option value="" disabled selected>Selecione</option>
                                                {creditNetworkTaxes?.map((elem, index) => {
                                                    console.log("elem", elem)
                                                    return (
                                                        <option value={elem._id} key={index}>
                                                            {elem.descricao}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        <span htmlFor="" className="d-flex align-items-center">• Taxa:
                                            {network?.descricao === "Outra Bandeira" ?
                                                <div className="ms-2 col-2">

                                                    <div className="input-group input-group-sm">
                                                        <input type="text" className="form-control form-control-sm text-end" placeholder="0" value={network?.tax || 0} onChange={(e) => setNetwork({ ...network, tax: e.target.value })} />
                                                        <span className="input-group-text">
                                                            %
                                                        </span>
                                                    </div>
                                                </div>
                                                :
                                                <span className="text-c-danger bold ms-2">{network?.tax || 0}%</span>
                                            }
                                        </span>
                                        <span htmlFor="" className="">• Valor da taxa (total): <span className="text-c-danger bold">-R$ {taxValue(value, creditConfig.parcelas, network?.tax)?.totalValue || 0}</span></span>
                                        <span htmlFor="" className="">• Valor da taxa (mensal): <span className="text-c-danger bold">-R$ {taxValue(value, creditConfig.parcelas, network?.tax)?.value || 0}</span></span>
                                        <span htmlFor="" className="">• Categoria vinculada: </span>
                                        <TagSelected subCategory_id={"84"} categories={categories} />



                                    </div>


                                </div>
                            )}


                        </>
                    )}
                    {section === 'expense' && (
                        <>
                            <div className="col-12 col-md-6 my-2">

                                <div className="input-group input-group-sm ">

                                    <span htmlFor="" className="input-group-text">Juro</span>
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
                            <div className="col-12 d-flex flex-column mb-3">
                                <span htmlFor="" className="">• Valor da taxa (total): <span className="text-c-danger bold">-R$ {taxValue(value, creditConfig.parcelas, tax)?.totalValue || 0}</span></span>
                                <span htmlFor="" className="">• Valor da taxa (mensal): <span className="text-c-danger bold">-R$ {taxValue(value, creditConfig.parcelas, tax)?.value || 0}</span></span>
                                <span htmlFor="" className="">• Categoria vinculada: </span>
                                <TagSelected subCategory_id={"86"} categories={categories} />
                            </div>
                            <hr />
                            <div className="col-12">
                                <div class="form-check">
                                    <input class="form-check-input form-check-input-expense" type="radio" name="debitDay" id="debitDay1" checked={debitOnPaymentDay} onChange={(e) => setDebitOnPaymentDay(e.target.checked)} />
                                    <label class={`form-check-label small ${debitOnPaymentDay ? 'fw-bold' : ''}`} for="debitDay1">
                                        Debitar valor no dia de pagamento do cartão de crédito
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input form-check-input-expense" type="radio" name="debitDay" id="debitDay2" checked={!debitOnPaymentDay} onChange={(e) => setDebitOnPaymentDay(!e.target.checked)} />
                                    <label class={`form-check-label small ${!debitOnPaymentDay ? 'fw-bold' : ''}`} for="debitDay2">
                                        Debitar valor no dia atual
                                    </label>
                                </div>
                            </div>

                        </>
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