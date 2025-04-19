import { useRef } from "react";
import "./components.css";
import { useEffect } from "react";

export default function InsertCode({ length = 6, onComplete, reset }) {
    const inputs = Array.from({ length });
    const refs = useRef([]);

    useEffect(() => {
        refs.current.forEach(ref => {
            if (ref) ref.value = "";
        });
    }, [reset]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            if (index < length - 1) {
                refs.current[index + 1].focus();
            }
        } else {
            e.target.value = "";
        }

        const code = refs.current.map(ref => ref.value).join("");
        
        if (code.length === length && onComplete) {
            onComplete(code);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            refs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
        pasteData.split("").forEach((char, i) => {
            if (i < length) {
                refs.current[i].value = char;
                if (i < length - 1) {
                    refs.current[i + 1].focus();
                }
            }
        });

        const code = refs.current.map(ref => ref.value).join("");
        if (code.length === length && onComplete) {
            onComplete(code);
        }
    };

    return (
        <div className="codeContainer">
            {inputs.map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="codeInput"
                    ref={el => refs.current[index] = el}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                />
            ))}
        </div>
    );
}
