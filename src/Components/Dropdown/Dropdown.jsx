import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import "./Dropdown.css";

const Dropdown = () => {
    const options = [
        {label: 'Option 1', value: 'option1'},
        {label: 'Option 2', value: 'option2'},
    ];

    const [value, setValue] = useState(options[0].value);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="dropdown">
            
            <select value={value} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;