// import dynamic from "next/dynamic";
// import DonutChart from "./DonutChart";
// import { useStateContext } from "./context/resultsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faTag } from "@fortawesome/free-solid-svg-icons";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


export default function CategoriesChartCard(props) {

    // const {
    //     incomeDonutChartData,
    //     expenseDonutChartData,
    //     view,
    // } = useStateContext();




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
                        <div className="row d-flex justify-content-center">
                            {/* {!data.length ?

                                <div className="col-12 d-flex justify-content-center my-5">
                                    <span className="text-center text-secondary">
                                        Nenhuma transação encontrada
                                    </span>

                                </div>


                                :
                                <div className="col-12 col-md-6 ">
                                    <Chart
                                        options={chartOptions}
                                        series={series}
                                        type="donut"
                                    // height="400"
                                    />
                                </div>
                            } */}
                        </div>
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
                        {/* <DonutChart data={expenseDonutChartData} /> */}
                    </div>
                </div>

            </div>
        </>

    )
}