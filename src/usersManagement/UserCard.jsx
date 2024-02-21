import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VerticalLine from "../../utils/VerticalLine";
import { faBuilding, faCheck, faEnvelope, faEye, faHouse, faMailBulk, faMapLocation, faStore, faTrashAlt, faUserGear, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import isMobile from "../../utils/isMobile";
import tippy from "tippy.js";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";




export default function UsersCard(props) {

    useEffect(() => {
        tippy('#viewClientButton', {
            content: "Visualizar",
            placement: 'bottom'
        });
        tippy('#deleteClientButton', {
            content: "Deletar",
            placement: 'bottom'
        });
    }, [props.idSelected])

    const user = props.elem



    return (
        <div className="card my-2 cardAnimation fadeItem" type="button" onClick={() => props.setIdSelected(props.elem._id)} style={{ overflowX: 'hidden' }}>
            <div className="card-body ">
                <div className="row d-flex">

                    <div className="col-12  d-flex">

                        <div className="d-flex justify-content-center align-items-center">

                            <img src={user.profileImageUrl} alt="" height={80} className="rounded-circle " />
                        </div>
                        <div className="ms-3 col  ">
                            <div className="row">
                                <div className="col-12 d-flex align-items-center">

                                    <FontAwesomeIcon
                                        icon={user.userStatus === 'admGlobal' ? faUserGear : user.userStatus === 'user' ? faUserTie : ''}
                                        className="icon text-secondary me-2" />
                                    <span className="bold">

                                        {user.firstName} {user.lastName}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <span className="small">
                                    {user.userStatus === 'admGlobal' ? 'Administrador ' : user.userStatus === 'user' ? 'Corretor' : ''}
                                </span>
                            </div>
                            <div className="row mt-2">
                                <span className="small d-flex align-items-center">
                                    {user.email}
                                    {/* <FontAwesomeIcon icon={faEnvelope} className=" icon-small text-secondary me-2" /> {user.email} */}
                                </span>
                            </div>
                            <div className="row">
                                <span className="small d-flex align-items-center">
                                    {user.celular ? user.celular : '-'}
                                    {/* <FontAwesomeIcon icon={faWhatsapp} className=" icon-small text-secondary me-2" /> {user.celular ? user.celular : '-'} */}
                                </span>
                            </div>

                        </div>

                    </div>
                    <div className="col-12">

                        <hr />
                    </div>
                    <div className="col-12  d-flex justify-content-evenly align-items-center text-secondary">
                        <div>
                            <div className="  text-center">
                                <b>12</b>
                            </div>
                            <div className=" small bold text-center">
                                Avaliações
                            </div>
                        </div>
                        <div>
                            <div className="  text-center">
                                <b>7</b>
                            </div>
                            <div className=" small bold text-center">
                                Vendas
                            </div>
                        </div>


                    </div>
                </div>


                {props.idSelected === props.elem._id && (
                    <div className="slideLeft d-flex ms-2 bg-light h-100 align-items-center shadow">
                        <VerticalLine />
                        <div className="d-flex justify-content-center align-items-center " style={{ width: '150px', height: '60px' }} >
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button 
                                type="button"
                                    class="btn btn-light border"
                                    id="viewClientButton">
                                    <FontAwesomeIcon icon={faEye} className="icon  text-secondary" />
                                </button>

                                <button
                                    type="button"
                                    class="btn btn-light border"
                                    id="deleteClientButton">
                                    <FontAwesomeIcon icon={faWhatsapp} className="icon text-secondary" />
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-light border"
                                    id="deleteClientButton">
                                    <FontAwesomeIcon icon={faTrashAlt} className="icon text-secondary" />
                                </button>
                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}