import "../components.css";
import normal from "/noInterest.svg";
import heart from "/heartMessage.svg";

const srcImgs = {
    normal: normal,
    heart: heart
};

export default function SemMensagensdeInteressados({mensagem, icon, titulo}) {

    const image = srcImgs[icon];

    return(
        <div className="noMessages">
            <img src={image} alt="" />

            <div>
                <h1>{titulo || "Oops!"}</h1>
                <p>{mensagem}</p>
            </div>
        </div>
    );
}