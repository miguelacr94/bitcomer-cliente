import React from 'react'
import CurrencyCarouselMobile from '../Currencys/CurrencyCarouselMobile'
import CurrencyCarrousel from '../Currencys/CurrencyCarrousel'
import Image from '../Ui/Image'

const Banner = () => {
    return (
        <div className='fondoBanner max-w-screen pb-12'>
            <div className='w-full  grid md:grid-cols-2 grid-cols-1  text-white md:p-24 md:gap-24'>
                <div className='min-h-[500px] flex justify-center items-center flex-col mt-10 md:mt-0 '>
                    <div className='md:max-w-[450px] px-6'>
                        <h1 className='md:text-[40px] text-[35px]  font-normal pb-8'>
                            El mayor mercado de criptomonedas en sudamérica
                        </h1>
                        <span className='flex-col space-y-4 md:text-start text-center'>
                            <p>
                                Compra Bitcoins, Ether y más criptomonedas
                                en Colombia, El Salvador y Panamá
                            </p>
                            <p>
                                El sitio más seguro y conveniente para comprar y
                                vender bitcoins, ethereum y otras criptomonedas.
                            </p>
                        </span>
                        <div className='md:block hidden space-x-6 mt-12 w-full flex justify-center'>

                            <button
                                onClick={''}
                                className={`rounded-lg h-11 px-6 bg-white text-black max-w-[120px]`} >
                                Compra
                            </button>
                            <button
                                onClick={''}
                                className={`rounded-lg h-11 px-6 border-2 border-white max-w-[120px]`} >
                                Venta
                            </button>

                        </div>
                    </div>



                </div>
                <div className='flex justify-center items-center mx:px-0 px-8 md:mt-0 -mt-12'>
                    <Image
                        src='../image/banner/1.png'
                        imageContent='max-h-[400px]'
                    />
                </div>
                <div className='block md:hidden space-x-6 mt-12 w-full flex justify-center'>

                    <button
                        onClick={''}
                        className={`rounded-lg h-11 px-6 bg-white text-black max-w-[120px]`} >
                        Compra
                    </button>
                    <button
                        onClick={''}
                        className={`rounded-lg h-11 px-6 border-2 border-white max-w-[120px]`} >
                        Venta
                    </button>

                </div>
            </div>

            <div className='hidden md:block -mt-16'>
                <CurrencyCarrousel />
            </div>
            <div className='block md:hidden'>
                <CurrencyCarouselMobile />
            </div>
        </div>
    )
}

export default Banner
