import "../../../components/components.css";
import { MdPermPhoneMsg } from "react-icons/md";
import Mensagens from "../../../components/ong/Mensagens";

export default function Interessados() {
    return (
        <div className="containerFull">
            <h1>Últimos interessados</h1>

            <div className="englobe">
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
            </div>
        </div>
    );
}