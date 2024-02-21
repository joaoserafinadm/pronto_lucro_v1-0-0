import { useEffect } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";





export default function CreditCardForm() {

    
    useEffect(() => {
        handleMercadoPago()
    }, [])


    const handleMercadoPago = async () => {

        await loadMercadoPago();
        const mp = new window.MercadoPago('TEST-781e03ee-dcc5-4c68-ae88-abe9bde14e11');

    }


    return (
        <>
            <hr />
            <div className="row mt-3 fadeItem">
                <div className="col-12 my-2">
                    <label for="titularName" >Nome do títular do cartão</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 my-2">
                    <label for="titularName" >Número do cartão</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <label for="titularName" >Data de expiração</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <label for="titularName" >Código de segurança</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 my-2">
                    <label for="titularName" >CPF/CNPJ</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 my-2">
                    <label for="titularName" >Endereço de e-mail</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>

            </div>
        </>

    )

}