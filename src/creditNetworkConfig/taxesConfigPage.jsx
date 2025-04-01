import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookie from 'js-cookie';
import axios from 'axios';
import { SpinnerLG, SpinnerSM } from '../components/loading/Spinners';

export default function TaxesConfigPage() {
    const token = jwt.decode(Cookie.get('auth'));

    const [creditNetworkTaxes, setCreditNetworkTaxes] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        dataFunction();
    }, []);

    const dataFunction = async () => {
        try {
            const res = await axios.get(`/api/creditNetworkConfig`, {
                params: { user_id: token.sub }
            });
            console.log("res.data", res.data);
            setCreditNetworkTaxes(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingPage(false);
        }
    };

    // Atualiza a taxa de um cartão específico
    const handleTaxChange = (index, value) => {
        const newConfig = [...creditNetworkTaxes]; // Cria uma cópia do array
        newConfig[index] = { ...newConfig[index], tax: parseFloat(value) || 0 }; // Atualiza apenas o item necessário
        setCreditNetworkTaxes(newConfig);
    };

    const handleSave = async () => {
        setLoadingSave(true);
        const data = {
            user_id: token.sub,
            creditNetworkTaxes
        };

        try {
            const res = await axios.patch(`/api/creditNetworkConfig`, data);
            console.log(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingSave(false);
        }
    };

    return (
        <div>
            {loadingPage ? (
                <SpinnerLG />
            ) : (
                <>
                    <div className="row">
                        {creditNetworkTaxes?.map((elem, index) => (
                            <div className='col-12 col-md-6' key={elem._id}>
                                <div className="card my-2">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6 d-flex justify-content-center align-items-center flex-column">
                                                <img src={elem.logoUrl} alt={elem.descricao} style={{ maxWidth: '130px', position: 'absolute', marginBottom: '20px' }} />
                                                <span style={{ position: 'absolute', marginTop: '60px' }} className='small fw-bold'>{elem.descricao}</span>
                                            </div>
                                            <div className="col-6 d-flex justify-content-center align-items-center">
                                                <div>
                                                    <label htmlFor={`tax-${elem._id}`} className="">Taxa (%)</label>
                                                    <div className='input-group'>
                                                        <input
                                                            className='form-control text-center'
                                                            type="number"
                                                            id={`tax-${elem._id}`}
                                                            placeholder='0'
                                                            min="0"
                                                            max="100"
                                                            value={elem.tax || ''}
                                                            onChange={(e) => handleTaxChange(index, e.target.value)}
                                                        />
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
                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-c-success" onClick={handleSave} disabled={loadingSave}>
                                {loadingSave ? <SpinnerSM className="mx-3" /> : "Salvar"}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
