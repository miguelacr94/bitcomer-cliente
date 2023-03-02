import React, { useEffect, useState } from 'react'
import { capitalizer } from '../../utils/helpers';
import { Icons } from '../../utils/icons'

const Select2 = ({
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
    px
}) => {


    const [show, setShow] = useState(false);


    useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            } else if (event?.target?.id !== id) {
                setTimeout(() => {
                    setShow(false);
                }, 100);
            }
        });

    });

    return (
        <div className="relative w-full lg:cursor-pointer outline-none" >
            <div id={id} className="">
                <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
                <div id={id} onClick={() => setShow(true)} 
                className={`${className} ${errors ? 'border-red-300' : 'border-[#a3a3a3ad]'}  
                 pl-4 h-11  border flex justify-center items-center pr-2 rounded-md`}>
                    {icon &&
                        <img
                            className="w-4 h-4"
                            src={icon}
                        />
                    }

                    <p
                        id={id}
                        className="pl-1 ml-1  w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-md  text-gray-500 font-light"
                    >{value ? capitalizer(value) : placeholder}</p>




                    <input
                        id={id}
                        className="pl-3 hidden w-full outline-none bg-transparent placeholder:text-xs placeholder:text-grey text-xs text-blackText"
                        placeholder={placeholder}
                        readonly="readonly"
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                    />
                    <i className="text-grey-arrow">{Icons.DownArrow}</i>
                </div>
                <p className='text-xs text-red-400 ml-2 absolute'>{hint}</p>
            </div>
            {
                show &&

                <div className={`${width}   transition-bottom duration-1000 ease-in-out  bg-white absolute z-10  max-h-64 overflow-auto rounded-lg shadow-2xl transition ease-in-out duration-300  px-${px} `}>

                    {


                        (items && items.map((e, i) => {
                            return (

                                <div onClick={() => onChange(e)} key={i} className="hover:bg-Option rounded-md cursor-pointer  w-full flex justify-start items-center px-2"  >
                                    <a
                                        type="button"

                                        className="flex  h-8  items-center justify-start  text-sm text-black font-semibold space-x-2 px-2"
                                    >
                                        {
                                            e?.image && <img
                                                src={e.image}
                                                className="W-4 h-4"
                                            />
                                        }
                                        <p className="mt-1">{e && capitalizer(e.name || e)}</p>
                                    </a>
                                </div>

                            );
                        })

                        )}




                </div>


            }
        </div >

    )
}

export default Select2