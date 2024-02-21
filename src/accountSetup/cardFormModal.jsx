import { useEffect, useState } from "react";
import CreditCardForm from "./CreditCardForm";
import BoletoForm from "./BoletoForm";




export default function CardFormModal() {

    const [paymentType, setPaymentType] = useState('');





    return (
        <div class="modal fade" id="cardFormModal" tabindex="-1" aria-labelledby="cardFormModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title title-dark" id="cardFormModalLabel">Pagamento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-6">

                                    <label for="exampleInputEmail1" >Forma de pagamento</label>
                                    <select class="form-select" aria-label="Default select example" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                        <option selected disabled value='' >Selecione</option>
                                        <option value="creditCard">Cartão de crédito</option>
                                        <option value="boleto">Boleto bancário</option>
                                    </select>
                                </div>
                            </div>

                            {paymentType === 'creditCard' && <CreditCardForm />}
                            {paymentType === 'boleto' && <BoletoForm />}


                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                        <button className="btn btn-success btn-sm" data-bs-dismiss="modal">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}