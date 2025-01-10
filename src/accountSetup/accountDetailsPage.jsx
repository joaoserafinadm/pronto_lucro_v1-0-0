import { faLock, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';
import { editCompanyView, userStatusName } from "../../utils/permission";
import ExitAccountModal from "./ExitAccountModal";



export default function AccountDetailsPage(props) {

    const token = jwt.decode(Cookie.get('auth'))



    return (
        <div className="fadeItem">
            <div className="row ">
                <div className="col-12 col-md-3 pt-3">
                    <span className="fs-4 text-bold text-c-secondary" >Sua Conta</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>
                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Informações Pessoais
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <div>

                                <small>{props.userData.firstName} {props.userData.lastName}</small><br />
                                <small>{props.userData.email}</small><br />
                                <small>{props.userData.celular}</small>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Link href={`/editProfile`}>
                                    <span type="button" className="text-c-secondary"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Senha
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>*********</small>
                            <Link href={`/passwordChange`}>
                                <span type="button" className="text-c-secondary"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-3 pt-3 pb-4">
                    <span className="fs-4 text-bold text-c-secondary" >Sua Empresa</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>

                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Nome
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>{props.companyData.companyName}</small>
                            <Link href={`/editProfile?section=Minha empresa`}>
                                <span type="button" className="text-c-secondary"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
                            </Link>


                        </div>
                    </div>
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Endereço
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <div>
                                {props.companyData.logradouro && props.companyData.numero && (
                                    <>
                                        <small>{props.companyData.logradouro}, {props.companyData.numero}</small><br />
                                    </>
                                )}
                                <small>{props.companyData.cidade} - {props.companyData.estado}, CEP {props.companyData.cep}</small><br />
                            </div>
                            <Link href={`/editProfile?section=Minha empresa`}>
                                <span type="button" className="text-c-secondary"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
                            </Link>



                        </div>
                    </div>

                    <div className="row  py-4">
                        <div className="col-12 col-md-3 text-bold">
                            CNPJ
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>{props.companyData.cnpjPrincipal}</small>
                            <Link href={`/editProfile?section=Minha empresa`}>
                                <span type="button" className="text-c-secondary"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
                            </Link>


                        </div>
                    </div>

                    <hr />
                    <div className="row mt-5">
                        <div className="col-12 d-flex justify-content-end">
                            <button data-bs-toggle="modal" data-bs-target="#exitAccountModal" className="btn btn-sm btn-outline-danger">Sair da conta</button>
                        </div>
                        <ExitAccountModal />
                    </div>
                </div>
            </div>
        </div>

    )
}