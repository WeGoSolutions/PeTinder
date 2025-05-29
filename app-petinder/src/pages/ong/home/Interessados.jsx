import "../../../components/components.css";
import { MdPermPhoneMsg } from "react-icons/md";
import Mensagens from "../../../components/ong/Mensagens";
import SemMensagensdeInteressados from "../../../components/ong/SemMensagensdeInteressados";
import { useEffect, useState } from "react";
import { url } from "../../../provider/apiInstance";

export default function Interessados() {

    const mensagemInteressados = "Ainda não temos nenhum interessado, mas não se preocupe, em pouco tempo irão aparecer!";

    const [infosMensagens, setInfosMensagens] = useState([]);
    
    useEffect(() => {
        const ongId = sessionStorage.getItem("ongId");
        if (!ongId) return;

        url.get(`/ongs/${ongId}/mensagens-pendentes`)
            .then(response => {
                const dados = response.data;
                setInfosMensagens(Array.isArray(dados) ? dados : []);
            })
            .catch(error => {
                console.error('Erro ao buscar mensagens:', error);
            });
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
            <h1>Últimos interessados</h1>

            <div className="englobe">
                {infosMensagens.length === 0 ? (
                    <SemMensagensdeInteressados mensagem={mensagemInteressados} icon="normal" />
                ) : (
                    <>
                    {infosMensagens.map((msg, idx) => (
                        <Mensagens
                            key={idx}
                            nome={msg.nomeUser}
                            mensagem={`Estou interessado(a) em adotar o(a) ${msg.nomePet}!`}
                            data={formatarData(msg.dataHora)}
                            telefone={msg.telefoneUser}
                            email={msg.emailUser}
                            imgSrc={msg.imageUrl || "/profile.svg"}
                        />
                    ))}
                    </>
                )}
            </div>
        </div>
    );
}