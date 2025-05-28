import "../../../components/components.css";
import { MdPermPhoneMsg } from "react-icons/md";
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Mensagens from "../../../components/ong/Mensagens";
import SemMensagensdeInteressados from "../../../components/ong/SemMensagensdeInteressados";
import DashboardMaioresCurtidos from "../../../components/ong/DashboardMaioresCurtidos";
import DashboardAdotadosENao from "../../../components/ong/DashboardAdotadosENao";
import { Link } from "react-router-dom";
import { url } from "../../../provider/apiInstance";

export default function HomeContent() {
    const tamanho = 1;
    const [pets, setPets] = useState([]);

    const mensagemInteressados = "Ainda não temos nenhum interessado, mas não se preocupe, em pouco tempo irão aparecer!"
    const mensagemCharts = (
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

        url.get(`/ongs/${ongId}/pets`)
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                if(error.response && error.response.status === 404) {
                    setPets([]);
                } else {
                    console.error('Erro ao buscar pets:', error);
                }
            });
    }, []);

    return (
        <div className="containerFull">
            <h1>Interessados</h1>

            <div className="englobe">
                {tamanho === 0 ? (
                    <SemMensagensdeInteressados mensagem={mensagemInteressados} icon="normal" />
                ) : (
                    <>
                        <Mensagens
                            nome="Cauan Araruna"
                            mensagem="Estou interessado(a) em adotar o(a) Kenny!"
                            data="19/04/2025 - 13:14"
                            telefone="(11) 98804-1111"
                            email="cauan.araruna@sptech.school"
                            imgSrc="/cauan.svg"
                        />
                        <Mensagens
                            nome="Gisele Mendes"
                            mensagem="Estou interessado(a) em adotar o(a) Dolores!"
                            data="19/04/2025 - 13:15"
                            telefone="(11) 93204-1234"
                            email="gisele.teste@sptech.school"
                            imgSrc="/gisele.svg"
                        />
                    </>
                )}
            </div>


            <div className="titles">
                <div className="left">
                    <h2>Pets mais curtidos:</h2>
                    {/* {graph === 0 ? ("") : (
                        <div className="chartTitle">
                            <LuChartNoAxesColumnIncreasing size={25} />
                            <p>Menor ao maior</p>
                        </div>
                    )} */}
                </div>

                <h2 className="right">Quantidade de pets adotados:</h2>
            </div>

            {pets.length === 0 ? (
                <SemMensagensdeInteressados mensagem={mensagemCharts} icon="heart" />
            ) : (
                <>
                    <div className="chartContainer">
                        <div className="chartLikes">
                            <div className="chartLikeContent">
                                <DashboardMaioresCurtidos />
                            </div>
                        </div>

                        <div className="chartAdoptions">
                            <div className="chartAdoptContent">
                                <DashboardAdotadosENao top={true} />
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}