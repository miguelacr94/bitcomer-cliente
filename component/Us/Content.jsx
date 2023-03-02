import React from 'react'

const Content = ({ text, image, className, title, order, orderText }) => {
    return (
        <div className={`${className} w-full space-y-4 grid grid-cols-1 md:grid-cols-2`}>
            <div className={`${order} md:w-[400px] flex justify-center items-center m-auto`}>
                <img
                    src={image}
                />
            </div>
            <div className={`${orderText} space-y-3 w-full flex flex-col items-center justify-center md:justify-center md:items-start `}>
                <h2 className='text-black font-semibold text-center md:text-start text-[25px]'>{title}</h2>
                <p className='text-[#747474] text-[14px] text-center md:text-start'>{text}</p>
            </div>
        </div>
    )
}

export default Content
