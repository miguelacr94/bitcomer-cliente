import React, { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form';
import { Icons } from '../../utils/icons'

const Select = ({
    id,
    className,
    items,
    placeholder,
    onChange,
    register,
    label,
    value,
    name,
    defaultValue,
    border,
    icon,
    colorLabel,
    hint,
    errors,
    width,
    px,
    search,
    required = true,
    error

}) => {

    const [show, setShow] = useState(false);
    const [itemState, setItem] = useState(null);
    const ref = useRef(null);
    const [filterText] = useState(null);
    const [country, setCountry] = useState();

    useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            }
            else if (event?.target?.id === 'filter') {
                return setShow(true);
            }
            else if (event?.target?.id !== id) {
                setTimeout(() => {
                    setShow(false);
                }, 100);
            }
        });
    });

    useEffect(() => {
        setItem(items)
    }, [items])


    const filter = (event) => {  //filtra loas países por medio de buscador 
        var text = event.target.value
        const data = items
        const newData = data.filter(function (item) {
            const itemDataTitle = item.toUpperCase()
            const campo = itemDataTitle
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })
        setItem(newData);

    }

    return (
        <div className='w-full'>
           <label className={`text-md font-semibold ${colorLabel} `}>{label}</label>
            <input
                {...register(id)}
                id={id}
                name={name}
                placeholder={placeholder}
                className={`${className} border placeholder:text-grey-light border-grey-bInput h-12 w-full pl-4 rounded-lg  overflow-auto bg-white text-black`}
                onClick={() => setShow(true)}
                readOnly={true}
                required={required}

            />
            {show &&
                <div className='max-h-32 min-w-[100px] overflow-y-auto flex flex-col rounded-lg shadow-2xl p-2 absolute bg-white'>
                    {items && items.map((item, index) => {
                        return (
                            <a
                                onClick={() => onChange(item)}
                                key={index}
                                className='py-1 text-gray-600 capitalize'
                            >{item}

                            </a>
                        )
                    })
                    }
                </div>

            }

            {error && < span className='text-red-400 text-xs' >Por favor elija una opción</span>}

        </div >
    )
}

export default Select