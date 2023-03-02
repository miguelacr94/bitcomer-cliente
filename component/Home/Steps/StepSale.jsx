import React from 'react'

const StepSale = () => {

    const step = [
        {
            icon: '../icon/step1.png',
            text: 'Haz tu pedido'
        },
        {
            icon: '../icon/group.png',
            text: 'Envía las criptos acordadas.'

        },
        {
            icon: '../icon/frame2.png',
            text: 'Recibes tu transferencia o dinero en efectivo.'
        }
    ]

    return (
        <div className='w-full m-auto grid md:grid-cols-2 grid-cols-1 px-2'>
            <div className='flex justify-center items-center flex-col text-white md:order-2'>
                <div className='md:max-w-[550px] w-full md:text-start text-center '>
                    <h1 className='text-[40px] font-normal text-black'>
                        3 PASOS
                    </h1>
                    <h1 className='text-[#3075DE] text-[40px] font-normal pb-8'>
                        PARA VENDER
                    </h1>
                    <span className='flex-col space-y-4'>
                        <p className='text-md text-[#747474]'>
                            Bitcomer es el mejor lugar para vender sus monedas digitales. Nunca más perderás la oportunidad de cambiar tu moneda digital a efectivo o por transferencia bancaria.                        </p>

                    </span>
                </div>
            </div>
            <div className='order-1 flex justify-center mt-8 md:mt-0 md:px-0 px-8'>
                <div className='space-y-8'>
                    {
                        step.map((s, index) => {
                            return (
                                <div key={index} className='flex justify-start items-center space-x-4  md:w-[400px] text-[#272727CC]'>
                                    <div className='flex items-center justify-center bg-[#FAFAFA] rounded-full p-4 w-12 h-12 '>
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className='flex justify-start items-center space-x-4 bg-[#FAFAFA] p-4 w-full rounded-md'>
                                        <img
                                            src={s?.icon}
                                            className='max-w-16 h-16'
                                        />
                                        <span >{s?.text}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default StepSale
