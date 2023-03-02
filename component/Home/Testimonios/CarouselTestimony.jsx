import React, { useEffect, useRef, useState } from 'react'
import { testimony } from '../../../utils/data'
import Carousel from "react-elastic-carousel";
import { carouselBreakPoints } from '../../../utils/helpers';
import styles from '../../../styles/carousel1.module.css'
import { Icons } from '../../../utils/icons';

const CarouselTestimony = () => {
    const carousel = useRef(null);
    const [screeN, setScreen] = useState(true);

    useEffect(() => {
        if (screen.width < 700) {
            setScreen(false)
        }
    }, [screen])




    return (
        < div className="w-96 lg:w-10/12 flex justify-center items-center mt-10 lg:mt-16 lg:h-containerTestimony lg:mb-0 lg:mb-12">


            <button onClick={() => carousel.current.slidePrev()} className="text-white  hidden lg:block text-4xl">{Icons.LeftArrow}</button>

            <Carousel className={''} breakPoints={carouselBreakPoints} showArrows={false} ref={carousel}>
                {testimony.map((t, i) => {
                    return (
                        < div key={i} className="w-11/12 lg:w-9/12 h-testimonioM lg:h-testimonio bg-white 
                         rounded-md flex flex-col lg:flex-row 
                         text-textP lg:p-0  justify-start items-center lg:mb-0 mb-2">
                            <div className="lg:w-2/6  mt-8 flex justify-center items-center relative mb-0 ">

                                <img
                                    src="./image/comillas.png"
                                    className="absolute z-10 mt-56 w-14 h-32"

                                />
                                <img
                                    className="w-44 h-44 rounded-full  "
                                    src={t.image}
                                />

                            </div>
                            <div className="lg:w-4/6 w-full mt-6 flex flex-col justify-center 
                            lg:items-start items-center lg:mt-0  lg:pl-10 ">
                                <div className="flex flex-col justify-start lg:items-start items-center w-10/12 lg:w-5/6 w-full
                                lg:text-start text-center
                                ">
                                    <p className="text-ms font-medium h-36">{t.testimony}</p>
                                    <div className="flex space-x-4 mt-8 items-center">
                                        <img
                                            className="lg:w-6  lg:h-6  w-10 h-10 rounded-full"
                                            src={t.flat}
                                        />
                                        <p className="text-sm lg:text-md font-semibold text-black" >{t.name}</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    )
                })

                }
            </Carousel>
            <button onClick={() => carousel.current.slideNext()} className="text-white  hidden lg:block text-4xl">{Icons.RigthArrow}</button>
        </div>
    )
}

export default CarouselTestimony