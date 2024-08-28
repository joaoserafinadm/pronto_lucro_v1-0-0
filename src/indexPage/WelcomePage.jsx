import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'



export default function WelcomePage(props) {

    const token = jwt.decode(Cookie.get('auth'))




    return (
        <div className="row d-flex mx-sm-3">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">🎉 Bem-vindo {token.firstName}! 🎉</span>
            </div>
            <hr />
            <div className="col-12 my-3 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Estamos empolgados por ter você conosco. </span>
                <span className=" fs-5 my-1"> A <b>Pronto Lucro</b> é a ferramenta ideal para ajudar a sua empresa a <b>lucrar</b> de forma <b>organizada</b> e <b>eficiente</b>.</span>
                <span className=" fs-5 my-1">Vamos começar configurando sua conta para que você possa tirar o máximo proveito da nossa plataforma. Clique em "Próximo" para continuar.</span>
            </div>
            <hr />
            <div className="col-12 my-3 d-flex justify-content-center fadeItem2s">
                <span className="cardAnimation pulse " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={1}>
                    Próximo <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                </span>
            </div>
        </div>
    )
}