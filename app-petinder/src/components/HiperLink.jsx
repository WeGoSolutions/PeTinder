function HiperLink(props) {
    const linkStyle = {
        textDecoration: props.haveDecoration ? "underline" : "none",
    };

    return (
        <>
            <a href={props.href} style={linkStyle}>
                {props.label}
            </a>
        </>
    );
}

export default HiperLink;