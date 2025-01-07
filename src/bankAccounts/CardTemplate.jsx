import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './BankAccounts.module.scss'
import { faArrowTrendDown, faArrowTrendUp, faEdit, faEye, faGear } from '@fortawesome/free-solid-svg-icons'



export default function CardTemplate(props) {

    const { bankSelected, color, value, predictedValue, description, creditNetwork, accountsPage, setAccountSelected, elem } = props


    return (
        <div className="" style={{ width: "278px" }}>
            <div className={`${styles.cardTemplate}`}>
                <img
                    src={bankSelected?.id === "1" ? 'WALLET_TEMPLATE.png' : 'CARD_TEMPLATE.png'}
                    alt=""
                    className={`${styles.cardTemplate}`}
                    style={{ backgroundColor: color ? color : "#4d88bb" }}
                />
                <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                    <div>
                        <div className="d-flex mt-2">
                            <div className='d-flex justify-content-center align-items-center ' style={{ width: "40px" }}>
                                <img src={bankSelected?.logoUrl} alt="" className={`${styles.bankIcon}`} />
                            </div>
                            <div className="col ps-0 d-flex  align-items-center">
                                <span className={`${styles.cardTitle}`}>{bankSelected?.name}</span>
                            </div>
                        </div>
                        <span className={`${styles.cardTitle} ms-2 small fw-bold`}>{description}</span>
                    </div>
                    {accountsPage ?
                        <div className={`${styles.amountCard} ms-2 d-flex flex-column mb-2`}>
                            <span className='text-white my-0 py-0' style={{ fontSize: '10px' }}>
                                Valor total
                            </span>
                            <span className='text-white'>
                                R$ {value ? value : '0,00'}
                            </span>
                            <span className='text-white mt-1 my-0 py-0' style={{ fontSize: '10px' }}>
                                Valor previsto
                            </span>
                            <span className='text-white'>
                                R$ {predictedValue ? predictedValue : '0,00'}
                            </span>
                        </div>
                        :
                        <div >
                            <div className={`${styles.amountCard} ms-2`}>
                                R$ {value ? value : '0,00'}
                            </div>
                        </div>
                    }

                    {!accountsPage && (


                        <div className='mb-2 '>
                            <span className='ms-3 text-white' style={{ fontSize: accountsPage ? '10px' : '14px' }}>João Serafin</span>

                        </div>
                    )}
                    <img src={creditNetwork?.logoUrl} alt="" className={`${styles.creditNetworkIcon} me-1 my-0 py-0`} />
                </div>
            </div>
            {props.editButtons && (
                <div className="row mt-2">
                    <div className="col-12 d-flex justify-content-center ">
                        <div className="btn-group ">
                            <button
                                className="btn btn-outline-secondary btn-sm  pt-2"
                                onClick={() => setAccountSelected(elem)}
                                data-bs-toggle="modal" data-bs-target="#viewAccountModal">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            {/* <button className="btn btn-outline-secondary btn-sm pt-2">
                                <FontAwesomeIcon icon={faArrowTrendUp} className='text-success' />
                            </button>
                            <button className="btn btn-outline-secondary btn-sm pt-2">
                                <FontAwesomeIcon icon={faArrowTrendDown} className='text-danger' />
                            </button> */}
                            <button
                                className="btn btn-outline-secondary btn-sm pt-2"
                                onClick={() => setAccountSelected(elem)}
                                data-bs-toggle="modal" data-bs-target="#editAccountModal">
                                <FontAwesomeIcon icon={faGear} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}





{/* <div className="row py-2 ps-4">
                        <div className='d-flex justify-content-center align-items-center py-2' style={{ width: "40px" }}>
                            <img src={bankSelected?.logoUrl} alt="" className={`${styles.bankIcon}`} />
                        </div>
                        <div className="col ps-0 d-flex  align-items-center">
                            <span className={`${styles.cardTitle}`}>{bankSelected?.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span style={{marginLeft: '55px', width: '140px' , backgroundColor: 'red'}} className={`${styles.cardTitle}`}>dsadsa</span>
                    </div>
                    <div className="row " style={{ marginTop: '20px' }}>
                        <span className='ms-3 small'>João Serafin</span>
                        <span className='ms-3 small'>Conta Salário</span>
                    </div> */}