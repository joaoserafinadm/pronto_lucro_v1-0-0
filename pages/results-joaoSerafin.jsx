// pages/resultsPage.jsx
import { useEffect, useState } from "react";
import Title from "../src/components/title/Title2";
import { SpinnerLG } from "../src/components/loading/Spinners";
import Sections from "../src/components/Sections";
import DfcPage from "../src/results/DfcPage";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import MonthSelect from "../src/incomeAdd/MonthSelect";
import DrePage from "../src/results/DrePage";
import { StateProvider, useStateContext } from "../src/results/context/resultsContext";
import FilterSetup from "../src/results/FilterSetup";
import handleResults from "../src/results/calc/handleResults";
import navbarHide from "../utils/navbarHide";
import { useDispatch } from "react-redux";
import PlanoDeContasPage from "../src/results/planoDeContasPage";


export default function ResultsPage(props) {
    return (
        <StateProvider>
            <Results />
        </StateProvider>
    );
}

function Results() {

    const token = jwt.decode(Cookie.get("auth"));

    const dispatch = useDispatch()


    const {
        setBankAccounts,
        bankAccounts,
        setIncomeCategories,
        incomeCategories,
        setExpenseCategories,
        expenseCategories,
        type,
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
        setPlanoDeContasConfig
    } = useStateContext();

    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const [section, setSection] = useState("DFC");
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        navbarHide(dispatch)
    }, [])
    useEffect(() => {
        if (dateSelected) dataFunction(token.sub);
    }, [dateSelected]);

    useEffect(() => {
        const incomeResults = handleResults({
            type:"income",
            status,
            view,
            dfcData,
            incomeCategoriesFilter,
            expenseCategoriesFilter,
            accountsFilter,
            bankAccounts,
            incomeCategories,
            expenseCategories
        });
        const expenseResults = handleResults({
            type:"expense",
            status,
            view,
            dfcData,
            incomeCategoriesFilter,
            expenseCategoriesFilter,
            accountsFilter,
            bankAccounts,
            incomeCategories,
            expenseCategories
        });

        setIncomeDonutChartData(incomeResults);
        setExpenseDonutChartData(expenseResults);

    }, [type, status, view, dfcData, incomeCategoriesFilter, expenseCategoriesFilter, accountsFilter]);

    const dataFunction = async (user_id) => {
        await axios
            .get("/api/results", {
                params: {
                    user_id,
                    month: dateSelected.month,
                    year: dateSelected.year,
                },
            })
            .then((res) => {
                setBankAccounts(res.data.bankAccountsArray);
                setIncomeCategories(res.data.incomeCategories);
                setExpenseCategories(res.data.expenseCategories);
                setDfcData(res.data.dfcData);
                setLoadingPage(false);
            })
            .catch((e) => {
                setLoadingPage(false);
                console.log(e);
            });
    };

    return (
        <div>
            <Title title="Resultados" subtitle="" backButton />

            {loadingPage ? (
                <SpinnerLG />
            ) : (
                <div className="pagesContent shadow fadeItem mb-5">
                    <div className="row px-2">
                        <div className="col-12 my-2 d-flex justify-content-center">
                            <MonthSelect setMonth={(value) => setDateSelected(value)} />
                        </div>
                    </div>

                    <FilterSetup
                        type={type}
                        setType={setType}
                        status={status}
                        setStatus={setStatus}
                        view={view}
                        setView={setView}
                    />

                    <div
                        className="carousel slide mt-3"
                        data-bs-touch="false"
                        data-bs-interval="false"
                        id="resultsPage"
                    >
                        <Sections
                            section={section}
                            idTarget="resultsPage"
                            setSection={(value) => setSection(value)}
                            sections={["DFC", "Plano de contas"]}
                        />

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <DfcPage />
                            </div>
                            <div className="carousel-item">
                                <PlanoDeContasPage />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
