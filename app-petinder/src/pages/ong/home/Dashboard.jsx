import "./css/Dashboard.css";
import "../../../components/components.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardMaioresCurtidos from "../../../components/ong/DashboardMaioresCurtidos";
import DashboardAdotadosENao from "../../../components/ong/DashboardAdotadosENao";
import DashboardPendentes from "../../../components/ong/DashboardPendentes";
import SemMensagensdeInteressados from '../../../components/ong/SemMensagensdeInteressados';
import { Link } from "react-router-dom";
import { url } from "../../../provider/apiInstance";
import reqs from "../../../reqs";

export default function Dashboard() {
    const [pets, setPets] = useState([]);

    const mensagemDashboard = (
        <>
            Pelo visto você não cadastrou nenhum Pet,{" "}
            <Link to="/ong/pets" style={{ color: "#FF8FBB", textDecoration: "underline", cursor: "pointer" }}>
                clique aqui
            </Link> para cadastrar!
        </>
    );

useEffect(() => {
    const ongId = sessionStorage.getItem("ongId");
    if (!ongId) return;

    const fetchOngPets = async () => {
        const result = await reqs.dashboardInfosDosPets(ongId);
        if (result.success) {
            setPets(result.pets);
        } else {
            console.error('Erro ao buscar pets:', result.error);
        }
    };

    fetchOngPets();
}, []);

    return (
        <div style={{ width: "100%", justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
            <div className="containerFull">
                <h1>Dashboards</h1>
                <div className="englobe" style={{ gap: "20px", overflow: "hidden" }}>
                    {pets.length === 0 ? (
                        <SemMensagensdeInteressados mensagem={mensagemDashboard} icon="heart" />
                    ) : (
                        <>
                            <div className="dash-container">
                                <h4>Pets mais curtidos:</h4>
                                <DashboardMaioresCurtidos />
                            </div>
                            <div className="dash-container bottom">
                                <div className="dash-pendentes">
                                    <h4>Pets não vacinados / vermifugados / castrados:</h4>
                                    <DashboardPendentes />
                                </div>
                                <div className="dash-pie">
                                    <h4>Quantidade de Pets adotados:</h4>
                                    <DashboardAdotadosENao />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}