import { faBank, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function AccountsConfigTutorial(props) {



    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Suas Contas</span>
            </div>
            <hr />
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Sua primeira conta é a sua <b>"Carteira"</b>. </span>
                <span className=" fs-5 my-1"> Agora, você pode adicionar outras contas vinculadas a instituições financeiras para um controle ainda mais completo.</span>
                <span className=" fs-5 my-1">Caso não queira adicionar agora, não tem problema! A página de <b className="fw-bold"><FontAwesomeIcon icon={faBank} className="small"/> Contas</b> pode ser acessada no menu lateral.</span>
            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={1}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={3}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>
        </div>
    )
}