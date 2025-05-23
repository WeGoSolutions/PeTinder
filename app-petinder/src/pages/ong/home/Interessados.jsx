import "../../../components/components.css";
import { MdPermPhoneMsg } from "react-icons/md";
import Mensagens from "../../../components/ong/Mensagens";
import SemMensagensdeInteressados from "../../../components/ong/SemMensagensdeInteressados";

export default function Interessados() {

    const tamanho = 0;

    const mensagemInteressados = "Ainda não temos nenhum interessado, mas não se preocupe, em pouco tempo irão aparecer!";

    return (
        <div className="containerFull">
            <h1>Últimos interessados</h1>

            <div className="englobe">
                {tamanho === 0 ? (
                    <SemMensagensdeInteressados mensagem={mensagemInteressados} icon="normal" />
                ) : (
                    <>
                        <Mensagens
                            nome="Cauan Araruna"
                            mensagem="Estou interessado em adotar o Kenny!"
                            data="19/04/2025 - 13:14"
                            telefone="(11) 98804-1111"
                            email="cauan.araruna@sptech.school"
                            imgSrc="/cauan.svg"
                        />

                        <Mensagens
                            nome="Gisele Mendes"
                            mensagem="Estou interessada em adotar a Dolores!"
                            data="19/04/2025 - 13:15"
                            imgSrc="/gisele.svg"
                        />

                        <Mensagens
                            nome="Camile Oliveira"
                            mensagem="Estou interessada em adotar a Dolores!"
                            data="19/04/2025 - 13:20"
                            imgSrc="/camile.svg"
                        />
                    </>
                )}
            </div>
        </div>
    );
}