import React from 'react'
import ServiceCard from './ServiceCard'

const Service = () => {
    return (
        <div className="w-full  lg:h-smallWindows lg:minScreen bg-menu flex flex-col items-center justify-end text-white  pb-6 lg:pb-16">
            <h2 className="text-2xl font-black lg:mt-20 mt-6 w-64 lg:w-3/6 text-center">
                TE MERECES ESTE EXCELENTE SERVICIO
            </h2>

            <div className="w-full lg:h-4/6 lg:mt-12 mt-6 flex justify-center px-8 ">
                <ServiceCard />
            </div>

        </div>
    )
}

export default Service