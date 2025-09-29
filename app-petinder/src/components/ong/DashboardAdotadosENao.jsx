import "./css/DashboardAdotadosENao.css";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import reqs from "../../reqs";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardAdotadosENao(props) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

useEffect(() => {
    const ongId = sessionStorage.getItem("ongId");
    if (!ongId) return;

    const fetchDashboardData = async () => {
        const result = await reqs.getDashboardAdotadosENao(ongId);
        
        if (result.success) {
            setChartData({
                labels: ["Adotados", "Não Adotados"],
                datasets: [
                    {
                        data: [result.data.adotados, result.data.naoAdotados],
                        backgroundColor: [
                            "rgba(128, 70, 93, 0.6)",
                            "rgba(255, 113, 169, 0.6)"
                        ],
                        borderColor: [
                            "rgba(128, 70, 93, 1)",
                            "rgba(255, 113, 169, 1)"
                        ],
                        borderWidth: 3,
                    },
                ],
            });
        }
    };
    
    fetchDashboardData();
}, []);

    return (
        <div className="dash-container-pie">
            <div
                style={{
                    flex: 1,
                    maxWidth: 300,
                    maxHeight: 300,
                    margin: "0 auto"
                }}>
                <Pie
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: props.top ? "top" : "right",
                                labels: {
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