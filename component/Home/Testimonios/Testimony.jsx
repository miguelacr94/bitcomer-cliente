import React from 'react'
import CarouselTestimony from './CarouselTestimony'

const Testimony = () => {
    return (
        <div className="w-full   bg-menu lg:pt-24 pt-8 flex flex-col items-center">
            <h1 className="text-2xl font-black  text-white text-center " >TESTIMONIOS DE NUESTROS USUARIOS</h1>

            <CarouselTestimony />
        </div>
    )
}

export default Testimony