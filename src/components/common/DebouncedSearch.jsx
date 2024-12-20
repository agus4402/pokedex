import { useState, useEffect, useRef } from "react";

export default function DebouncedSearch({ style, id, stopTyping, ...inputProps }) {
    const [value, setValue] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            stopTyping(value);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [stopTyping, value]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <input
            id={id}
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            {...inputProps}
        />
    );
}
