import { useState } from "react"
import { useStateContext } from "./context/resultsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";




export default function FilterModal(props) {

    const {
        bankAccounts,
        incomeCategories,
        expenseCategories,
        incomeCategoriesFilter,
        setIncomeCategoriesFilter,
        expenseCategoriesFilter,
        setExpenseCategoriesFilter,
        accountsFilter,
        setAccountsFilter
    } = useStateContext();

    const [incomeInnerFilter, setIncomeInnerFilter] = useState([]);
    const [expenseInnerFilter, setExpenseInnerFilter] = useState([]);
    const [accountsInnerFilter, setAccountsInnerFilter] = useState([]);


    const handleIncomeFilter = (id) => {
        const categoryExist = incomeInnerFilter.find((elem) => elem?._id === id);



        if (!categoryExist) {
            const categoryData = incomeCategories.find((elem) => elem._id === id);
            setIncomeInnerFilter([...incomeInnerFilter, categoryData]);
        } else {
            return
        }
    }

    const handleExpenseFilter = (id) => {
        const categoryExist = expenseInnerFilter.find((elem) => elem?._id === id);

        if (!categoryExist) {
            const categoryData = expenseCategories.find((elem) => elem._id === id);
            setExpenseInnerFilter([...expenseInnerFilter, categoryData]);
        } else {
            return
        }
    }

    const handleAccountFilter = (id) => {
        const accountExist = accountsInnerFilter.find((elem) => elem?._id === id);

        if (!accountExist) {
            const accountData = bankAccounts.find((elem) => elem._id === id);
            setAccountsInnerFilter([...accountsInnerFilter, accountData]);
        } else {
            return
        }
    }


    const handleFilter = () => {
        setIncomeCategoriesFilter(incomeInnerFilter);
        setExpenseCategoriesFilter(expenseInnerFilter);
        setAccountsFilter(accountsInnerFilter);
    }


    const handleCancel = () => {
        setIncomeInnerFilter(incomeCategoriesFilter);
        setExpenseInnerFilter(expenseCategoriesFilter);
        setAccountsInnerFilter(accountsFilter);
    }



    return (
        <div class="modal fade" id="filterModal" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterModalLabel">Nova conta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">

                            <div className="col-12">
                                <label htmlFor="categoriesFilterSelect">Categorias de receitas</label>
                                <select className="form-select" id="categoriesFilterSelect" value='' onChange={(e) => handleIncomeFilter(e.target.value)} >
                                    <option value='' disabled selected>Selecione</option>
                                    {incomeCategories.map((elem) => (
                                        <option value={elem._id}>{elem.categoryName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="categoriesFilterSelect">Categorias de despesas</label>
                                <select className="form-select" id="categoriesFilterSelect" value='' onChange={(e) => handleExpenseFilter(e.target.value)} >
                                    <option value='' disabled selected>Selecione</option>
                                    {expenseCategories.map((elem) => (
                                        <option value={elem._id}>{elem.categoryName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-12 mt-3">
                                <label htmlFor="categoriesFilterSelect">Contas</label>
                                <select className="form-select" id="categoriesFilterSelect" value='' onChange={(e) => handleAccountFilter(e.target.value)} >
                                    <option value='' disabled selected>Selecione</option>
                                    {bankAccounts.map((elem) => (
                                        <option value={elem._id}>{elem.description}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <FontAwesomeIcon icon={faFilter} />
                                                <span className="small fw-bold mb-2 ms-3">Filtros</span>
                                            </div>
                                            {!!incomeInnerFilter.length && (

                                                <div className="col-12">
                                                    <span className="small bold">Categorias de receitas</span>
                                                    <div className="row">
                                                        <div className="col-12 d-flex flex-wrap">

                                                            {incomeInnerFilter.map((elem) => (
                                                                <div>
                                                                    <span style={{ backgroundColor: elem.color, color: "white" }}
                                                                        className=" border fadeItem rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                                                        {elem.categoryName}
                                                                        <span type='button' className="ms-2" onClick={() => setIncomeInnerFilter(incomeInnerFilter.filter((cat) => cat._id !== elem._id))}>
                                                                            <FontAwesomeIcon icon={faTimes} className=" text-white" />
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {!!expenseInnerFilter.length && (

                                                <div className="col-12">
                                                    <span className="small bold">Categorias de despesas</span>
                                                    <div className="row">
                                                        <div className="col-12 d-flex flex-wrap">

                                                            {expenseInnerFilter.map((elem) => (
                                                                <div>
                                                                    <span style={{ backgroundColor: elem.color, color: "white" }}
                                                                        className=" border fadeItem rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                                                        {elem.categoryName}
                                                                        <span type='button' className="ms-2" onClick={() => setExpenseInnerFilter(expenseInnerFilter.filter((cat) => cat._id !== elem._id))}>
                                                                            <FontAwesomeIcon icon={faTimes} className=" text-white" />
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {!!accountsInnerFilter.length && (

                                                <div className="col-12">
                                                    <span className="small bold">Contas</span>
                                                    <div className="row">
                                                        <div className="col-12 d-flex flex-wrap">

                                                            {accountsInnerFilter.map((elem) => (
                                                                <div>
                                                                    <span style={{ backgroundColor: elem.color, color: "white" }}
                                                                        className=" border fadeItem rounded d-flex align-items-center px-2 py-1   small mx-1 rounded-pill fw-bold">
                                                                        {elem.description}
                                                                        <span type='button' className="ms-2" onClick={() => setAccountsInnerFilter(accountsInnerFilter.filter((cat) => cat._id !== elem._id))}>
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

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-sm btn-c-tertiary" data-bs-dismiss="modal" onClick={() => handleCancel()}>Cancelar</button>
                        <button type="button" className="btn btn-sm btn-c-success" data-bs-dismiss="modal" onClick={() => handleFilter()}>Aplicar filtro</button>
                    </div>
                </div>
            </div>
        </div >

    )
}