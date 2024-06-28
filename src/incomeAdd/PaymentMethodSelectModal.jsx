import Modal from '../components/Modal';
import paymentMethodOptions from './paymentMethodOptions.json'



export default function PaymentMethodSelectModal(props) {

    const { paymentMethod, setPaymentMethod } = props;


    return (

        <Modal id='paymentMethodSelectModal' size='modal-sm'>
            <div className="modal-header">
                <h5 className="modal-title title-dark" id="paymentMethodSelectModalLabel">
                    Método de pagamento
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <div className="row ">
                    <div className="col-12 d-flex flex-wrap">
                        {paymentMethodOptions.map((elem, index) => {
                            return (
                                <span onClick={() => setPaymentMethod(elem.id)} data-bs-dismiss="modal"
                                    className={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${paymentMethod === elem.id ? 'ctm-bg-success' : 'ctm-bg-primary'}`}>
                                    {elem.description}
                                </span>
                            )
                        })}
                    </div>

                </div>

            </div>
        </Modal>
    )
}