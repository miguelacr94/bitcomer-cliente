import React from 'react'

const Button = ({
    text,
    className,
    onClick,
    type,
    disabled,

}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${className} text-white  text-md  `}
        >
            {text}
        </button>
    )
}

export default Button