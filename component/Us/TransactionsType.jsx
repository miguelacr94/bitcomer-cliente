import React from 'react'

const TransactionsType = ({ title, icon, text, className }) => {
    return (
        <div className={`${className} w-full bg-[#FAFAFA] p-4 md:p-8 space-y-4`}>
            <div className='flex items-center justify-start space-x-2'>
                <h2 className='text-black text-[25px]'>{title}</h2>
                <p className='text-2xl'>{icon}</p>
            </div>
            <p className='text-start text-[14px] text-[#747474] leading-5'>
                {text}
            </p>
        </div>
    )
}

export default TransactionsType
