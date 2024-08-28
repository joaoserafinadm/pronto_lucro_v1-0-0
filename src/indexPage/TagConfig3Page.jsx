import { faBank, faChevronLeft, faChevronRight, faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function TagConfig3Page(props) {


    const { setorSelected, incomeTags, expenseTags } = props

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Categorias sugeridas</span>
            </div>
            <hr />
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <div className="col-12 col-sm-6 my-1 px-3">
                    <div className={`card   shadow border-selected`} >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center align-items-center">
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: "40px" }}>
                                        <img src={setorSelected === "Indústria" ? "INDUSTRIA_ICON.png" : setorSelected === "Comércio" ? "COMERCIO_ICON.png" : setorSelected === "Serviços" ? "SERVICOS_ICON.png" : "OUTROS_ICON.png"} alt="Outro" className="w-100" />
                                    </div>
                                    <span className="bold ms-3 fs-5 text-c-secondary">{setorSelected}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Com base no setor escolhido, sugerimos categorias de <b className="text-c-success">receitas</b> e <b className="text-c-danger">despesas</b> para facilitar o <b>controle financeiro</b>.</span>
            </div>
            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Você pode configurar todas as categorias acessando a página <b className="fw-bold"><FontAwesomeIcon icon={faTag} className="small" /> Categorias</b>.</span>
            </div>
            <div className="col-12 mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            <span className="bold fs-5 my-1">
                                Categorias de <b className="text-c-success">receitas</b>:
                            </span>
                        </div>
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            {incomeTags?.map((elem, index) => (
                                <div key={index} className="row my-2">
                                    <div className="col-12 d-flex my-1 align-items-center">
                                        <div style={{ backgroundColor: elem.color, height: "15px", width: "15px" }} className="rounded-circle me-2"></div>
                                        <span className="bold">{elem.category}</span>
                                    </div>
                                    {elem.tags?.map((elem1, index) => (
                                        <div className="col-12 d-flex my-1 align-items-center">
                                            <div style={{ height: "10px", width: "10px", border: `2px solid ${elem.color}` }} className="rounded-circle ms-2 me-2"></div>
                                            <span>{elem1.tag}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            <span className="bold fs-5 my-1">
                                Categorias de <b className="text-c-danger">despesas</b>:
                            </span>
                        </div>
                        <div className="col-12 fadeItem1s d-flex flex-column">
                            {expenseTags?.map((elem, index) => (
                                <div key={index} className="row my-2">
                                    <div className="col-12 d-flex my-1 align-items-center">
                                        <div style={{ backgroundColor: elem.color, height: "15px", width: "15px" }} className="rounded-circle me-2"></div>
                                        <span className="bold">{elem.category}</span>
                                    </div>
                                    {elem.tags?.map((elem1, index) => (
                                        <div className="col-12 d-flex my-1 align-items-center">
                                            <div style={{ height: "10px", width: "10px", border: `2px solid ${elem.color}` }} className="rounded-circle ms-2 me-2"></div>
                                            <span className="">{elem1.tag}</span>
                                        </div>
                                    ))}
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>


            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={7}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={9}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>
        </div>
    )
}