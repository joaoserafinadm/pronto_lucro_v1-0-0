import { faAngleLeft, faArrowsUpToLine, faCalendarCheck, faCalendarDay, faComment, faCommentAlt, faMoneyBill, faSwatchbook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardTemplate from "./CardTemplate"
import BankColorSelect from "./BankColorSelect"
import { maskInputMoney } from "../../utils/mask"




export default function BankSetup(props) {

    const {
        bankSelected,
        setValue,
        value,
        description,
        setDescription,
        valueSum,
        setValueSum,
        color,
        setColor,
        creditCard,
        setCreditCard,
        diaLancamento,
        setDiaLancamento,
        diaFechamento,
        setDiaFechamento,
    } = props


    return (
        <div className="row">
            <div className="col-12">
                <span className="text-secondary" type="button"
                    data-bs-target="#bankSetupCarousel" data-bs-slide="prev" >
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Voltar
                </span>
            </div>

            <div className="col-12 mb-3  mt-2">
                <div className="row d-flex justify-content-center">

                    <CardTemplate
                        bankSelected={bankSelected}
                        color={color}
                        value={value}
                        description={description} />
                </div>
            </div>
            <div className="col-12 px-3">
                <BankColorSelect color={color} setColor={value => setColor(value)} />
            </div>
            <hr />

            <div className="col-12 mt-2 mb-4">

                <FontAwesomeIcon icon={faMoneyBill} />
                <span className="small fw-bold  ms-3">Valor disponível na conta</span>

                <div className="d-flex align-items-center fs-5 mt-2">
                    <span className="me-1">R$</span>
                    <input type="text" inputMode="numeric" placeholder="0,00"
                        className="form-control  " style={{ borderColor: '#00cc99' }}
                        value={value} id='valueInput'
                        onChange={e => setValue(maskInputMoney(e.target.value))} />
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
                    <label class="form-check-label" for="valueSumCheck">Incluir valor no saldo total</label>
                </div>
            </div>

            <hr />
            <div className="col-12 mt-2 mb-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" disabled={!bankSelected?.institutionType?.includes('credit_card')}
                        role="switch" id="creditCardCheck" checked={creditCard}
                        onClick={e => setCreditCard(!creditCard)} />
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
                                value={value} id='valueInput'
                                onChange={e => setValue(maskInputMoney(e.target.value))} />
                        </div>

                    </div>

                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faSwatchbook} />
                        <span className="small fw-bold  ms-3">Bandeira</span>

                        <div className="d-flex align-items-center fs-5 mt-2">
                            <span className="me-1">R$</span>
                            <input type="text" inputMode="numeric" placeholder="0,00"
                                className="form-control  "
                                value={value} id='valueInput'
                                onChange={e => setValue(maskInputMoney(e.target.value))} />
                        </div>

                    </div>
                    <hr />
                    <div className="col-12 mt-2 mb-4">

                        <FontAwesomeIcon icon={faCalendarDay} />
                        <span className="small fw-bold  ms-3">Dia de fechamento</span>

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

                </>

            )
            }

        </div >
    )


}