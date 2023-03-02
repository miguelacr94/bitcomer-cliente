import React from 'react'
import StepPurchase from './StepPurchase'
import StepSale from './StepSale'

const Steps = () => {
    return (
        <div className='md:w-10/12 w-full m-auto md:pt-24 pt-12 md:space-y-24 space-y-16 px-4 md:px-0'>
            <StepPurchase />
            <StepSale />
        </div>
    )
}

export default Steps
