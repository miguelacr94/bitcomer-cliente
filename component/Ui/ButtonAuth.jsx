import React from 'react'

const ButtonAuth = ({ className, text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${className} rounded-lg h-11 px-6`} >
            {text}
        </button>
    )
}

export default ButtonAuth
