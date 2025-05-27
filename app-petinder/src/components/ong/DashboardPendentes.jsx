import "./css/DashboardPendentes.css";
import React, { useEffect, useState } from "react";
import SemMensagensdeInteressados from "./SemMensagensdeInteressados";
import { url } from "../../provider/apiInstance";

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

    url.get(`/dashs/pendencias/${ongId}`)
        .then(res => setPendentes(res.data))
        .catch(err => console.error(err));
}, []);

    return (
        <div className="dash-container-pendentes">
            {pendentes.length === 0 ? (
                <SemMensagensdeInteressados mensagem={mensagemPendentes} icon="heart"/>
            ) : (
                pendentes.map((pet, idx) => (
                    <div className="container-pendencia" key={idx}>
                        <img className="imagem-pet" src={pet.imagemPet} />
                        <p>
                            {pet.nome} necessita de: {formatPendencias(pet.pendencias)}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}