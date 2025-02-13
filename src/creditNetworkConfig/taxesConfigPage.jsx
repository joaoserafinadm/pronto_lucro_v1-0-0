import creditNetworkList from '../bankAccounts/creditCardList.json'




export default function TaxesConfigPage() {




    return (
        <div>
            <div className="row">
                {creditNetworkList.map(elem => (
                    <div className='col-12 col-md-6 '>
                        <div className="card my-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 d-flex justify-content-center align-items-center flex-column" >

                                        <img src={elem.logoUrl} alt="" className="" style={{ maxWidth: '130px', position: 'absolute', marginBottom: '20px' }} />
                                        <span  style={{position: 'absolute', marginTop: '60px'}}  className='small fw-bold'>{elem.descricao}</span>
                                    </div>
                                    <div className="col-6 d-flex justify-content-center align-items-center">
                                        <div>
                                            <label htmlFor="" className="">Taxa (%)</label>
                                            <div className='input-group'>

                                                <input className='form-control text-center' type="number" id={elem.id} />
                                                <span className='input-group-text'>%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}