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
import reqs from "../../../reqs";

export default function HomeContent() {
    const [pets, setPets] = useState([]);
    const [infosMensagens, setInfosMensagens] = useState([]);

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

        const fetchPets = async () => {
            const result = await reqs.homeOngCharts(ongId);
            if (result.success) {
                setPets(result.pets);
            } else {
                console.error('Erro ao buscar pets:', result.error);
            }
        };

        fetchPets();
    }, []);

    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        const fetchMensagens = async () => {
            const result = await reqs.interessadosMensagens(ongId);
            if (result.success) {
                setInfosMensagens(result.mensagens);
            } else {
                console.error('Erro ao buscar mensagens:', result.error);
            }
        };

        fetchMensagens();
    }, []);

    function formatarData(dataHora) {
        if (!dataHora) return '';
        const data = new Date(dataHora);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
    }

    return (
        <div className="containerFull">
            <h1>Interessados</h1>

            <div className="englobe">
                {infosMensagens.length === 0 ? (
                    <SemMensagensdeInteressados mensagem={mensagemInteressados} icon="normal" />
                ) : (
                    <>
                        {infosMensagens.slice(0, 2).map((msg, idx) => (
                            <Mensagens
                                key={idx}
                                nome={msg.userName}
                                mensagem={`Estou interessado(a) em adotar o(a) ${msg.petNome}!`}
                                data={formatarData(msg.dataStatus)}
                                telefone={msg.telefoneUser}
                                email={msg.userEmail}
                                imgSrc={msg.imageUrl || "/profile.svg"}
                            />
                        ))}
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