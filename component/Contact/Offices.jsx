import React from 'react'
import { Country } from '../../utils/data'
import { Icons } from '../../utils/icons'

const Offices = () => {
    return (
        <div className='space-y-10 px-4 py-16 md:w-11/12 m-auto'>
            <h1 className='text-[25px] text-start 
            flex items-center space-x-2 text-[#272727] '>
                <span>{Icons.geo}</span>
                <span>Visita nuestras oficinas</span>
            </h1>
            <div className='space-y-8 md:space-y-0 grid grid-cols-1 md:grid-cols-3 '>
                {Country.map((c, index) => {
                    return (
                        <div key={index} className='text-start'>
                            <span className='flex items-center space-x-2'>
                                <h2 className='text-[#272727] text-[20px]'>
                                    {c?.name}
                                </h2>
                                <img
                                    src={c?.flat}
                                    className='w-6 h-6 rounded-full'
                                />
                            </span>

                            <span className='text-[#747474]'>
                                {c?.address}
                            </span>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export default Offices
