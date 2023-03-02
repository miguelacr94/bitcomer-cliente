import React from 'react'
import Image from '../Ui/Image'

const Banner2 = () => {
    return (
        <div className='bg-[#3075DE] md:w-11/12 w-full m-auto min-h-[500px] md:mt-24 mt-4 md:rounded-lg grid md:grid-cols-2 grid-cols-1 py-4'>

            <div className='flex justify-center items-center flex-col text-white'>
                <div className='md:max-w-[450px] w-10/12 md:w-full mt-10 md:mt-0 flex flex-col 
                justify-center items-center md:justify-start md:items-start'>
                    <h1 className='md:text-[40px] text-[35px] font-normal pb-8 text-center'>
                        ¿QUÉ ES BITCOMER?
                    </h1>
                    <span className='flex-col space-y-4 '>
                        <p className='text-lg'>
                            Bitcomer es una plataforma para comprar o vender Bitcoins y Usdt fácilmente, de forma SEGURA y RÁPIDA.
                        </p>

                    </span>
                    <button className='rounded-lg text-black bg-white px-6 h-12 mt-8 '>
                        Comenzar
                    </button>
                </div>


            </div>

            <div className='flex justify-center items-center h-full md:mt-0 mt-12 px-4 pb-16'>
                <Image
                    src='../image/banner/Crypto.png'
                    imageContent='md:max-h-[500px] md:max-w-[500px]'
                />
            </div>

        </div>
    )
}

export default Banner2
