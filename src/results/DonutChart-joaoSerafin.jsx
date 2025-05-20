import dynamic from "next/dynamic";
import React from "react";
import CategoryIcon, { SubCategoryIcon } from "../categories/categoryIcon";
import DragScroll from "../components/dragScroll";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutChart(props) {
    const { data } = props;

    // Extrair os valores e labels das categorias para o gráfico
    const series = data.map(category => category.value); // Valores das categorias
    const labels = data.map(category => category.name); // Nomes das categorias
    const colors = data.map(category => category.color); // Cores associadas às categorias

    console.log('data', data)

    // Configurações do gráfico
    const chartOptions = {
        chart: {
            type: "donut",
        },
        labels: labels,
        colors: colors,
        legend: {
            show: false,
            position: "bottom",
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Total",
                            formatter: () => {
                                // Calcula o total e formata como moeda
                                const total = data.reduce((acc, category) => acc + category.value, 0);
                                return new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(total);
                            },
                        },
                    },
                },
            },
        },
        tooltip: {
            y: {
                formatter: (value) => `R$ ${value.toFixed(2)}`,
            },
        },
    };

    return (
        <>
            {!data.length ?
                <div className="row d-flex justify-content-center">

                    <div className="col-12 d-flex justify-content-center my-5">
                        <span className="text-center text-secondary">
                            Nenhuma transação encontrada
                        </span>

                    </div>


                </div>
                :
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-6 ">
                        <Chart
                            options={chartOptions}
                            series={series}
                            type="donut"
                        // height="400"
                        />
                    </div>
                    <div className="col-12 col-lg-6">
                        <DragScroll maxHeight="300px">
                            <div className="fw-responsive" style={{fontSize: "12px"}}>
                                {data.map((elem, index) => (
                                    <>

                                        <div className="col-12 mb-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <CategoryIcon color={elem.color} />
                                                    <span className="bold mx-2">{elem.name}</span>
                                                </div>
                                                <div className="d-flex flex-column align-items-end">
                                                    <span className="fw-bold text-nowrap">
                                                        R$ {elem.value?.toFixed(2)}
                                                    </span>
                                                    <span className="bold text-nowrap">
                                                        {(+elem.percentage)?.toFixed(2)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {elem.subCategories && elem.subCategories.map((elem1, index) => (

                                            <div className="col-12 d-flex  align-items-center my-2 justify-content-between">
                                                <div>
                                                    <SubCategoryIcon color={elem.color} />
                                                    <span className="fw-bold" style={{ color: elem.color }}>{elem1.name}</span>
                                                </div>
                                                <div className="d-flex flex-column align-items-end">
                                                    <span className="small text-nowrap">
                                                        R$ {elem1.value?.toFixed(2)}
                                                    </span>
                                                    <span className="small text-nowrap">
                                                        {(+elem1.percentage)?.toFixed(2)}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />

                                    </>

                                ))}
                                <div className="col-12 d-flex justify-content-between">
                                    <span className="fw-bold">Total</span>
                                    <span className="fw-bold text-nowrap">R$ {data.reduce((total, elem) => total + elem.value, 0)?.toFixed(2)}</span>

                                </div>

                            </div>
                        </DragScroll>


                    </div>
                </div>
            }
        </>

    );
}
