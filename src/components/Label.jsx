import React from 'react';

function Label({type = 'default', children}) {
    return (
        <div className={`label ${type}`}>{children}</div>
    )
}

export default Label;