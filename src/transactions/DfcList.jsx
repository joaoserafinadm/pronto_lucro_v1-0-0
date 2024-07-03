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
                            return (
                                <>
                                    <div className="row d-flex" key={index}>
                                        <div className='d-flex justify-content-center align-items-center' style={{ width: '50px' }}>
                                            <span>

                                                <TypeIcon elem={elem} />
                                            </span>
                                        </div>
                                        <div className="col">
                                            <div className="row">
                                                <div className="col-12">
                                                    <span>
                                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <span>
                                                        {elem?.tag ? elem?.tag : 'Sem marcação'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <span>
                                                        {elem?.tag ? elem?.tag : 'Sem marcação'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <span>
                                                        {formatDate(elem?.paymentDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' d-flex justify-content-end align-items-center' style={{ width: '150px' }}>
                                            <span className='bold text-success'>

                                                {brlMoney.format(elem?.value)}
                                            </span>
                                        </div>
                                    </div>

                                </>
                            );
                        })}
                    </>
                }

            </div>
        </div>
    );
}
