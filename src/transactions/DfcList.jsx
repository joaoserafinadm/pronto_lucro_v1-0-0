import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { formatDate } from '../../utils/mask';
import TypeIcon from './TypeIcon';
// import './DfcList.css'; // Importe o arquivo CSS, se necessário

export default function DfcList(props) {
    const { data } = props;
    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);

    const brlMoney = {
        format: (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const availableHeight = window.innerHeight - rect.top - 150;
                setHeight(availableHeight);
            }
        };

        // Calculate the height when the component mounts
        handleResize();

        // Recalculate the height when the window is resized
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="row">
            <div
                className="col-12"
                ref={containerRef}
                style={{ height: height, overflowY: 'scroll' }}
            >
                {data?.dfcData?.length === 0 ?
                    <div className="row my-5">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <span className='small'>Nenhum lançamento neste mês</span>
                        </div>
                    </div>
                    :
                    <>
                        {data?.dfcData?.map((elem, index) => {

                            const tagSelected = data?.tags?.find(elem1 => elem1._id === elem?.tag);
                            return (
                                <>
                                    <div className="row d-flex" key={index}>
                                        <div className='d-flex justify-content-center align-items-center' style={{ width: '30px' }}>
                                            <span>

                                                <TypeIcon elem={elem} />
                                            </span>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-12">
                                                    {!tagSelected ?
                                                        <span class=" px-2 py-1  small rounded-pill border">
                                                            Sem marcador
                                                        </span>
                                                        :
                                                        <>
                                                            <div className="row">
                                                                <div>
                                                                    <span type="button"
                                                                        className={`cardAnimation px-2 py-1   small rounded-pill fw-bold `}
                                                                        style={{ backgroundColor: tagSelected.color, color: tagSelected.textColor, fontSize: '10px' }}>
                                                                        {tagSelected.tag}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }

                                                </div>
                                            </div>
                                            <div className="row mt-1">
                                                <div className="col-12">
                                                    <span className='bold'>
                                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                                    </span>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-12">
                                                    <span className='small text-secondary'>
                                                        {formatDate(elem?.paymentDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' d-flex justify-content-end align-items-center' style={{ width: '150px' }}>
                                            <span className={`bold text-center text-${elem?.active === false ? 'secondary' : elem?.type === 'income' ? 'success' : 'danger'}`} >

                                                {brlMoney.format(elem?.value)} <br />
                                                {elem?.active === false && 'Pendente' }
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            );
                        })}
                    </>
                }

            </div>
        </div>
    );
}
