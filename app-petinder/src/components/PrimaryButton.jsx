import "./components.css";

function PrimaryButton(props) {
    return (
        <button type={props.type} className="primary-button">{props.text}</button>
    )
}

export default PrimaryButton;