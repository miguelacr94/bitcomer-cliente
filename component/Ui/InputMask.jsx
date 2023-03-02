import React from 'react'
import InputMask from 'react-input-mask';

const InputMaskUi = (
    {
        className,
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
        signo,
        onClick

    }
) => {
    return (
        <>

            < div className=" w-full" >
                <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
                <div
                    className={`${errors ? 'border-red-300' : 'border-grey-bInput'}
                      ${className} p-2 h-11 border  flex justify-start items-start mt-1  rounded-md
                    ${border ? border : ''} relative`}>
                    <p className="text-grey-light ml-3 absolute left-0">{signo}</p>
                    <InputMask
                        id={id}
                        name={name}
                        mask={mask}
                        value={value}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={`w-full ${signo ? 'pl-4' : 'pl-2'} 
                        outline-none bg-transparent placeholder:text-md  placeholder:text-gray-400 text-md text-grey font-light`}
                        // value={props.value}
                        // onChange={}
                        readonly={readonly}
                        formatChars={formatChars}
                        maskChar={''}
                        onClick={onClick}
                        maxLength={max}
                        max={max}
                    >
                    </InputMask>

                </div>
                <p className='text-xs text-red-400 ml-2 absolute'>{hint}</p>
            </div >

        </>


    )
}

export default InputMaskUi