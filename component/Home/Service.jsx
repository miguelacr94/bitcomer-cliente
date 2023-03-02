import React from 'react'

const Service = () => {

    const services = [
        {
            icon: '../icon/services/service1.png',
            text: 'Compra o venta rápida y segura'
        },
        {
            icon: '../icon/services/service2.png',
            text: 'Experiencia de más de 6 años en el mercado Cripto'
        },
        {
            icon: '../icon/services/service3.png',
            text: 'Experiencia de más de 6 años en el mercado Cripto'
        }
    ]

    return (
        <div className='w-10/12  m-auto p-14 bg-[#FAFAFA] md:mt-24 mt-16 rounded-lg'>
            <h1 className='text-center text-[#272727] text-[30px] font-normal'>TE MERECES ESTE EXCELENTE SERVICIO</h1>
            <div className='grid md:grid-cols-3 grid-cols-1 mt-12 space-y-8 md:space-y-0'>
                {services.map((s, index) => {
                    return (
                        <div key={index} className='md:w-[240px] flex flex-col justify-center items-center space-y-2'>
                            <img
                                src={s?.icon}
                                className='max-w-[200px]'
                            />
                            <span className='text-[#747474] text-center'>{s?.text}</span>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export default Service
