// src/context/StateContext.js
import { createContext, useContext, useState } from "react";

// Criando o contexto
const StateContext = createContext();

// Componente Provider para encapsular os estados globais
export const StateProvider = ({ children }) => {

    const [data, setData] = useState(null)
    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })
    const [categories, setCategories] = useState([])

    const [incomeSelected, setIncomeSelected] = useState(null)

    const [loadingData, setLoadingData] = useState(true)


    return (
        <StateContext.Provider
            value={{
                data,
                setData,
                dateSelected,
                setDateSelected,
                categories,
                setCategories,
                incomeSelected,
                setIncomeSelected,
                loadingData,
                setLoadingData
            }}>
            {children}
        </StateContext.Provider>
    );
};

// Hook para consumir o contexto
export const useStateContext = () => useContext(StateContext);
