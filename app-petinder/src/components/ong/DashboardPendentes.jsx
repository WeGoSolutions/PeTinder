import "./css/DashboardPendentes.css";
import React, { useEffect, useState } from "react";
import SemMensagensdeInteressados from "./SemMensagensdeInteressados";
import reqs from "../../reqs";

function formatPendencias(pendencias) {
    const colorMap = {
        "Castração": "#C04646",
        "Vermífugo": "#016400",
        "Vacina": "#F5B400"
    };

    return pendencias.map((pend, i) => {
        let separator = "";
        if (i === pendencias.length - 1 && pendencias.length > 1) {
            separator = " e ";
        } else if (i > 0) {
            separator = ", ";
        }
        return (
            <React.Fragment key={i}>
                {separator}
                <span style={{ color: colorMap[pend] || "#000" }}>{pend}</span>
            </React.Fragment>
        );
    });
}

const mensagemPendentes = "Aparentemente, seus Pets não necessitam de nenhum cuidado no momento."

export default function DashboardPendentes() {
    const [pendentes, setPendentes] = useState([]);

useEffect(() => {
    const ongId = sessionStorage.getItem("ongId");
    if (!ongId) return;

    const fetchPendentes = async () => {
        const result = await reqs.getDashboardPendenciasBadges(ongId);
        if (result.success) {
            setPendentes(result.data);
            console.log("PEndentes", result.data)
        } else {
            setPendentes([]);
        }
    };
    
    fetchPendentes();
}, []);

    return (
        <div className="dash-container-pendentes">
            {pendentes.length === 0 ? (
                <SemMensagensdeInteressados mensagem={mensagemPendentes} icon="heart"/>
            ) : (
                pendentes.map((pet, idx) => (
                    <div className="container-pendencia" key={idx}>
                        <img className="imagem-pet" src={pet.imageUrl} />
                        <p>
                            {pet.nome} necessita de: {formatPendencias(pet.faltas)}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}