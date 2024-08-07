import { faAngleLeft, faComment, faCommentAlt, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CardTemplate from "./CardTemplate"




export default function BankSetup(props) {

    const { bankSelected, setValue, value, description, setDescription, valueSum, setValueSum } = props


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
            <div className="col-12 mb-3 px-5">
                <div className="row d-flex justify-content-center">

                    <CardTemplate bankSelected={bankSelected} />
                </div>
            </div>
            <div className="col-12">

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
                    onChange={e => setDescription(e.target.value)} />
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