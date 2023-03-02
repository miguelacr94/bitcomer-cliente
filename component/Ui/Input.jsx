import React from 'react'
import { Controller } from 'react-hook-form'

const Input = ({
    className,
    id,
    placeholder,
    onChange,
    onKeyPress,
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
    autocomplete,
    pattern,
    onkeydown,
    onClick

}) => {


    return (

        <>
            {register && (
                < div className=" w-full" >
                    <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
                    <div
                        className={`${errors ? 'border-red-300' : 'border-grey-bInput'}
                          ${className} rounded-md p-2  border  flex justify-center items-center mt-1 
                        ${border ? border : ''}  `}>
                        <Controller
                            name={name}
                            control={control}
                            defaultValue={defaultValue}
                            render={({ field: { } }) => (

                                <input
                                    {...register(id
                                    )

                                    }
                                    id={id}
                                    name={name}
                                    required={required}
                                    placeholder={placeholder}
                                    type={type}
                                    className="w-full pl-2  outline-none h-full text-grey bg-transparent placeholder:text-md placeholder:text-grey-light text-md  font-light"
                                    value={value}
                                    defaultValue={defaultValue}
                                    onChange={onChange}
                                    control={control}
                                    onKeyup={onKeyup}
                                    onKeyPress={onKeyPress}
                                    readonly={readonly}
                                    maxlength={max}
                                    autocomplete={autocomplete}
                                    onkeydown={onkeydown}
                                    onClick={onClick}
                                />
                            )}


                        />
                    </div>
                    <p className='text-xs text-red-400 ml-2 absolute'>{hint}</p>
                </div >
            )}
        </>
    )
}

export default Input