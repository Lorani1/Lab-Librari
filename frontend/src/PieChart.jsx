import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const labels = [
  "January",
  "Frebruary",
  "March",
  "April",
  "May",
  "June",
  "July",
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My first dataset",
      backgroundColor: "rgb(255,99,132)",
      borderColor: "rgb(255,99,132)",
      data: [0, 10, 10, 10, 10, 10, 15],
    },
  ],
};

function PieChart() {
  return (
    <div className="bg-white border border-secondary">
      <Pie data={data}></Pie>
    </div>
  );
}

export default PieChart;