import "./components.css";

function SecondaryButton(props) {
    return (
        <button type={props.type} className="secondary-button">{props.text} </button>
    )
}

export default SecondaryButton;