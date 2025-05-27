function HiperLink(props) {
    const linkStyle = {
        textDecoration: props.haveDecoration ? "underline" : "none",
    };

    return (
        <a
            href={props.href}
            style={linkStyle}
            {...(props.target ? { target: props.target } : {})}
            {...(props.rel ? { rel: props.rel } : {})}
        >
            {props.label}
        </a>
    );
}

export default HiperLink;