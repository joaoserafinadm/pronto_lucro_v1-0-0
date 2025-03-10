import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { formatDate } from '../../utils/mask';
import TypeIcon from './TypeIcon';
import TagSelected from './tagSelected';
import ActiveButton from './activeButton';
import { useStateContext } from './context/transactionsContext';
// import './DfcList.css'; // Importe o arquivo CSS, se necessário

export default function DfcList(props) {
        const { data, setIncomeSelected, incomeSelected,categories } = useStateContext()
    
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
        <div className="row d-flex">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <span className='text-secondary fw-bold'>
                                Todas transações
                            </span>
                        </div>
                        <hr />
                        <div className="row">
                            <div
                                className="col-12"
                                ref={containerRef}
                                style={{ height: '450px', overflowY: 'scroll' }}
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

                                            const tagSelected = data?.tags?.find(elem1 => elem1._id === elem?.tag_id);

                                            const accountSelected = data?.accounts?.find(elem1 => elem1._id === elem?.account_id);


                                            return (
                                                <>
                                                    <div className="row d-flex" key={index} onClick={() => setIncomeSelected(elem)}>
                                                        {/* <div className='d-flex justify-content-center align-items-center' style={{ width: '30px' }}>
                                                            <span>

                                                                <TypeIcon elem={elem} />
                                                            </span>
                                                        </div> */}
                                                        <div className="col">

                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <span className='small text-secondary'>
                                                                        {formatDate(elem?.paymentDate)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-1">
                                                                <div className="col-12">
                                                                    <span className='fw-bold'>
                                                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className=' d-flex justify-content-end align-items-center' style={{ width: '150px' }}>
                                                            <span className={`bold text-center text-${elem?.active === false ? 'secondary' : elem?.type === 'income' ? 'success' : 'danger'}`} >

                                                                {elem?.type === 'expense' && '-'}{elem?.type === 'income' && '+'}{brlMoney.format(elem?.value)} <br />
                                                                {elem?.active === false && 'Pendente' && (

                                                                    <div className="d-flex">
                                                                        <span style={{ fontSize: '12px' }}>Pendente</span>

                                                                        <ActiveButton incomeSelected={incomeSelected} setIncomeSelected={setIncomeSelected} elem={elem} smallScreen />
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="" style={{fontSize: '8px'}}>
                                                            <div className="col-12">
                                                                <TagSelected subCategory_id={elem.subCategory_id} categories={categories} />


                                                            </div>
                                                        </div>
                                                        <div className=" mt-2">
                                                            <div style={{fontSize: '8px'}}>

                                                                <span
                                                                    className={` cardAnimation px-2 py-2  text-white small mx-1 rounded-pill fw-bold `}

                                                                    style={{ backgroundColor: accountSelected?.color }}>
                                                                    <img src={accountSelected?.bankSelected?.logoUrl} className="rounded-circle me-2" alt="" width={10} height={10} />
                                                                    {accountSelected?.description}
                                                                </span>
                                                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}
