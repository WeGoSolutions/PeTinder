import React, { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";

function ImageInput(props) {
    const [preview, setPreview] = useState(props.value || "");
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            if (props.onChange) props.onChange(file);
        }
    };

    React.useEffect(() => {
        if (props.value && typeof props.value === "string") setPreview(props.value);
    }, [props.value]);

    return (
        <div>
            <label className="image-upload-wrapper" htmlFor="file-input">
                {preview ? (
                    <img src={props.preview} alt="Preview" />
                ) : (
                    <FaImages size={64} />
                )}
                <input
                    id="file-input"
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}

export default ImageInput;