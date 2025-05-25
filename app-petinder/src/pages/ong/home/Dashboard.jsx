import "./css/Dashboard.css";
import "../../../components/components.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardMaioresCurtidos from "../../../components/ong/DashboardMaioresCurtidos";
import DashboardAdotadosENao from "../../../components/ong/DashboardAdotadosENao";
import DashboardPendentes from "../../../components/ong/DashboardPendentes";
import SemMensagensdeInteressados from '../../../components/ong/SemMensagensdeInteressados';

export default function Dashboard() {
    const [pets, setPets] = useState([]);
    const mensagem = `Pelo visto você não cadastrou nenhum Pet, clique aqui para cadastrar!`;

    // useEffect(() => {
    //     const ongId = sessionStorage.getItem("ongId");
    //     if (!ongId) return;

    //     axios.get(`http://localhost:8080/pets/${ongId}`)
    //         .then(response => {
    //             setPets(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Erro ao buscar pets:', error);
    //         });
    // }, []);

    const tamanho = 1;

    return (
        <div style={{ width: "100%", justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
            <div className="containerFull">
                <h1>Dashboards</h1>
                <div className="englobe" style={{gap: "20px", overflow: "hidden"}}>
                    {tamanho === 0 ? (
                        <SemMensagensdeInteressados mensagem={mensagem} icon="normal" />
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