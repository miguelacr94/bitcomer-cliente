import React from 'react'
import { useState } from 'react'
import MainLayout from '../component/Layouts/MainLayout'
import { CardReferredTotal } from '../component/Referer/CardReferredTotal'
import PaymentHistory from '../component/Referer/PaymentHistory'
import PaymentTable from '../component/Referer/PaymentTable'
import RefererTable from '../component/Referer/RefererTable'
import ReferredCopy from '../component/Referer/ReferredCopy'

const referer = () => {
    const [step, setStep] = useState('referred');

    return (
        <MainLayout>

            <div className='mt-8 px-8'>

                <div className='w-[600px] grid grid-cols-2 gap-4'>
                    <CardReferredTotal />
                    <ReferredCopy />
                </div>

                <div className='grid grid-cols-3 w-4/6 border rounded-lg overflow-hidden max-h-12 mt-4'>
                    <div onClick={() => setStep('referred')} className={`${step == 'referred' ? 'bg-menu text-white' : 'bg-white text-meu'} text-center  h-full p-4 cursor-pointer`}>
                        <span>Ver mis referidos</span>
                    </div>
                    <div onClick={() => setStep('ReferredPayment')} className={`${step == 'ReferredPayment' ? 'bg-menu text-white' : 'bg-white text-meu'} text-center p-4 cursor-pointer`}>
                        <span>Ver referidos pagados</span>
                    </div>
                    <div onClick={() => setStep('payment')} className={`${step == 'payment' ? 'bg-menu text-white' : 'bg-white text-meu'} text-center p-4 cursor-pointer`}>
                        <span>Ver historial de pago</span>
                    </div>
                </div>
                {step === 'referred' ?
                    <RefererTable />
                    : step === 'ReferredPayment' ?
                        <PaymentTable />
                        : <PaymentHistory />
                }

            </div>

        </MainLayout>
    )
}

export default referer
