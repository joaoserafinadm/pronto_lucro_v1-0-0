import styles from './BankAccounts.module.scss'



export default function NewAccountCard(props) {



    return (
        <span type='button' className="cardAnimation card h-100" data-bs-toggle="modal" data-bs-target="#newAccountModal">
            <div className="card-body">
                <div className="row d-flex h-100">
                    <div className="col-12 d-flex justify-content-center align-items-center">


                        <span className={`${styles.newAccountCardIcon}`}>
                            +
                        </span>
                        <span className='ms-2 text-secondary bold'>
                            Nova conta
                        </span>
                    </div>
                </div>
            </div>
        </span>
    )
}