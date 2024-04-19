
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



export default function Home() {

    const token = jwt.decode(Cookie.get('auth'))

    const dispatch = useDispatch()

    const [valueView, setValueView] = useState(true)


    useEffect(() => {
        navbarHide(dispatch)

    }, [])

    return (

        <div className='fadeItem1s'>
            {/* <Title title={`Olá, ${token.firstName}!`} subtitle={'Qual a sua meta de lucro para hoje?'} /> */}

            <div className="pagesContent-lg">
                <div className="row d-flex" >
                    <div className="col">
                        <SaldoView valueView={valueView} setValueView={(value) => setValueView(value)} />


                        <GeralView valueView={valueView} />
                        {isMobile() && (

                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <span className='badge rounded-pill bg-secondary cardAnimation ' type="button">
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

                </div>



                <hr />

            </div>



            <InputButton />



        </div >
    )
}
