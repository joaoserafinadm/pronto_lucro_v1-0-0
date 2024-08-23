import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function BankAccountsTutorialPage(props) {





    return (
        <div className="row d-flex mx-sm-3">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Cadastre suas Contas</span>
            </div>
            <hr />
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Para começarmos, precisamos que você cadastre suas <b >contas bancárias</b>. </span>
                <span className=" fs-5 my-1"> Isso permitirá monitorar e organizar suas transações financeiras.</span>
                <span className=" fs-5 my-1">Não se preocupe, seus dados são <b>100% seguros</b> conosco.</span>
            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={0}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={2}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>
        </div>
    )
}