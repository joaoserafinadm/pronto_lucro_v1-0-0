// import dynamic from "next/dynamic";
// import DonutChart from "./DonutChart";
// import { useStateContext } from "./context/resultsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faTag } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import jwt from "jsonwebtoken";
import Cookie from "js-cookie";
import axios from "axios";
import DonutChart from "../results/DonutChart";
import handleResults from "../results/calc/handleResults";


export default function CategoriesChartCard(props) {

    const token = jwt.decode(Cookie.get('auth'))

    // const [dfcData, setDfcData] = useState([])

    const [incomeDonutChartData, setIncomeDonutChartData] = useState([])
    const [expenseDonutChartData, setExpenseDonutChartData] = useState([])



    useEffect(() => {
        dataFunction()
    }, [])

    const dataFunction = async () => {

        await axios.get(`/api/indexPage/categoriesChart`, {
            params: { user_id: token.sub, month: new Date().getMonth(), year: new Date().getFullYear() }
        })
            .then(res => {

                const dfcData = res.data.dfcData
                const incomeCategories = res.data.incomeCategories
                const expenseCategories = res.data.expenseCategories

          


                const incomeResults = handleResults({
                   type: "income",
                    dfcData,
                    incomeCategories,
                    expenseCategories
                });
                const expenseResults = handleResults({
                    type: "expense",
                    dfcData,
                    incomeCategories,
                    expenseCategories
                });

                console.log("incomeResults", incomeResults)

                setIncomeDonutChartData(incomeResults);
                setExpenseDonutChartData(expenseResults);
            }).catch(e => {
                console.log(e)
            })

    }




    return (
        <>
            <div className="col-12 col-lg-6 my-2">
                <div className="card">
                    <div className="card-body">
                        <div className="row text-c-success">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faChartPie} />
                                <span className="small fw-bold mb-2 ms-3">Receitas por Categoria</span>
                            </div>
                        </div>
                        <DonutChart data={incomeDonutChartData} />

                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 my-2">

                <div className="card ">
                    <div className="card-body">
                        <div className="row text-c-danger">
                            <div className="col-12">
                                <FontAwesomeIcon icon={faChartPie} />
                                <span className="small fw-bold mb-2 ms-3">Despesas por Categoria</span>
                            </div>
                        </div>
                        <DonutChart data={expenseDonutChartData} />
                    </div>
                </div>

            </div>
        </>

    )
}