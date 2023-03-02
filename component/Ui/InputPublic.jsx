import React from 'react'
import ReactInputMask from 'react-input-mask'

const InputPublic = ({
    id,
    name,
    placeholder,
    onChange,
    value,
    readonly,
    register,
    control,
    error,
    hint,
    defaultValue,
    className,
    required = true,
    type

}) => {
    return (
        <div className='w-full'>
            <input
                {...register(id)}
                id={id}
                name={name}
                placeholder={placeholder}
                className={`${className} border border-[#747474] h-12 w-full pl-4 place rounded-lg bg-white text-black`}
                required={required}
                type={type}
            />
        </div>
    )
}

export default InputPublic
