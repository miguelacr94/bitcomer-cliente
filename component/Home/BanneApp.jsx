import React from 'react'
import { Icons } from '../../utils/icons'
import Image from '../Ui/Image'

const BanneApp = () => {
    return (
        <div className='bg-[#EEF2FE] w-full m-auto min-h-[500px] md:mt-24 mt-16 
        rounded-lg grid md:grid-cols-2 grid-cols-1 py-4 pb-12 px-2 md:px-0'>

            <div className='flex justify-center items-center flex-col text-white md:px-0 md:px-7'>
                <div className='md:max-w-[450px] px-4 flex flex-col justify-center items-center'>
                    <h1 className='text-[40px] font-normal pb-8 text-black text-center'>
                        Una app pensada para <span className='text-[#3075DE]'>inversionistas </span>
                        y <span className='text-[#3075DE]'> aficionados</span>
                    </h1>
                    <div className='flex justify-start items-center h-fullblock md:hidden max-h-[600px] pb-8'>
                        <img
                            src='../image/banner/rectangle.png'
                            className='h-full w-full'

                        />
                    </div>
                    <span className='flex-col justify-center items-center text-center md:text-start space-y-4 '>
                        <p className='text-lg text-[#747474]'>
                            Bitcomer es una plataforma para comprar o vender Bitcoins y Usdt fácilmente, de forma SEGURA y RÁPIDA.
                        </p>

                    </span>
                    <div className='flex space-x-4 md:space-x-6  mt-10'>
                        <button className='bg-[#3075DE] w-40 py-4 rounded-lg flex justify-center items-center space-x-2 text-white'>
                            <i className='text-2xl'>{Icons.apple}</i>
                            <span>App store</span>
                        </button>

                        <button className='bg-transparent border border-[#747474] w-40 py-4 rounded-lg flex justify-center items-center space-x-2 text-[#747474]'>
                            <i>{Icons.playStore}</i>
                            <span>Play store</span>
                        </button>


                    </div>
                </div>


            </div>

            <div className='flex justify-start items-center h-full px-24 hidden md:block'>
                <Image
                    src='../image/banner/phone.png'
                    imageContent='min-h-[500px] max-w-[400px]'
                />
            </div>

        </div>
    )
}

export default BanneApp
