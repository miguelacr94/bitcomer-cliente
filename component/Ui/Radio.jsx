import React from 'react'
import style from '../../styles/Radio.module.css'

const Radio = ({
    label,
    name,
    onChange,
    id,
    selected = false,
    className = "",
    required = false,
    onClick,
}) => {

    return (
        < div className="flex items-center justify-start relative space-x-4 cursor-pointer" >




            <div
                className={` icon-check flex  justify-center items-center bg-loginInput `}
                onClick={onClick}
                style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                }}
            >

                {
                    selected && (
                        <div className="bg-white w-2 h-2 rounded-full"></div>
                    )
                }
                {/* <input

                            name={name}
                            type="radio"
                            className={`bg-grey w-2 absolute   ${style.input_radio} `}
                            id={id}
                            onChange={onChange}
                            required={required}
                        /> */}

            </div>


            <label
                // style={{ marginLeft: selected ? "5px" : "25px" }}
                htmlFor={id}
                className={`select-none font-light  ${className}`}
            >
                {label}
            </label>
        </div >
    )
}

export default Radio
