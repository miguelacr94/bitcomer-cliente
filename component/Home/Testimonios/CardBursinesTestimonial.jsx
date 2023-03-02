import React from 'react'
import Carousel from "react-elastic-carousel";
import { businesTestimonial } from '../../../utils/data'
import { carouselBreakPoints2 } from '../../../utils/helpers';

const CardBursinesTestimonial = () => {
    return (
        <div className="space-x-1 flex  lg:flex-row lg:w-containerCard w-80 lg:mt-8 ">
            <Carousel className={''} breakPoints={carouselBreakPoints2}  showArrows={false}>
                {businesTestimonial.map((t,i) => {
                    return (
                        < div key={i} className=" mx-4  w-full lg:w-cardTestimonial h-testimonio2 lg:p-2 py-4 lg:h-cardTestimonial 
                              text-center lg:text-start "
                              
                              >
                            <div className="flex flex-col justify-center items-center 
                            lg:items-start shadow-lg rounded-lg bg-white px-4 h-full">
                                
                                <div className=" rounded-full lg:w-20 lg:h-20 h-30 w-30 mb-2  overflow-hidden">
                                    <img
                                        src={t.image}
                                        className="h-full w-"
                                    />
                                </div>
                                <div className="h-3/6">
                                    <p className="text-sm font-bold text-textP mt-1">{t.title}</p>
                                    <p className="text-sm font-normal text-textP mt-2">
                                        {t.testimony}
                                    </p>
                                </div>
                            
                            </div>
                        </div>

                    )
                })

                }

            </Carousel>



        </div >
    )
}

export default CardBursinesTestimonial