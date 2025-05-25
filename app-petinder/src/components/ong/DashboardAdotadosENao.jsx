import "./css/DashboardAdotadosENao.css";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
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

        axios
            .get(`http://localhost:8080/dashs/adotados-ou-nao/${ongId}`)
            .then((response) => {
                setChartData({
                    labels: ["Adotados", "Não Adotados"],
                    datasets: [
                        {
                            data: [response.data.adotados, response.data.naoAdotados],
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
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
            });
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