import dynamic from "next/dynamic";
import React from "react";
import CategoryIcon, { SubCategoryIcon } from "../categories/categoryIcon";

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
        tooltip: {
            y: {
                formatter: (value) => `R$ ${value.toFixed(2)}`,
            },
        },
    };

    return (
        <div className="row">
            <div className="col-12 col-lg-6">
                <Chart
                    options={chartOptions}
                    series={series}
                    type="donut"
                    height="400"
                />
            </div>
            <div className="col-12 col-lg-6">
                <div className="row fw-responsive" >
                    {data.map((elem, index) => (
                        <>
                            <hr />

                            <div className="col-12 mb-2">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <CategoryIcon color={elem.color} />
                                        <span className="bold mx-2">{elem.name}</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <span className="bold text-nowrap">
                                            R$ {elem.value?.toFixed(2)}
                                        </span>
                                        <span className="text-nowrap">
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
                        </>

                    ))}
                </div>


            </div>
        </div>
    );
}
