


export default function AccountSetupSections(props) {


    return (
        <div className="row  border-bottom mb-4" >
            <div className="col-12 d-flex">

                <span
                    className={`px-5 py-3 ${props.section === 'accountDetails' ? 'fw-bold text-success border-bottom border-success border-2 ' : ''}`} type="button"
                    onClick={() => props.setSection('accountDetails')} data-bs-target="#accoutSetupPages" data-bs-slide-to='0'>
                    Detalhes da conta
                </span>
                <span
                    className={`px-5 py-3 ${props.section === 'myProducts' ? 'fw-bold text-success border-bottom border-success border-2 ' : ''}`} type="button"
                    onClick={() => props.setSection('myProducts')} data-bs-target="#accoutSetupPages" data-bs-slide-to='1'
                >
                    Seus produtos
                </span>
                <span
                    className={`px-5 py-3 ${props.section === 'billing' ? 'fw-bold text-success border-bottom border-success border-2 ' : ''}`} type="button"
                    onClick={() => props.setSection('billing')} data-bs-target="#accoutSetupPages" data-bs-slide-to='2'>
                    Pagamento
                </span>
            </div>

        </div>
    )
}