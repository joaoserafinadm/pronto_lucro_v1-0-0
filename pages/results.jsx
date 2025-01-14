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

export default function ResultsPage(props) {
    return (
        <StateProvider>
            <Results />
        </StateProvider>
    );
}

function Results() {

    const token = jwt.decode(Cookie.get("auth"));

    const {
        setBankAccounts,
        setIncomeCategories,
        setExpenseCategories,
        type,
        setType,
        status,
        setStatus,
        view,
        setView,
    } = useStateContext();

    const [dateSelected, setDateSelected] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const [section, setSection] = useState("DFC");
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        if (dateSelected) dataFunction(token.sub);
    }, [dateSelected]);

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
                setLoadingPage(false);
            })
            .catch((e) => {
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
                            sections={["DFC", "DRE"]}
                        />

                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <DfcPage />
                            </div>
                            <div className="carousel-item">
                                <DrePage />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
