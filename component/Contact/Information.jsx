import React from 'react'
import Contacts from './Contacts'

const Information = () => {
    return (
        <div className='flex px-6 md:space-x-16 justify-end items-center '>
            <div className='space-y-6'>
                <h2 className='text-[25px] text-black '>Información
                    de contacto
                </h2>
                <p className='text-[#747474] text-[14px] max-w-[200px]'>
                    Tu opinión es importante para nosotros, si tienes dudas de nuestros cursos ¡Escríbenos!
                </p>
                <Contacts />
            </div>
            <div>
                <img
                    src='../image/contact/oso.png'
                    className='transform translate-x-6 translate-y-6 md:-translate-y-0 md:translate-x-0 md:h-[300px] block md:hidden'
                />
                <img
                    src='../image/contact/oso2.png'
                    className='transform translate-x-6 translate-y-6 md:-translate-y-0 md:translate-x-0 md:h-[300px] hidden md:block'
                />
            </div>

        </div>
    )
}

export default Information
