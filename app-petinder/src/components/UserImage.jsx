import { CgProfile } from "react-icons/cg";

function UserImage({ src, alt = "Foto do usuário", size = 180 }) {
    const wrapperStyle = {
        width: `${size}px`,
        height: `${size}px`
    };

    return (
        <div className="imageWrapper" style={{ width: size, height: size }}>
            {src ? (
                <img src={src} alt={alt} className="image" />
            ) : (
                <CgProfile className="placeholder" />
            )}
        </div>
    );
}

export default UserImage;
