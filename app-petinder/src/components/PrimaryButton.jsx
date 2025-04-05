import "./components.css";

function NavBar(props) {
    return (
        <button type={props.type} className="primary-button">{props.text}</button>
    )
}

export default NavBar;