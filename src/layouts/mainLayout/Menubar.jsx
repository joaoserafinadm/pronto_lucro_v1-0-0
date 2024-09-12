import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Menubar.module.scss'
import { faChartLine, faHome, faHomeUser, faList, faMoneyBillTransfer, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleBarChange } from '../../../store/ToggleBarStatus/ToggleBarStatus.action'
import InputButton from '../../components/inputButton/InputButton'
import { faTrello } from '@fortawesome/free-brands-svg-icons'


export default function MenuBar(props) {

    const dispatch = useDispatch()

    const router = useRouter()

    const [pathname, setPathname] = useState('')

    useEffect(() => {

        setPathname(router.pathname)

    }, [router.pathname])

    const permitedPages = [
        '/usersManagement',
        '/transactions',
        '/bankAccounts',
        '/categories',
        '/'
    ]





    return (
        <div className={` ${permitedPages.includes(pathname) ? styles.container : styles.containerHide}`}>
            <div className="row h-100 px-4">
                <div className="col d-flex justify-content-center align-items-center px-0">

                    <Link href='/'
                        className={`text-center  ${pathname === '/' ? `${styles.pageSelected}` : 'text-light'}`}>
                        <FontAwesomeIcon icon={faHome} /> <br />
                        <span className={`${pathname === '/' ? `${styles.pageSelected}` : 'text-light'}`} style={{ fontSize: '10px' }}>Início</span>
                    </Link>

                </div>
                <div className="col d-flex justify-content-center align-items-center px-0">

                    <Link href='/transactions'
                        className={`text-center  ${pathname === '/transactions' ? `${styles.pageSelected}` : 'text-light'}`}>
                        <FontAwesomeIcon icon={faMoneyBillTransfer} /> <br />
                        <span className={`${pathname === '/transactions' ? `${styles.pageSelected}` : 'text-light'}`} style={{ fontSize: '10px' }}>Transações</span>
                    </Link>

                </div>
                <div className=" d-flex justify-content-center align-items-center px-0" style={{ width: '80px' }}>

                    <InputButton menubar />


                </div>
                <div className="col d-flex justify-content-center align-items-center px-0">

                    <Link href='/planning'
                        className={`text-center  ${pathname === '/planning' ? `${styles.pageSelected}` : 'text-light'}`}>
                        <FontAwesomeIcon icon={faChartLine} /> <br />
                        <span className={`${pathname === '/planning' ? `${styles.pageSelected}` : 'text-light'}`} style={{ fontSize: '10px' }}>Resultados</span>
                    </Link>

                </div>
                <div className="col d-flex justify-content-center align-items-center px-0">

                    <span type='button' onClick={() => dispatch(toggleBarChange(false))}
                        className={`text-center text-light`}>
                        <FontAwesomeIcon icon={faList} /> <br />
                        <span className='text-light' style={{ fontSize: '10px' }}>Opções</span>
                    </span>

                </div>
            </div>
        </div>
    )
}



{/* <div className="col-3 d-flex justify-content-center align-items-center ">
                    <span>
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center ">
                    <span>
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center ">
                    <span>
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-center ">
                    <span>
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                </div> */}





// <div>

//         <Link href='/usersManagement' className='text-center text-light '>
//             <FontAwesomeIcon icon={faUsers} /> <br />
//             <span className='small'>Usuários</span>
//         </Link>
//     </div>
//     <Link href='/clientsManagement' className='text-center text-light '>
//         <FontAwesomeIcon icon={faHomeUser} /> <br />
//         <span className='small'>Clientes</span>
//     </Link>
//     <Link href='/clientsManagement' className='text-center text-light '>
//         <FontAwesomeIcon icon={faList} /> <br />
//         <span className='small'>Imobiliária</span>
//     </Link>