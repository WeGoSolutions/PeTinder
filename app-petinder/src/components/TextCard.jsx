import "./components.css";

function TextCard() {
    return (
        <div className="textCard">
            <h1>Conheça o PeTinder</h1>
            <p>Encontrar um novo melhor amigo nunca foi tão fácil! Conheça o PeTinder, 
                o aplicativo que <span>conecta pets </span>à espera de um lar com <span> pessoas prontas para adotar</span>. 
                Com uma interface simples e intuitiva, o PeTinder permite que você encontre o pet perfeito com 
                apenas <span>um swipe de distância!</span></p>

            <p>Navegue pelos perfis de cães, gatos e outros animais resgatados, 
                <span> veja fotos e conheça suas histórias</span>, quando encontrar aquele que faz seu coração bater mais forte,
                entre em contato direto com o abrigo ou protetor responsável para saber mais e <span>iniciar o processo de adoção.</span></p>
        </div>
    )
}

export default TextCard;