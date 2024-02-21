import { faLock, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken';
import { editCompanyView, userStatusName } from "../../utils/permission";



export default function AccountDetailsPage(props) {

    const token = jwt.decode(Cookie.get('auth'))



    return (
        <div className="fadeItem">
            <div className="row ">
                <div className="col-12 col-md-3 pt-3">
                    <span className="fs-4 text-bold text-success" >Sua Conta</span> <br />
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
                                <Link href={`/editProfile/${token.sub}`}>
                                    <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
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
                                <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} className="editIcon"/></span>
                            </Link>

                        </div>
                    </div>
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Status
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>{userStatusName(props.userData.userStatus)}</small>
                            <span className="text-success"><FontAwesomeIcon icon={faLock} /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 col-md-3 pt-3 pb-4">
                    <span className="fs-4 text-bold text-success" >Sua Instituição</span> <br />
                    {/* <button className="btn btn-sm btn-success">Editar <FontAwesomeIcon icon={faPencilAlt} /></button> */}
                </div>

                <div className="col-12 col-md-9">
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Nome
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>{props.companyData.companyName}</small>
                            {editCompanyView(props.userData.userStatus, props.companyData.userConfig) ?
                                <Link href={`/companyEdit`}>
                                    <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil}  className="editIcon"/></span>
                                </Link>
                                :
                                <span className="text-success"><FontAwesomeIcon icon={faLock} /></span>
                            }

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
                            {editCompanyView(props.userData.userStatus, props.companyData.userConfig) ?
                                <Link href={`/companyEdit`}>
                                    <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} className="editIcon"/></span>
                                </Link>
                                :
                                <span className="text-success"><FontAwesomeIcon icon={faLock} /></span>
                            }


                        </div>
                    </div>
                    {/* <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Estrutura da plataforma
                        </div>
                        <div className="col-12 col-md-9 mt-2  d-flex justify-content-between">
                            <small>{props.companyData.userConfig === 'basico' ? 'Categoria 1' : props.companyData.userConfig === 'avancado' ? 'Categoria 2' : ''}</small>
                            {editCompanyView(props.userData.userStatus, props.companyData.userConfig) ?
                                <Link href={`/companyStructure`}>
                                    <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} /></span>
                                </Link>
                                :
                                <span className="text-success"><FontAwesomeIcon icon={faLock} /></span>
                            }
                        </div>
                    </div> */}
                    <div className="row border-bottom py-4">
                        <div className="col-12 col-md-3 text-bold">
                            Responsável pelo Inventário
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>{props.companyData.responsavel}</small>
                            {editCompanyView(props.userData.userStatus, props.companyData.userConfig) ?
                                <Link href={`/companyEdit`}>
                                    <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil}  className="editIcon"/></span>
                                </Link>
                                :
                                <span className="text-success"><FontAwesomeIcon icon={faLock} /></span>
                            }

                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-12 col-md-3 text-bold">
                            E-mail para Contato
                        </div>
                        <div className="col-12 col-md-9 mt-2 d-flex justify-content-between">
                            <small>{props.companyData.email}</small>
                            {editCompanyView(props.userData.userStatus, props.companyData.userConfig) ?
                                <Link href={`/companyEdit`}>
                                    <span type="button" className="text-success"><FontAwesomeIcon icon={faPencil} className="editIcon" /></span>
                                </Link>
                                :
                                <span className="text-success"><FontAwesomeIcon icon={faLock} /></span>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}