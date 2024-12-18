import { faBank, faChevronLeft, faChevronRight, faTag, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'



export default function TagConfig4Page(props) {

    const token = jwt.decode(Cookie.get('auth'))


    const handleTutorialExit = async () => {

        await axios.post(`/api/indexPage/tutorialExit`, { user_id: token.sub })


    }


    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center text-center my-3 fadeItem">
                <span className=" fs-4">🎉 Tudo Pronto! 🎉</span>
            </div>
            <hr />


            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1"><b>Parabéns!</b> A configuração inicial está completa.</span>
            </div>
            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Agora você está pronto para começar a usar a plataforma <b>Pronto Lucro</b> e simplificar a gestão financeira da sua empresa.</span>
            </div>
            <div className="col-12 fadeItem1s d-flex flex-column">
                <span className=" fs-5 my-1">Se precisar de ajuda, estamos sempre por aqui. <b>Vamos lá</b>?</span>
            </div>



            <hr />
            <div className="col-12 my-3 d-flex justify-content-between fadeItem2s">
                <span className="cardAnimation  " type="button" data-bs-target="#tutorialPages" data-bs-slide-to={8}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-1" /> Voltar
                </span>
                <span className="cardAnimation pulse fw-bold fs-5" type="button" data-bs-dismiss="modal" onClick={() => handleTutorialExit()}>
                    Iniciar!
                </span>
            </div>
        </div>
    )
}