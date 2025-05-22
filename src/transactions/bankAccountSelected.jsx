


export default function BankAccountSelected(props) {

    const { accountSelected } = props
    return (
        <>
            {!accountSelected ?
                <span class=" px-2 py-1  small rounded-pill border">
                    Sem conta
                </span>
                :


                <span
                    className={`border text-white  d-flex align-items-center px-2 py-1   small  rounded-pill fw-bold`}

                    style={{ backgroundColor: accountSelected.color }}>
                    <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={16} height={16} />
                    {accountSelected.description}
                </span>
            }

        </>

    )
}