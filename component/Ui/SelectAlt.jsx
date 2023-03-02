import React from 'react'
import { Icons } from '../../utils/icons'

const SelectAlt = ({
    id,
    className,
    items,
    placeholder,
    onChange,
    register,
    label,
    value,
    defaultValue,
    border,
    icon,
    colorLabel,
    hint,
    errors,
    width,
    px,
    mt
}) => {
    return (
        <div className={`  flex 
    flex-col  justify-start items-start   w-full  rounded-xl p-2  ${mt}`}>

            <label className={`font-medium text-md ml-4 ${colorLabel}`}>{label}</label>
            <div id={id} onClick={() => setShow(true)} className={`${className} ${errors ? 'border-red-300' : 'border-grey-bInput'} rounded-full p-2 pl-2 h-11  border border-grey-bInput flex justify-center items-center mt-1`}>
                {icon &&
                    <img
                        className="w-4 h-4"
                        src={icon}
                    />
                }

                <p
                    id={id}
                    className="pl-1 ml-1 mt-1 w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-md  text-grey-light font-light"
                >{value}</p>




                <input
                    id={id}
                    className="pl-1 hidden w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-xs text-blackText"
                    placeholder={placeholder}
                    readonly="readonly"
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                />
                <i className="text-grey-arrow">{Icons.DownArrow}</i>
            </div>
            <p className="text-terminos   text-red-400 text-start w-72 ml-4 mt-2 ">{hint}</p>
        </div>
    )
}

export default SelectAlt