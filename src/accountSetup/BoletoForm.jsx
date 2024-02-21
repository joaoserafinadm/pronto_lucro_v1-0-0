



export default function BoletoForm() {

    return (
        <>
            <hr />
            <div className="row mt-3 fadeItem">
                <div className="col-12 col-lg-6 my-2">
                    <label for="titularName" >Nome</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <label for="titularName" >Sobrenome</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 my-2">
                    <label for="titularName" >E-mail</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <label for="titularName" >Documento</label>
                    <select class="form-select" aria-label="Default select example" >
                        <option selected disabled >Selecione</option>
                        <option value="creditCard">Cartão de crédito</option>
                        <option value="boleto">Boleto bancário</option>
                    </select>
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <label for="titularName" >Número do documento</label>
                    <input type="text" class="form-control" id="titularName" aria-describedby="titularName" />
                </div>


            </div>
        </>
    )
}