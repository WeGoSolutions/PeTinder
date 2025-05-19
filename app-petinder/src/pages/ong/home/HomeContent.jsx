import "../../../components/components.css";
import { MdPermPhoneMsg } from "react-icons/md";
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";
import Mensagens from "../../../components/ong/Mensagens";


export default function HomeContent() {
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
                    telefone="(11) 93204-1234"
                    email="gisele.teste@sptech.school"
                    imgSrc="/gisele.svg"
                />
            </div>

            <div className="chartContainer">
                <div className="chartLikes">
                    <h2>Pets mais curtidos:</h2>
                    <div className="chartTitle">
                        <LuChartNoAxesColumnIncreasing size={25} />
                        <p>Menor ao maior</p>
                    </div>

                    <div className="chartLikeContent">
                        Chart aqui
                    </div>
                </div>

                <div className="chartAdoptions">
                    <h2>Quantidade de pets adotados:</h2>

                    <div className="chartAdoptContent">
                        Chart aqui
                    </div>

                </div>
            </div>
        </div>
    );
}