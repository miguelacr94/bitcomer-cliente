import React from 'react'
import PurchaseIndication from './PurchaseIndication'
import SaleIndication from './SaleIndication'

const StepSale = () => {
    return (
        <div className="w-full lg:h-smallWindows lg:minScreen ">
            <hr className='h-line bg-grey'/>
            <section className="w-full h-full 
         bg-grey-steps 
         flex justify-center 
         items-center lg:flex-row  flex-col">
                <div className="w-5/12 flex flex-col lg:mt-0 mt-6 justify-center items-center lg:items-end px-12">

                    <div className="lg:w-stepText w-64 text-center lg:text-start">
                        <h2 className="text-xl font-semibold text-textP ">3 PASOS</h2>
                        <h1 className="text-2xl font-black text-textP">PARA VENDER</h1>

                        <p className="text-textP font-semibold w-full mt-8 ">
                            Bitcomer es el mejor lugar para vender sus monedas digitales. Nunca más perderás la oportunidad de cambiar tu moneda digital a efectivo o por transferencia bancaria.
                        </p>
                    </div>


                </div>
                <div className="w-7/12 flex items-center lg:justify-start justify-center lg:items-start ">
                    <SaleIndication />
                </div>
            </section>
        </div>
    )
}

export default StepSale