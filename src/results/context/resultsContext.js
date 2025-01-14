// src/context/StateContext.js
import { createContext, useContext, useState } from "react";

// Criando o contexto
const StateContext = createContext();

// Componente Provider para encapsular os estados globais
export const StateProvider = ({ children }) => {

    const [bankAccounts, setBankAccounts] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);

    const [type, setType] = useState("Receitas");
    const [status, setStatus] = useState("Efetuadas");
    const [view, setView] = useState("Categorias");
    const [incomeCategoriesFilter, setIncomeCategoriesFilter] = useState([]);
    const [expenseCategoriesFilter, setExpenseCategoriesFilter] = useState([]);
    const [accountsFilter, setAccountsFilter] = useState([]);

    return (
        <StateContext.Provider
            value={{
                bankAccounts,
                setBankAccounts,
                incomeCategories,
                setIncomeCategories,
                expenseCategories,
                setExpenseCategories,
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
                setAccountsFilter
            }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook para consumir o contexto
export const useStateContext = () => useContext(StateContext);
