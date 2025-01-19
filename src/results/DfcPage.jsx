import dynamic from "next/dynamic";
import DonutChart from "./DonutChart";
import { useStateContext } from "./context/resultsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faTag } from "@fortawesome/free-solid-svg-icons";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function DfcPage(props) {

    const {
        incomeDonutChartData,
        expenseDonutChartData,
        view,
    } = useStateContext();




    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row text-c-success">
                        <div className="col-12">
                            <FontAwesomeIcon icon={faChartPie} />
                            <span className="small fw-bold mb-2 ms-3">Receitas por {view}</span>
                        </div>
                    </div>
                    <DonutChart data={incomeDonutChartData} />
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="row text-c-danger">
                        <div className="col-12">
                            <FontAwesomeIcon icon={faChartPie} />
                            <span className="small fw-bold mb-2 ms-3">Despesas por {view}</span>
                        </div>
                    </div>
                    <DonutChart data={expenseDonutChartData} />
                </div>
            </div>

        </div>
    )
}