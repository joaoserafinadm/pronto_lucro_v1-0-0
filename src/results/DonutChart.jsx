import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutChart(props) {
    const { data } = props;

    // Extrair os valores e labels das categorias para o gráfico
    const series = data.map(category => category.value); // Valores das categorias
    const labels = data.map(category => category.name); // Nomes das categorias
    const colors = data.map(category => category.color); // Cores associadas às categorias

    // Configurações do gráfico
    const chartOptions = {
        chart: {
            type: "donut",
        },
        labels: labels,
        colors: colors,
        legend: {
            show: true,
            position: "bottom",
        },
        tooltip: {
            y: {
                formatter: (value) => `R$ ${value.toFixed(2)}`,
            },
        },
    };

    return (
        <div>
            <Chart
                options={chartOptions}
                series={series}
                type="donut"
                height="400"
            />
        </div>
    );
}
