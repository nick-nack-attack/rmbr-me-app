import { useState } from 'react';

export const useInputChange = (defaults = {}) => {
    const [input, setInput] = useState(defaults);
    const handleInputChange = e => {
        if (e.currentTarget.type === 'checkbox') {
            setInput({
                ...input,
                [e.currentTarget.name]: e.currentTarget.checked
            });
        } else {
            setInput({
                ...input,
                [e.currentTarget.name]: e.currentTarget.value
            });
        }
    };
    return (
        [input, handleInputChange]
    );
};