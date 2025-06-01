import "./components.css";

const tagColors = {
    "Ativo":      { border: "#C04646", color: "#C04646", background: "#EDA2A2" },
    "Calmo":      { border: "#6578B7", color: "#6578B7", background: "#AFD2FF" },
    "Brincalhão": { border: "#C18E00", color: "#C18E00", background: "#FFDA9F" },
    "Carinhoso":  { border: "#E24476", color: "#E24476", background: "#FFAFAF" },
    "Sociável":   { border: "#92B765", color: "#92B765", background: "#DEFFAF" },
    "Protetor":   { border: "#783E00", color: "#783E00", background: "#FFC280" },
    "Independente": { border: "#00A8BB", color: "#00A8BB", background: "#CBFAFF" },
    "Curioso":    { border: "#D56E00", color: "#D56E00", background: "#FFC485" },
    "Medroso":    { border: "#5B4680", color: "#5B4680", background: "#E2C0FF" },
    "Territorial":{ border: "#92375D", color: "#92375D", background: "#FFA2C9" },
    "Obediente":  { border: "#0577D4", color: "#0577D4", background: "#9FD4FF" },
    "Teimoso":    { border: "#016401", color: "#016401", background: "#C5FFC5" }
};

function Tag(props) {
    const isDisabled = props.isDisabled;

    const style = {
        ...(isDisabled
            ? {
                border: "4px solid #979797",
                color: "#979797",
                background: "#EDEDED"
            }
            : tagColors[props.tagName]
                ? {
                    border: `4px solid ${tagColors[props.tagName].border}`,
                    color: tagColors[props.tagName].color,
                    background: tagColors[props.tagName].background
                }
                : {}),
        cursor: props.cursor || "default"
    };

    return (
        <div className="containerTag" style={style} onClick={props.onClick}>
            <p>{props.tagName}</p>
        </div>
    );
}

export default Tag;