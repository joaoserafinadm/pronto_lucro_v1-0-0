import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateContext } from "./context/resultsContext";
import FilterModal from "./FilterModal";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function FilterSetup() {

    const {
        type,
        setType,
        status,
        setStatus,
        view,
        setView,
        incomeCategoriesFilter,
        setIncomeCategoriesFilter,
        expenseCategoriesFilter,
        setExpenseCategoriesFilter,
        accountsFilter,
        setAccountsFilter } = useStateContext();

    useEffect(() => {
        console.log("incomeCategoriesFilter", incomeCategoriesFilter);
    }, [incomeCategoriesFilter.length])

    return (
        <>
            <FilterModal />

            <div className="row mt-3 d-flex justify-content-center">
                {/* <div className="col-12 col-md-6 col-xl-3">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="typeSelect">
                            Tipo:
                        </label>
                        <select
                            className="form-select"
                            id="typeSelect"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Receitas">Receitas</option>
                            <option value="Despesas">Despesas</option>
                        </select>
                    </div>
                </div> */}
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="statusSelect">
                            Status:
                        </label>
                        <select
                            className="form-select"
                            id="statusSelect"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Efetuadas">Efetuadas</option>
                            <option value="Pendentes">Pendentes</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="clientsOrderSelect">
                            Visualizar:
                        </label>
                        <select
                            className="form-select"
                            id="clientsOrderSelect"
                            value={view}
                            onChange={(e) => setView(e.target.value)}
                        >
                            <option value="Categorias">Por categorias</option>
                            <option value="Contas">Por contas</option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="row px-3">
                        <button
                            className="btn btn-c-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#filterModal"
                        >
                            <FontAwesomeIcon icon={faFilter} className="me-2" />Filtro
                        </button>
                    </div>
                </div>
            </div>
            {(!!incomeCategoriesFilter.length || !!expenseCategoriesFilter.length || !!accountsFilter.length) && (
                <div className="row fadeItem mt-3">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <FontAwesomeIcon icon={faFilter} />
                                        <span className="small fw-bold mb-2 ms-3">Filtros</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    {!!incomeCategoriesFilter.length && (

                                        <div className={`${(!!expenseCategoriesFilter.length && !accountsFilter.length) || (!expenseCategoriesFilter.length && !!accountsFilter.length) ? "col-12 col-md-6" : !!expenseCategoriesFilter.length && !!accountsFilter.length ? "col-12 col-md-4" : "col-12"} border-end`}>
                                            <span className="small bold">Categorias de receitas</span>
                                            <div className="row">
                                                <div className="col-12 d-flex flex-wrap">

                                                    {incomeCategoriesFilter.map((elem) => (
                                                        <div>
                                                            <span style={{ backgroundColor: elem.color, color: "white" }}
                                                                className=" border fadeItem rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                                                {elem.categoryName}
                                                                <span type='button' className="ms-2" onClick={() => setIncomeCategoriesFilter(incomeCategoriesFilter.filter((cat) => cat._id !== elem._id))}>
                                                                    <FontAwesomeIcon icon={faTimes} className=" text-white" />
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!!expenseCategoriesFilter.length && (

                                        <div className={`${(!!incomeCategoriesFilter.length && !accountsFilter.length) || (!incomeCategoriesFilter.length && !!accountsFilter.length) ? "col-12 col-md-6" : !!incomeCategoriesFilter.length && !!accountsFilter.length ? "col-12 col-md-4" : "col-12"} border-end`}>

                                            <span className="small bold">Categorias de despesas</span>
                                            <div className="row">
                                                <div className="col-12 d-flex flex-wrap">

                                                    {expenseCategoriesFilter.map((elem) => (
                                                        <div>
                                                            <span style={{ backgroundColor: elem.color, color: "white" }}
                                                                className=" border fadeItem rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                                                {elem.categoryName}
                                                                <span type='button' className="ms-2" onClick={() => setExpenseCategoriesFilter(expenseCategoriesFilter.filter((cat) => cat._id !== elem._id))}>
                                                                    <FontAwesomeIcon icon={faTimes} className=" text-white" />
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!!accountsFilter.length && (

                                        <div className={`${(!!incomeCategoriesFilter.length && !expenseCategoriesFilter.length) || (!incomeCategoriesFilter.length && !!expenseCategoriesFilter.length) ? "col-12 col-md-6" : !!incomeCategoriesFilter.length && !!expenseCategoriesFilter.length ? "col-12 col-md-4" : "col-12"} border-end`}>

                                            <span className="small bold">Contas</span>
                                            <div className="row">
                                                <div className="col-12 d-flex flex-wrap">

                                                    {accountsFilter.map((elem) => (
                                                        <div>
                                                            <span style={{ backgroundColor: elem.color, color: "white" }}
                                                                className=" border fadeItem rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                                                {elem.description}
                                                                <span type='button' className="ms-2" onClick={() => setAccountsFilter(accountsFilter.filter((cat) => cat._id !== elem._id))}>
                                                                    <FontAwesomeIcon icon={faTimes} className=" text-white" />
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
