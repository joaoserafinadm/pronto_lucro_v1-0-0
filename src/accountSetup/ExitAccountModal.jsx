import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useState } from "react"
import { SpinnerSM } from "../components/loading/Spinners"



export default function ExitAccountModal(props) {

    const router = useRouter()

    const [loadingExit, setLoadingExit] = useState(false)


    const hendleSession = async () => {

        setLoadingExit(true)

        Cookies.remove('auth')
        localStorage.removeItem('auth')
        await router.replace('/')
        router.reload()
    }


    return (
        <div class="modal fade" id="exitAccountModal" tabindex="-1" aria-labelledby="exitAccountModalLabel" aria-hidden="true">
            <div class={`modal-dialog modal-dialog-centered modal-dialog-scrollable `}>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title-dark" id="exitAccountModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Tem certeza que deseja sair da conta?
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Fechar</button>
                        {loadingExit ?
                            <button className="btn btn-danger btn-sm" disabled><SpinnerSM /></button>
                            :
                            <button className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={hendleSession}>Sair</button>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}