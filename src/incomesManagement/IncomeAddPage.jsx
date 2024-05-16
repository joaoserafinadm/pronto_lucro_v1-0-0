import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../components/icons";
import { faCalendar, faClipboard, faImage } from "@fortawesome/free-regular-svg-icons";
import { faMicrophone, faMoneyBill, faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { maskInputMoney } from "../../utils/mask";



export default function IncomeAddPage() {

    const [value, setValue] = useState('')



    return (
        <div>
           


            <div className="row px-3 my-2">
                <div className="col-12 ">
                    <span className="small">Valor da receita</span>
                </div>
                <div className="col-12 d-flex justify-content-between">
                    <div className="d-flex fs-1 pe-2 align-items-center">
                        <span className="me-1">R$</span>
                        <input type="text" inputMode="numeric" placeholder="0,00"
                            className="form-control fs-2"
                            value={value}
                            onChange={e => setValue(maskInputMoney(e.target.value))} />
                    </div>
                    <div className="d-flex fs-3 align-items-center">
                        <div class="dropdown">
                            <span class=" dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                BRL
                            </span>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><span className="ms-2 small text-secondary">Favoritas</span></li>
                                <li><a class="dropdown-item" href="#">BRL</a></li>
                                <li><a class="dropdown-item" href="#">USD</a></li>
                                <li><a class="dropdown-item" href="#">EUR</a></li>
                                <hr />
                                <li><a class="dropdown-item" href="#">Outras...</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-12">

                    <div className="card shadow">
                        <div className="card-body">

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faMoneyBill} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-success">
                                        À Vista
                                    </span>
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary">
                                        À Prazo
                                    </span>
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary">
                                        Outros...
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>

                            <hr />
                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faCalendar} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-success">
                                        Hoje
                                    </span>
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary">
                                        Ontem
                                    </span>
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-primary">
                                        Outros...
                                    </span>
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>



                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faMicrophone} />
                                </div>
                                <div className="col d-flex">
                                    <input type="text" class="form-control" placeholder="Descrição" />
                                </div>
                                <div className="text-center" style={{ width: "40px" }}>

                                </div>
                            </div>

                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faTag} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1 text-white small mx-1 rounded-pill ctm-bg-warning">
                                        Vendas online
                                    </span>
                                </div>
                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                    <Icons icon='a-r' />
                                </div>
                            </div>

                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faWallet} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1  small mx-1 rounded-pill ">
                                        <img src="/logo-sicredi.png" className="rounded-circle me-1" height={15} alt="" /> Sicredi
                                    </span>
                                </div>
                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                    <Icons icon='a-r' />
                                </div>
                            </div>

                            <hr />

                            <div className="row d-flex justify-content-between">
                                <div className="text-center d-flex align-items-center" style={{ width: "40px" }}>
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                                <div className="col d-flex">
                                    <span class=" px-2 py-1  small mx-1 rounded-pill ">
                                        Anexo
                                    </span>
                                </div>
                                <div className="text-center text-secondary" style={{ width: "40px" }}>
                                    <Icons icon='a-r' />
                                </div>
                            </div>

                            <hr />

                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3 d-flex justify-content-between">

                <div className="col-12 d-flex justify-content-center">
                    <span className="span bold text-secondary">Mais detalhes</span>
                </div>

            </div>
        </div>
    )
}