import React from 'react';

function Button({onClick}) {
    return (
        <button className="button" onClick={onClick}>
            Validate
        </button>
    )
}
export default Button;