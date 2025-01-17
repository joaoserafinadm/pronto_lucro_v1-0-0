import dynamic from "next/dynamic";
import DonutChart from "./DonutChart";
import { useStateContext } from "./context/resultsContext";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function DfcPage(props) {

    const {
        incomeDonutChartData,
        expenseDonutChartData
    } = useStateContext();




    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <DonutChart data={incomeDonutChartData} />
                </div>
            </div>

        </div>
    )
}