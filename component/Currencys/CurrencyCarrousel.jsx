import React, { useContext, useRef } from 'react'
import Carousel from "react-elastic-carousel";
import { Context } from '../../provider/user/context';
import { currencys } from '../../utils/data';
import { carouselBreakPoints3 } from '../../utils/helpers';
import { Icons } from '../../utils/icons';



const CurrencyCarrousel = () => {

    const { currency, setCurrency } = useContext(Context);

    const carousel = useRef(null);

    return (
        <div className="w-full mt-32 ">


            {/* <button onClick={() => carousel.current.slidePrev()}><p className="text-menu text-xl">{Icons.LeftArrow}</p></button> */}

            <div className="w-full grid grid-cols-3 place-content-center  ">
                {/* <Carousel breakPoints={carouselBreakPoints3} ref={carousel}  showArrows={false}> */}

                {currency[0]?.map((c, i) => {
                    return (
                        <div className='w-full flex justify-center items-center'>
                            <div className="w-80 h-full bg-[#222D3533] py-6 px-12 rounded-xl " key={i}>
                                <p className="text-xs text-white">{c.name}</p>
                                <p className="font-bold text-xl text-white mt-1">${c?.quote?.price.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <span>{c.currency}</span> </p>
                                <div className="flex text-xs space-x-4 font-semibold">
                                    <p className="text-currency font-bold">24H</p>
                                    <p className={`${c?.quote?.percent_change_24h >= 0 ? 'text-positive' : 'text-orangeCurrency'} `}>{c?.quote?.percent_change_24h.toFixed(1)}%</p>
                                    <p className="text-currency font-bold">7D</p>

                                    <p className={`${c?.quote?.percent_change_7d >= 0 ? 'text-positive' : 'text-orangeCurrency'}  `}> {c?.quote?.percent_change_7d.toFixed(1)}%</p>
                                </div>

                            </div>
                        </div>
                    )
                })

                }




                {/* </Carousel> */}
            </div>
            {/* <button onClick={() => carousel.current.slideNext()} className="" ><p className="text-menu text-xl">{Icons.RigthArrow}</p></button> */}
        </div >
    )
}

export default CurrencyCarrousel