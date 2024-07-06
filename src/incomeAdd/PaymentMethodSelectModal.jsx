import Modal, { hideModal } from '../components/Modal';
import paymentMethodOptions from './paymentMethodOptions.json'



export default function PaymentMethodSelectModal(props) {

    const { paymentMethod, setPaymentMethod } = props;


    return (

        <Modal id={props.id} >
            <div className="modal-header">
                <h5 className="modal-title title-dark" id="paymentMethodSelectModalLabel">
                    Método de pagamento
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => hideModal(props.id)}
                    aria-label="Close"
                ></button>
            </div>
            <div className="modal-body">
                <div className="row ">
                    <div className="col-12 d-flex flex-wrap">
                        {paymentMethodOptions.map((elem, index) => {
                            return (
                                <span type="button" onClick={() => { setPaymentMethod(elem.id); hideModal(props.id) }}
                                    className={`cardAnimation px-2 py-1 m-2 text-white small mx-1 rounded-pill ${paymentMethod === elem.id ? props.section === 'income' ? 'ctm-bg-success' : props.section === 'expense' ? 'ctm-bg-danger' : 'ctm-bg-primary': 'ctm-bg-primary'}`}>
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