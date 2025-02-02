import { useEffect, useState } from "react";
import { useStateContext } from "./context/resultsContext";



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


    const statusFilter = status === "Efetuadas" ? true : status === "Pendentes" ? false : null;
    const categories = incomeCategories.concat(expenseCategories);
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




    return (
        <div class="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Plano de Contas</th>
                        <th>Valor</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>
                    {planoDeContasConfig?.map((elem, index) => (
                        <>
                            {elem.selectedCategories?.map((elem1, index1) => {

                                const categoryExist = categories.find((elem2) => elem2._id === elem1);



                                return (
                                    <tr>
                                        <td className="text-start">{categoryExist.categoryName}</td>
                                    </tr>
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