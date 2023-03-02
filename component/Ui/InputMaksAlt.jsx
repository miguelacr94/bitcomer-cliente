import React from 'react'
import InputMask from 'react-input-mask';

const InputMaksAlt = ({ className,
    id,
    placeholder,
    onChange,
    type,
    label,
    value,
    defaultValue,
    border,
    errors,
    hint,
    control,
    register,
    name,
    readonly,
    required,
    onKeyup,
    colorLabel,
    max,
    mask,
    formatChars,
    signo,mt }) => {
    return (
        <div className={`  flex 
    flex-col  justify-start items-start   w-full  rounded-xl p-2  ${mt}`}>

            <label className={`font-medium text-md ml-4 ${colorLabel}`}>{label}</label>


            <InputMask
                id={id}

                type={type}
                name={name}
                onChange={onChange}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={`w-full h-9 rounded-full pl-4  ${className}`}
                // onClick={() => setFocus(1)}
                // onBlur={() => setFocus(0)}
                mask={mask}
                formatChars={formatChars}
                maskChar={''}
                control={control}
            ></InputMask>
            <p className="text-terminos   text-red-400 text-start w-72 ml-4 mt-2 ">{hint}</p>
        </div>
    )
}

export default InputMaksAlt