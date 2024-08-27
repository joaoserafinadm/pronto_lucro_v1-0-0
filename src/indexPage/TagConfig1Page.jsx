import { faBank, faChevronLeft, faChevronRight, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




export default function TagConfig1Page(props) {




    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">Escolha o Perfil da Sua Empresa</span>
            </div>
            <hr />
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Agora, vamos <b>personalizar</b> sua experiência no <b>Pronto Lucro</b>.</span>
                <span className=" fs-5 my-1">Selecione o perfil que melhor descreve <b>sua empresa</b>.</span>
                <span className=" fs-5 my-1">Com base na sua escolha, sugeriremos categorias de <b>receitas</b> e <b>despesas</b> para facilitar o <b>controle financeiro</b>.</span>
            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={3}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={7}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>
        </div>
    )
}