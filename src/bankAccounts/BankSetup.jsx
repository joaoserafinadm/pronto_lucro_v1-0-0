import { faAngleLeft, faComment, faCommentAlt, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardTemplate from "./CardTemplate"
import BankColorSelect from "./BankColorSelect"
import { maskInputMoney } from "../../utils/mask"




export default function BankSetup(props) {

    const { bankSelected, setValue, value, description, setDescription, valueSum, setValueSum, color, setColor } = props


    return (
        <div className="row">
            <div className="col-12">
                <span className="text-secondary" type="button"
                    data-bs-target="#bankSetupCarousel" data-bs-slide="prev" >
                    <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Voltar
                </span>
            </div>
            {/* <div className="col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="d-flex justify-content-center align-items-center" style={{ width: "60px" }}>
                                <img className="bankImage" src={bankSelected?.logoUrl} alt="" />
                            </div>
                            <div className="col d-flex  align-items-center">
                                <span className="bold">{bankSelected?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
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
        </div>
    )


}