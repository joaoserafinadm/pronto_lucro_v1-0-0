import { faArrowUp, faEdit, faEllipsis, faPaperclip, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../utils/mask";
import TypeIcon from "./TypeIcon";
import TagSelected from "./tagSelected";
import ActiveButton from "./activeButton";
import { useStateContext } from "./context/transactionsContext";

export default function DfcList(props) {

    const { data, setIncomeSelected, incomeSelected, categories } = useStateContext();

    const containerRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const longPressTimer = useRef(null);

    const brlMoney = {
        format: (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    };

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const availableHeight = window.innerHeight - rect.top - 150;
                setHeight(availableHeight);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLongPressStart = (elem) => {
        longPressTimer.current = setTimeout(() => {
            setSelectedItem(elem); // Mostra as opções do item pressionado

            if (navigator.vibrate) {
                navigator.vibrate(100); // Faz o celular vibrar por 100ms
            }
        }, 500); // Pressionado por 500ms ativa a ação
    };

    const handleLongPressEnd = () => {
        clearTimeout(longPressTimer.current);
    };

    return (
        <div className="row d-flex">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <span className="text-secondary fw-bold">Todas transações</span>
                        </div>
                        <hr />
                       
                        <div className="row">
                            <div
                                className="col-12"
                                ref={containerRef}
                                style={{ height: "450px", overflowY: "scroll" }}
                            >
                                {data?.dfcData?.length === 0 ? (
                                    <div className="row my-5">
                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                            <span className="small">Nenhum lançamento neste mês</span>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {data?.dfcData?.map((elem, index) => {
                                            const tagSelected = data?.tags?.find(
                                                (elem1) => elem1._id === elem?.tag_id
                                            );
                                            const accountSelected = data?.accounts?.find(
                                                (elem1) => elem1._id === elem?.account_id
                                            );

                                            return (
                                                <React.Fragment key={index}>
                                                    <div
                                                        className="row d-flex"
                                                        onClick={() => setIncomeSelected(elem)}
                                                        onTouchStart={() => handleLongPressStart(elem)}
                                                        onTouchEnd={handleLongPressEnd}
                                                    >
                                                        <div className="col">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <span className="small text-secondary">
                                                                        {formatDate(elem?.paymentDate)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-1">
                                                                <div className="col-12">
                                                                    <div className="d-flex">

                                                                        {elem?.description ? elem?.description : 'Sem descricão'}
                                                                        {elem?.creditConfig?.parcelaAtual && (
                                                                            <div className="ms-2">
                                                                                ({elem?.creditConfig?.parcelaAtual} / {elem?.creditConfig?.parcelas})
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-end align-items-center"
                                                            style={{ width: "150px" }}
                                                        >
                                                            <span
                                                                className={`bold text-center text-${elem?.active === false
                                                                    ? "secondary"
                                                                    : elem?.type === "income"
                                                                        ? "success"
                                                                        : "danger"
                                                                    }`}
                                                            >
                                                                {elem?.type === "expense" && "-"}
                                                                {elem?.type === "income" && "+"}
                                                                {brlMoney.format(elem?.value)} <br />
                                                                {elem?.active === false && (
                                                                    <div className="d-flex">
                                                                        <span className="me-2" style={{ fontSize: "12px" }}>Pendente </span>
                                                                        <ActiveButton
                                                                            incomeSelected={incomeSelected}
                                                                            setIncomeSelected={setIncomeSelected}
                                                                            elem={elem}
                                                                            smallScreen
                                                                        />
                                                                    </div>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className=" mt-2" style={{ fontSize: "8px" }}>
                                                            <div className="col-12">
                                                                <TagSelected
                                                                    subCategory_id={elem.subCategory_id}
                                                                    categories={categories}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <div style={{ fontSize: "8px" }}>
                                                                <span
                                                                    className="cardAnimation px-2  text-white small  rounded-pill fw-bold"
                                                                    style={{ backgroundColor: accountSelected?.color, padding: "6px 5px" }}
                                                                >
                                                                    <img
                                                                        src={accountSelected?.bankSelected?.logoUrl}
                                                                        className="rounded-circle me-2"
                                                                        alt=""
                                                                        width={10}
                                                                        height={10}
                                                                    />
                                                                    {accountSelected?.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {selectedItem === elem && (
                                                        <div className="row mt-2 p-2 rounded fadeItem">
                                                            <div className="col-12 d-flex justify-content-center">
                                                                <div className="btn-group" role="group">
                                                                    <button
                                                                        className="btn btn-outline-secondary cardAnimation"
                                                                        type="button"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#attachmentModal"
                                                                        onClick={() => setIncomeSelected(elem)}
                                                                    >
                                                                        {elem.files && (
                                                                            <span
                                                                                className="bg-success me-1"
                                                                                style={{
                                                                                    display: 'inline-block',
                                                                                    height: '10px',
                                                                                    width: '10px',
                                                                                    borderRadius: '50%',
                                                                                }}
                                                                            />
                                                                        )}
                                                                        <FontAwesomeIcon icon={faPaperclip} />
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-outline-secondary cardAnimation"
                                                                        type="button"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={elem.type === 'expense' ? "#editExpenseModal" : "#editIncomeModal"}
                                                                        onClick={() => setIncomeSelected(elem)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faEdit} />
                                                                    </button>

                                                                    <button
                                                                        className="btn btn-outline-secondary cardAnimation"
                                                                        type="button"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#deleteIncomeModal"
                                                                        onClick={() => setIncomeSelected(elem)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <hr />
                                                </React.Fragment>
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
