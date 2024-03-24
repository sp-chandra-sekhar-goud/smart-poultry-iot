import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function BarChart({ formattedTimeStamps, tempData, humidityData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
    }

    const context = chartRef.current.getContext("2d");
    const newChart = new Chart(context, {
      type: "bar",
      data: {
        labels: formattedTimeStamps,
        datasets: [
          {
            label: "Temperature",
            data: tempData,
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
          // {
          //   label: "Humidity",
          //   data: humidityData,
          //   backgroundColor: "rgba(54, 162, 235, 1)",
          //   borderColor: "rgb(54, 162, 235)",
          //   borderWidth: 1,
          // },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: 30,
        },
        scales: {
          x: {
            type: "category",
            position: "bottom",
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "start",
            labels: {
              usePointStyle: true,
              boxWidth: 8, 
            },
          },
        },
      },
    });
    chartRef.current.chart = newChart;
  }, [tempData, humidityData]);

  return (
    <div className=" p-6 rounded w-fit">
      <h1>Temperature & Humidity</h1>
      <div className="w-[40vw] overflow-x-auto">
        <div className="w-[100vw] h-[60vh]">
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
}