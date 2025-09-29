import "./css/DashboardMaioresCurtidos.css";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import reqs from "../../reqs";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardMaioresCurtidos() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

useEffect(() => {
    const ongId = sessionStorage.getItem("ongId");
    if (!ongId) return;

    const fetchDashboardData = async () => {
        const result = await reqs.getDashboardRanking(ongId);
        
        if (result.success) {
            setChartData({
                labels: result.data.labels,
                datasets: [
                    {
                        label: "Curtidas",
                        backgroundColor: "rgba(128, 70, 93, 0.6)",
                        borderColor: "rgba(128, 70, 93, 1)",
                        borderWidth: 3,
                        hoverBackgroundColor: "rgba(255, 113, 169, 0.6)",
                        hoverBorderColor: "rgba(255, 113, 169, 1)",
                        data: result.data.curtidas,
                    },
                ],
            });
        }
    };
    
    fetchDashboardData();
}, []);

    return (
        <div className="dash-container-bar">
            <div style={{ flex: 1 }}>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    color: "#000",
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: true,
                                    color: "#000",
                                    lineWidth: (ctx) => (ctx.tick.value === 0 ? 1 : 0),
                                },
                                ticks: {
                                    stepSize: 1,
                                    color: "#000",
                                    callback: function (value) {
                                        return Number.isInteger(value) ? value : null;
                                    },
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            x: {
                                grid: {
                                    display: true,
                                    color: "#000",
                                },
                                ticks: {
                                    color: "#000",
                                    font: {
                                        size: 12
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
}