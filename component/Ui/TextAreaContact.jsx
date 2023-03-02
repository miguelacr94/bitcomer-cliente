import React from 'react'
import { Controller } from 'react-hook-form'

const TextAreaContact = ({ className,
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
    colorLabel

}) => {


    return (

        <>
            {register && (
                < div className="mt-4 w-full" >
                    <label className={`text-md font-semibold  ${colorLabel}`}>{label}</label>
                    <div
                        className={`${errors ? 'border-red-300' : 'border-grey-bInput'}
                          ${className} rounded-lg p-2.5  border  flex justify-center items-center mt-1 
                        ${border ? border : ''} `}>
                        <Controller
                            name={name}
                            control={control}
                            defaultValue={defaultValue}
                            render={({ field: { } }) => (

                                <textarea
                                    {...register(id)}
                                    id={id}
                                    name={name}
                                    required={required}
                                    placeholder={placeholder}
                                    type={type}
                                    className="w-full pl-2 outline-none bg-transparent placeholder:text-md placeholder:text-grey-light text-md
                                     text-black font-light max-h-24"
                                    value={value}
                                    defaultValue={defaultValue}
                                    onChange={onChange}
                                    control={control}
                                    onKeyup={onKeyup}

                                />
                            )}


                        />
                    </div>
                </div >
            )}
        </>
    )
}
export default TextAreaContact