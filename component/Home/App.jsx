import React from 'react'
import ButtonApp from './ButtonApp'

const App = () => {
    return (
        <div className="w-full lg:h-windows lg:min-h-screen imgApp flex flex-col lg:flex-row justify-center items-center lg:mt-0 mt-8">
            <div className=" w-72 lg:w-3/6 h-full flex flex-col justify-center  lg:items-end lg:pr-12 items-center">

                <div className="lg:w-textApp w-full  text-center lg:text-start flex flex-col justify-center items-center">
                    <h1 className="text-bitcomerBlue lg:text-menu  text-xl lg:text-3xl font-black ">
                        UNA APP PENSADA PARA INVERSIONISTAS Y AFICIONADOS.
                    </h1>

                    <p className="text-grey-bitcomer
                    text-center lg:text-start text-md lg:text-xl 
                    font-bold lg:text-start mt-8
                     lg:w-11/12 w-64 ">

                        Revisa tu dinero en cualquier lugar,
                        en cualquier momento. Visualiza tus saldos de criptomonedas.
                    </p>

                    <ButtonApp />

                </div>

            </div>
            <div className="lg:w-3/6 w-80 h-containerPhone overflow-hidden lg:h-full mt-8 lg:mt-0  flex justify-center items-center">
                <div className="lg:w-3/6 lg:h-5/6 ">
                    <img
                       src='./image/mobile.png'
                        className="w-19/12  h-phone lg:h-full lg:mt-0 mt-60"
                    />
                </div>


            </div>
        </div>
    )
}

export default App