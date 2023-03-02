import React from 'react'

const Bitcomer = () => {
    return (
        <div className=" ">
            <div className="flex flex-col justify-center items-center py-12 text-center lg:w-bitcomer w-80 m-auto px-4 lg:px-2">
                <h1 className="text-menu text-2xl font-semibold ">¿QUÉ ES <span className="font-black extrabold">BITCOMER?</span></h1>
                <p className="mt-10 font-semibold text-grey-bitcomer text-ms lg:text-xl">Bitcomer es una plataforma para comprar o vender Bitcoins y Usdt fácilmente, de forma
                    <span className="text-bitcomerBlue"> SEGURA </span>
                    y <span className="text-bitcomerBlue">RÁPIDA.</span>
                </p>
                <button
                    className="lg:w-3/6 w-9/12 h-11 rounded-full text-white bg-menu mt-12 font-semibold"
                >Comenzar
                </button>
            </div>
        </div>
    )
}

export default Bitcomer