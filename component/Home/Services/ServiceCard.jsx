import React from 'react'
import { services } from '../../../utils/data'

const ServiceCard = () => {


    return (
        <div className="lg:w-card w-72   max-w-7xl flex flex-col lg:flex-row h-full space-y-4 lg:space-y-4 lg:space-x-12 justify-center  items-center  pb-service ">
            {
                services.map((s,i) => {
                    return (
                        <div key={i} className="w-full h-60 lg:h-full  bg-white rounded-md lg:p-8 p-6 flex flex-col justify-center items-center">
                            <div className="w-full h-3/6 flex justify-center items-center lg:justify-end mt-6 lg:mt-0">
                                <img
                                    src={s.imagen}
                                    className="w-4/6 lg:w-full h-6/5"
                                />
                            </div>
                            <div className="w-full h-3/6 flex justify-center items-center lg:mt-0 mt-4 lg:w-5/6 text-center ">
                                <p className="text-md text-grey-bitcomer font-semibold">{s.text}</p>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )

}

export default ServiceCard