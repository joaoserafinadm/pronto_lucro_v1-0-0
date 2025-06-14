import { faAngleLeft, faArrowsUpToLine, faBank, faCalendarCheck, faCalendarDay, faComment, faCommentAlt, faMoneyBill, faSwatchbook, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardTemplate from "./CardTemplate"
import BankColorSelect from "./BankColorSelect"
import { maskInputMoney } from "../../utils/mask"
import scrollTo from "../../utils/scrollTo"
import { useEffect, useState } from "react"
import { SpinnerSM } from "../components/loading/Spinners"




export default function BankSetup(props) {

    const {
        newBank,
        edit,
        creditCardList,
        setBankSelected,
        bankSelected,
        setInitialValue,
        initialValue,
        description,
        setDescription,
        valueSum,
        setValueSum,
        color,
        setColor,
        creditCard,
        setCreditCard,
        setCreditLimit,
        creditLimit,
        setCreditNetwork,
        creditNetwork,
        diaLancamento,
        setDiaLancamento,
        diaFechamento,
        setDiaFechamento,
    } = props

    useEffect(() => {
        resetCreditValues()
    }, [bankSelected])

    const resetCreditValues = () => {
        setCreditCard(false)
        setCreditLimit('')
        setCreditNetwork('')
        setDiaLancamento(1)
        setDiaFechamento(5)
    }

    // Função para calcular o melhor dia de compra
    const calcularMelhorDiaCompra = () => {
        const pagamento = parseInt(diaFechamento);
        const lancamento = parseInt(diaLancamento);
        
        // Se o lançamento é depois do pagamento no mesmo mês
        if (lancamento > pagamento) {
            // O melhor dia é logo após o lançamento do mês anterior
            return lancamento + 1 <= 31 ? lancamento + 1 : 1;
        } else {
            // Se o lançamento é antes ou igual ao pagamento
            // O melhor dia é logo após o lançamento do mesmo mês
            return lancamento + 1 <= 31 ? lancamento + 1 : 1;
        }
    };

    // Função para calcular quantos dias sem juros
    const calcularDiasSemJuros = () => {
        const pagamento = parseInt(diaFechamento);
        const lancamento = parseInt(diaLancamento);
        const melhorDia = calcularMelhorDiaCompra();
        
        let dias = 0;
        
        if (lancamento > pagamento) {
            // Compra após lançamento, paga no próximo mês
            dias = (31 - melhorDia) + pagamento + 30; // aproximadamente
        } else {
            // Compra após lançamento, paga no mesmo mês
            dias = pagamento - melhorDia;
            if (dias < 0) dias += 30; // Se negativo, adiciona um mês
        }
        
        return dias;
    };


    const handleCreditNetwork = (id) => {
        console.log(id, creditCardList)
        const network = creditCardList.find(elem => elem.id.toString() === id.toString())

        setCreditNetwork(network)
    }

    const handleCreditCardCheck = () => {
        setCreditCard(!creditCard)
        setCreditLimit('')
        setCreditNetwork('')
        setDiaLancamento(1)
        setDiaFechamento(5)
        if (!creditCard) scrollTo('creditLimitInput');
    }




    return (
        <div className="row">
            {props.tutorial ?
                <div className="col-12">
                    <span className="text-secondary" type="button"
                        data-bs-target="#tutorialPages" data-bs-slide-to={4} >
                        <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Voltar
                    </span>
                </div>
                :
                <>
                    {edit ?
                        <div className="col-12">
                            <span className="text-secondary" type="button"
                                data-bs-target={"#editAccountCarousel"} data-bs-slide="prev" >
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Insituições financeiras
                            </span>
                        </div>
                        :
                        <div className="col-12">
                            <span className="text-secondary" type="button"
                                data-bs-target={"#bankSetupCarousel"} data-bs-slide="prev" >
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Voltar
                            </span>
                        </div>

                    }
                </>

            }

            <div className="col-12 mb-3  mt-2">
                <div className="row d-flex justify-content-center">

                    <CardTemplate
                        bankSelected={bankSelected}
                        color={color}
                        value={initialValue}
                        description={description}
                        creditNetwork={creditNetwork} />
                </div>
            </div>
            <div className="col-12 px-3">
                <BankColorSelect color={color} setColor={value => setColor(value)} />
            </div>
            <hr />

            {newBank && (
                <div className="col-12 mt-2 mb-4">
                    <FontAwesomeIcon icon={faBank} />
                    <span className="small fw-bold  ms-3">Nome da instituição financeira</span>
                    <input type="text" id="descriptionInput" className="form-control mt-2" value={bankSelected?.name}
                        onChange={e => e.target.value.length <= 25 && setBankSelected({ ...bankSelected, name: e.target.value })} />
                    <span className="small text-muted">Caracteres restantes: {25 - description.length}</span>
                </div>
            )}

            <div className="col-12 mt-2 mb-4">

                <FontAwesomeIcon icon={faMoneyBill} />
                <span className="small fw-bold  ms-3">Valor disponível na conta</span>

                <div className="d-flex align-items-center fs-5 mt-2">
                    <span className="me-1">R$</span>
                    <input type="text" inputMode="numeric" placeholder="0,00"
                        className="form-control  " style={{ borderColor: '#00cc99' }}
                        value={initialValue} id='valueInput'
                        onChange={e => setInitialValue(maskInputMoney(e.target.value))} />
                </div>

            </div>
            <hr />

            <div className="col-12 mt-2 mb-4">
                <FontAwesomeIcon icon={faCommentAlt} />
                <span className="small fw-bold  ms-3">Descrição</span>
                <input type="text" id="descriptionInput" className="form-control mt-2" value={description}
                    onChange={e => e.target.value.length <= 25 && setDescription(e.target.value)} />
                <span className="small text-muted">Caracteres restantes: {25 - description.length}</span>
            </div>
            <hr />


            <div className="col-12 mt-2 mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox"
                        role="switch" id="valueSumCheck" checked={valueSum}
                        onClick={e => setValueSum(!valueSum)} />
                    <label class="form-check-label" for="valueSumCheck">Incluir valor na soma da tela inicial</label>
                </div>
            </div>

            <hr />
            <div className="col-12 mt-2 mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" disabled={!bankSelected?.institutionType?.includes('credit_card')}
                        role="switch" id="creditCardCheck" checked={creditCard}
                        onClick={e => { handleCreditCardCheck() }} />
                    <label class="form-check-label" for="creditCardCheck">Incluir cartão de crédito</label>
                </div>
            </div>

            {creditCard && (
                <>
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faArrowsUpToLine} />
                        <span className="small fw-bold  ms-3">Limite</span>

                        <div className="d-flex align-items-center fs-5 mt-2">
                            <span className="me-1">R$</span>
                            <input type="text" inputMode="numeric" placeholder="0,00"
                                className="form-control  "
                                value={creditLimit} id='creditLimitInput'
                                onChange={e => setCreditLimit(maskInputMoney(e.target.value))} />
                        </div>

                    </div>

                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faSwatchbook} />
                        <span className="small fw-bold  ms-3">Bandeira</span>

                        <select class="form-select mt-2" aria-label="Default select example" value={creditNetwork?.id} onChange={e => handleCreditNetwork(e.target.value)}>
                            <option value={''} disabled selected>Escolha...</option>
                            {creditCardList.map(elem => (
                                <option value={elem.id}>{elem.descricao}</option>
                            ))}

                        </select>

                    </div>
                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faCalendarDay} />
                        <span className="small fw-bold  ms-3">Dia de pagamento</span>

                        <select class="form-select mt-2" aria-label="Default select example" value={diaFechamento} onChange={e => setDiaFechamento(e.target.value)}>
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
                            <option value={13}>13</option>
                            <option value={14}>14</option>
                            <option value={15}>15</option>
                            <option value={16}>16</option>
                            <option value={17}>17</option>
                            <option value={18}>18</option>
                            <option value={19}>19</option>
                            <option value={20}>20</option>
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={31}>31</option>
                        </select>

                    </div>
                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faCalendarCheck} />
                        <span className="small fw-bold  ms-3">Dia de lançamento</span>

                        <div className="d-flex align-items-center fs-5 mt-2">
                            <select class="form-select mt-2" aria-label="Default select example" value={diaLancamento} onChange={e => setDiaLancamento(e.target.value)}>
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
                                <option value={13}>13</option>
                                <option value={14}>14</option>
                                <option value={15}>15</option>
                                <option value={16}>16</option>
                                <option value={17}>17</option>
                                <option value={18}>18</option>
                                <option value={19}>19</option>
                                <option value={20}>20</option>
                                <option value={21}>21</option>
                                <option value={22}>22</option>
                                <option value={23}>23</option>
                                <option value={24}>24</option>
                                <option value={25}>25</option>
                                <option value={26}>26</option>
                                <option value={27}>27</option>
                                <option value={28}>28</option>
                                <option value={29}>29</option>
                                <option value={30}>30</option>
                                <option value={31}>31</option>
                            </select>
                        </div>

                    </div>

                    {/* Nova seção: Melhor dia de compra */}
                    <hr />
                    <div className="col-12 mt-2 mb-4">
                        <div className="alert alert-info">
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            <span className="fw-bold">Melhor dia para compras</span>
                            <div className="mt-2">
                                <p className="mb-1">
                                    <strong>Dia {calcularMelhorDiaCompra()}</strong> de cada mês
                                </p>
                                <p className="small mb-0 text-muted">
                                    Comprando neste dia, você terá aproximadamente <strong>{calcularDiasSemJuros()} dias</strong> sem juros até o pagamento da fatura.
                                </p>
                            </div>
                        </div>
                        
                        <div className="small text-muted mt-2">
                            <p className="mb-1">
                                <FontAwesomeIcon icon={faCalendarCheck} className="me-1" />
                                <strong>Como funciona:</strong>
                            </p>
                            <ul className="small">
                                <li>Compras realizadas após o dia {diaLancamento} entram na fatura do próximo mês</li>
                                <li>A fatura fecha no dia {diaFechamento} de cada mês</li>
                                <li>Comprando no dia {calcularMelhorDiaCompra()}, você maximiza o prazo sem juros</li>
                            </ul>
                        </div>
                    </div>

                </>

            )
            }


        </div >
    )


}