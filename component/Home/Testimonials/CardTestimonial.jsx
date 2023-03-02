import React, { useRef } from 'react'
import ReactElasticCarousel from 'react-elastic-carousel'
import { testimony } from '../../../utils/data'
import { Icons } from '../../../utils/icons'

const CardTestimonial = () => {
    const carousel = useRef(null);
    return (
        <>
            <ReactElasticCarousel showArrows={false} ref={carousel} >
                {testimony.map((t, index) => {
                    return (

                        <div key={index} className='w-full '>
                            <div className='w-full flex md:flex-row flex-col-reverse md:max-h- min-h-64 md:h-auto
                            shadow-lg md:shadow-none rounded-lg md:rounded-none border  md:border-none
                            p-8
                            '>
                                <div className='md:w-2/6 w-full flex items-center justify-center md:justify-start'>
                                    <div className='flex md:flex-col justify-center items-center mt-8 md:mt-0 space-x-2'>
                                        <img
                                            src={t.image}
                                            className='md:max-w-24 md:max-h-24 max-w-12 max-h-12'
                                        />
                                        <div className=' flex md:flex-row flex-col space-x-2 items-center justify-center '>
                                            <span>{t.name}</span>

                                            <div className='md:w-8 md:h-8 w-5 h-5 rounded-full overflow-hidden'>
                                                <img
                                                    src={t.flat}
                                                    className='h-full w-full'
                                                />
                                            </div>

                                        </div>


                                    </div>
                                </div>
                                <div className='md:w-4/6 w-full md:p-8 min-h-64 pt-4'>
                                    <div className=' md:rounded-lg md:p-20 w-full md:shadow-lg overflow-visible'>
                                        <i></i>
                                        <p className='text-center md:text-start text-[#747474] text-[14px]'>{t.testimony}</p>
                                        <i></i>
                                        <div className='hidden md:block'>
                                            <div className='  transform translate-y-8 z-10  w-24 h-8 border
                                         absolute rounded-xl text-menu text-12 space-x-6 flex justify-center items-center'>
                                                <button onClick={() => carousel.current.slidePrev()}>{Icons.LeftArrow}</button>
                                                <button onClick={() => carousel.current.slideNext()} > {Icons.RigthArrow}</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    )
                })

                }
            </ReactElasticCarousel>
        </>

    )
}

export default CardTestimonial
