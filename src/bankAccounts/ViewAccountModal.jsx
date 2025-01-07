



export default function ViewAccountModal(props) {

    const { token,
        creditCardList,
        accountSelected,
        institutions,
        setAccountSelected } = props

    // const creditCardNetwork = creditCardList.find(creditCard => creditCard.institution_id === accountSelected?.institution_id)?.network

    console.log("creditCardNetwork", accountSelected)
    return (
        <div class="modal fade" id="viewAccountModal" tabindex="-1" aria-labelledby="viewAccountModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewAccountModalLabel">Visualizar conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    </div>
                </div>
            </div>
        </div>
    )



}