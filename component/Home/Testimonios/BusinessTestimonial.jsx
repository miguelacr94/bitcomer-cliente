import React from 'react'
import { Icons } from '../../../utils/icons'
import CardBursinesTestimonial from './CardBursinesTestimonial'

export const BusinessTestimonial = () => {
    return (
        <div className="w-full lg:mb-6  lg:h-5/6  lg:min-h-containerTestimonial bg-grey-testimonial flex justify-center items-center">
            <div className="h-4/6 flex flex-col lg:flex-row  w-full">
                <div className="text-2xl text-menu font-black lg:w-4/12 lg:mt-0 mt-12 flex justify-center items-center text-center ">
                    <h1 className="w-44 ">TESTIMONIOS EMPRESARIALES</h1>
                </div>
                <div className="w-/12 lg:h-containerTestimonial  flex flex-col lg:flex-row justify-start items-center px-8 py-4">
                    <CardBursinesTestimonial />
                    
                </div>

            </div>
        </div>
    )
}
