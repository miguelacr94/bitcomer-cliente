import React from 'react'

const PayMethod = () => {

    const _PayMethod = [
        '../image/paymethod/pse.png',
        '../image/paymethod/visa.png',
        '../image/paymethod/mastercard.png',
        '../image/paymethod/wompi.png',
        '../image/paymethod/nequi.png',
        '../image/paymethod/qr.png'
    ];
    const _PayMethodMobile = [
        '../image/paymethod/pse.png',
        '../image/paymethod/qr.png',
        '../image/paymethod/mastercard.png',
        '../image/paymethod/wompi.png',
        '../image/paymethod/nequi.png',
        '../image/paymethod/visa.png',

    ]



    return (
        <div className='md:w-10/12 w-full m-auto md:py-20 py-16 md:space-y-16 space-y-10'>
            <h1 className='text-center md:text-[30px] text-[20px] font-normal text-black'>Nuestros Métodos de pago</h1>

            <div className='w-full hidden md:block'>
                <div className='grid grid-cols-6 gap-1  px-4 space-y-4 '>
                    {_PayMethod.map((p, index) => {
                        return (
                            <div key={index} className='flex justify-center items-center'>
                                <img
                                    src={p}
                                    className='max-w-14 max-h-12'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='grid md:grid-cols-6 grid-cols-3 gap-4  px-4  block md:hidden'>
                {_PayMethodMobile.map((p, index) => {
                    return (
                        <div key={index} className='flex justify-center items-center'>
                            <img
                                src={p}
                                className='max-w-14 max-h-12'
                            />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default PayMethod
