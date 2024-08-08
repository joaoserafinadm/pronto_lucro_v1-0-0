import styles from './BankAccounts.module.scss'



export default function CardTemplate(props) {

    const { bankSelected, color, value, description } = props





    return (
        <div className="" style={{ width: "278px" }}>
            <div className={`${styles.cardTemplate}`}>
                <img
                    src='CARD_TEMPLATE.png'
                    alt=""
                    className={`${styles.cardTemplate}`}
                    style={{ backgroundColor: color ? color : "#4d88bb" }}
                />
                <div className={`${styles.cardContent} d-flex flex-column justify-content-between`}>
                    <div>
                        <div className="d-flex mt-2">
                            <div className='d-flex justify-content-center align-items-center ' style={{ width: "40px" }}>
                                <img src={bankSelected.logoUrl} alt="" className={`${styles.bankIcon}`} />
                            </div>
                            <div className="col ps-0 d-flex  align-items-center">
                                <span className={`${styles.cardTitle}`}>{bankSelected.name}</span>
                            </div>
                        </div>
                        <span className={`${styles.cardTitle} ms-2 small`}>{description}</span>
                    </div>
                    <div >
                        <div className={`${styles.amountCard} ms-2`}>
                            R$ {value}
                        </div>
                    </div>

                    <div className='mb-2'>
                        <span className='ms-3 small'>João Serafin</span>
                    </div>
                </div>
            </div>
        </div>


    )
}





{/* <div className="row py-2 ps-4">
                        <div className='d-flex justify-content-center align-items-center py-2' style={{ width: "40px" }}>
                            <img src={bankSelected.logoUrl} alt="" className={`${styles.bankIcon}`} />
                        </div>
                        <div className="col ps-0 d-flex  align-items-center">
                            <span className={`${styles.cardTitle}`}>{bankSelected.name}</span>
                        </div>
                    </div>
                    <div className="row">
                        <span style={{marginLeft: '55px', width: '140px' , backgroundColor: 'red'}} className={`${styles.cardTitle}`}>dsadsa</span>
                    </div>
                    <div className="row " style={{ marginTop: '20px' }}>
                        <span className='ms-3 small'>João Serafin</span>
                        <span className='ms-3 small'>Conta Salário</span>
                    </div> */}