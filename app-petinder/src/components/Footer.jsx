import "./components.css";
import Logo from "./Logo";

function Footer() {
    return (
        <div className="footer">
            <div>
                <div className="footerLogo">
                <Logo color="#FFC0D9" scale="1.4" imgSrc="./LogoClara.svg"/>
                <div className="footerText">
                    <span>Veja nossas redes sociais!</span>
                    <div className="redesSociais">
                        <img src="./assets/Index/twitter.png" alt="" />
                        <img src="./assets/Index/instagram.png" alt="" />
                        <img src="./assets/Index/facebook.png" alt="" />
                    </div>
                </div>
                </div>
                {/* PRECISA ALTERAR PRO ENDEREÇO DA MULHER */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2874821816254!2d-46.66418892378846!3d-23.55811636147456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d2b063f663%3A0xc567c0d16d0bc582!2sS%C3%A3o%20Paulo%20Tech%20School!5e0!3m2!1spt-BR!2sbr!4v1741144649786!5m2!1spt-BR!2sbr"
                    style={{
                        border: '5px solid #D4D9EE',
                        borderRadius: '10px',
                        width: '60%',
                        height: '250px',
                        position: 'absolute',
                        marginTop: '-14%',
                        left: '35%',
                        flexShrink: 0,
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    )
}

export default Footer;