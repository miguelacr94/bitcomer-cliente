import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

const InputAlt = ({ label, colorLabel, id, name, onChange, className, onClick, onBlur, type, register, errors, placeholder, defaultValue, value, control, hint, mt }) => {

    const [focus, setFocus] = useState(0);

    return (
        <>

            {register && (
                <>
                    <div className={`  flex 
                    flex-col  justify-start items-start   w-full  rounded-xl p-2  ${mt}`}>

                        <label className={`font-medium text-md ml-4 ${colorLabel}`}>{label}</label>

                        <Controller
                            name={name}
                            control={control}
                            defaultValue={defaultValue}
                            render={({ field: { } }) => (


                                <input
                                    {...register(id)}
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
                                    control={control}
                                />

                            )}


                        />
                        <p className="text-terminos   text-red-400 text-start w-72 ml-4 mt-2 ">{hint}</p>
                    </div>

                </>
            )}


            {/* {
                !register && (
                    <div className={` ${focus === 1 ? 'border-red-400' : ''}  flex flex-col justify-start items-start shadow-sm border focus:border-red-300 rounded-xl p-2`}>
                        <label className="font-semibold text-grey text-sm">{label}</label>
                        <input

                            id={id}
                            type={type}
                            name={name}
                            onChange={onChange}
                            value={value}
                            defaultValue={defaultValue}
                            className="w-80 h-4  outline-none text-xs mt-1 text-register"
                            onClick={() => setFocus(1)}
                            onBlur={() => setFocus(0)}
                            control={control}
                        />
                    </div>

                )
            } */}
        </>
    )
}

export default InputAlt