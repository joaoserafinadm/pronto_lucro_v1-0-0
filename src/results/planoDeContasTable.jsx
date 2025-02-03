import { useEffect, useState } from "react";
import { useStateContext } from "./context/resultsContext";
import { maskNumberMoney } from "../../utils/mask";



export default function PlanoDeContasTable(props) {


    const {
        setBankAccounts,
        bankAccounts,
        setIncomeCategories,
        incomeCategories,
        setExpenseCategories,
        expenseCategories,
        setType,
        status,
        setStatus,
        view,
        setView,
        setDfcData,
        dfcData,
        incomeCategoriesFilter,
        expenseCategoriesFilter,
        accountsFilter,
        setIncomeDonutChartData,
        setExpenseDonutChartData,
        planoDeContasConfig
    } = useStateContext();

    const newIncomeCategories = incomeCategories.map((cat) => ({ ...cat, type: "income" }));
    const newExpenseCategories = expenseCategories.map((cat) => ({ ...cat, type: "expense" }));

    const statusFilter = status === "Efetuadas" ? true : status === "Pendentes" ? false : null;
    const categories = newIncomeCategories.concat(newExpenseCategories);
    const categoryFilters = incomeCategoriesFilter.concat(expenseCategoriesFilter);


    const hasCategoryFilters = categoryFilters.length > 0;
    const hasAccountFilters = accountsFilter.length > 0;

    // Filtragem inicial
    const filteredCategories = hasCategoryFilters
        ? categories.filter(cat => categoryFilters.some(filter => filter._id === cat._id))
        : categories;

    const filteredData = dfcData.filter(item => {
        const isStatusMatch = statusFilter === null || item.active === statusFilter;
        // const isTypeMatch = item.type === type;
        const isCategoryMatch = filteredCategories.some(cat =>
            cat.subCategories.some(subCat => subCat._id === item.subCategory_id)
        );
        const isAccountMatch = hasAccountFilters
            ? accountsFilter.some(filter => filter._id === item.account_id)
            : true;

        return isStatusMatch && isAccountMatch;
        // return isStatusMatch && isTypeMatch && isCategoryMatch && isAccountMatch;
    });

    const totalIncomeValue = filteredData
        .filter(item => item.type === "income")
        .reduce((sum, elem) => sum + elem.value, 0);
    const totalExpenseValue = filteredData
        .filter(item => item.type === "expense")
        .reduce((sum, elem) => sum + elem.value, 0);







    return (
        <div class="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Plano de Contas</th>
                        <th className="text-end">Valor</th>
                        <th className="text-end">%</th>
                    </tr>
                </thead>
                <tbody>
                    {planoDeContasConfig?.map((elem, index) => (
                        <>
                            {elem.selectedCategories?.map((elem1, index1) => {

                                const categoryExist = categories.find((elem2) => elem2._id === elem1);

                                const value = dfcData
                                    .filter((item) => categoryExist?.subCategories?.some(sub => sub._id === item.subCategory_id))
                                    .reduce((sum, elem) => sum + elem.value, 0);

                                let percent = (categoryExist.type === "expense" ? ((value / totalExpenseValue) * 100).toFixed(2) : ((value / totalIncomeValue) * 100).toFixed(2));

                                percent =  isNaN(percent) ? 0 : percent

                                return (
                                    <>
                                        <tr>
                                            <td className="text-start bold" style={{minWidth: "250px"}}>{categoryExist.categoryName}</td>
                                            <td className={`text-end text-nowrap bold ${categoryExist.type === "expense" && "text-c-danger"}`}>{categoryExist.type === "expense" && "- "}R$ {maskNumberMoney(value)}</td>
                                            <td className={`text-end text-nowrap bold ${categoryExist.type === "expense" && "text-c-danger"}`}>{percent}%</td>
                                        </tr>

                                        {categoryExist.subCategories.map((elem2, index2) => {

                                            const value = dfcData
                                                .filter((item) => item.subCategory_id === elem2._id)
                                                .reduce((sum, elem) => sum + elem.value, 0);

                                            let percent = categoryExist.type === "expense" ? ((value / totalExpenseValue) * 100).toFixed(2) : ((value / totalIncomeValue) * 100).toFixed(2);


                                            if (value === 0) return

                                            return (
                                                <tr key={index2}>
                                                    <td className="text-start small ps-4" style={{minWidth: "250px"}}>{elem2.name}</td>
                                                    <td className={`text-end text-nowrap small ps-4 ${categoryExist.type === "expense" && "text-c-danger"}`}>{categoryExist.type === "expense" && "- "}R$ {maskNumberMoney(value)}</td>
                                                    <td className={`text-end text-nowrap small ps-4 ${categoryExist.type === "expense" && "text-c-danger"}`}>{percent}%</td>
                                                </tr>
                                            )
                                        })}

                                    </>
                                )
                            })}

                            <tr>
                                <td className="text-start fw-bold">(=) {elem?.resultName}</td>
                            </tr>
                        </>
                    ))}

                </tbody>
            </table>
        </div>
    )
}