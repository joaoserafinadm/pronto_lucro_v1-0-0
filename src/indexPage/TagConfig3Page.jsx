import { faBank, faChevronLeft, faChevronRight, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function TagConfig3Page(props) {


    const { setorSelected } = props

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Categorias sugeridas</span>
            </div>
            <hr />
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Com base no setor escolhido, sugerimos categorias de <b>receitas</b> e <b>despesas</b> para facilitar o <b>controle financeiro</b>.</span>
            </div>
            <div className="col-12 my-1 px-3">
                <span type='button' className={`card cardAnimation `}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <span className="bold">{setorSelected?.setor}</span>
                            </div>
                            <div className="col-12">
                                {setorSelected?.exemplos.map(exemplo => (
                                    <>
                                        <span className="small">&#x2022; {exemplo}</span><br />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </span>
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