
import Title from '../src/components/title/Title2'
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import navbarHide from '../utils/navbarHide.js'
import { useDispatch } from 'react-redux'
import SaldoView from '../src/indexPage/saldoView.jsx'
import GeralView from '../src/indexPage/geralView.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import VerticalLine from '../utils/VerticalLine.jsx'
import isMobile from '../utils/isMobile.js'
import EntriesHistoric from '../src/indexPage/entriesHistoric.jsx'
import InputButton from '../src/components/inputButton/InputButton.jsx'
import EntriesHistoricModal from '../src/indexPage/entriesHistoricModal.jsx'
import axios from 'axios'
import { showModalBs } from '../utils/modalControl.js'
import TutorialModal from '../src/indexPage/TutorialModal.jsx'



export default function Home() {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()

    const [valueView, setValueView] = useState(true)
    const [bankAccounts, setBankAccounts] = useState([])


    useEffect(() => {
        dataFunction(token.sub)
        navbarHide(dispatch)
    }, [])

    const dataFunction = async (user_id) => {

        await axios.get(`/api/indexPage`, {
            params: { user_id }
        }).then(res => {
            if (res.data.initialTutorial) showModalBs('tutorialModal')
            setBankAccounts(res.data.bankAccounts)

        }).catch(e => {
            console.log(e)
        })
    }

    return (

        <div className='fadeItem1s'>

            <TutorialModal bankAccounts={bankAccounts} dataFunction={() => dataFunction(token.sub)} />

            <EntriesHistoricModal />
            {/* <Title title={`Olá, ${token.firstName}!`} subtitle={'Qual a sua meta de lucro para hoje?'} /> */}

            <div className="pagesContent-lg">
                {/* <div className="row d-flex" >
                    <div className="col">
                        <SaldoView valueView={valueView} setValueView={(value) => setValueView(value)} />


                        <GeralView valueView={valueView} />
                        {isMobile() && (

                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <span className='badge rounded-pill bg-secondary cardAnimation '
                                        type="button" data-bs-toggle="modal"
                                        data-bs-target="#entriesHistoricModal">
                                        <FontAwesomeIcon icon={faList} />
                                    </span>
                                </div>
                            </div>
                        )}


                    </div>
                    {!isMobile() && (
                        <div className="col-4" >
                            <EntriesHistoric />
                        </div>
                    )}

                </div> */}



                <hr />

            </div>



            {/* <InputButton /> */}



        </div >
    )
}
