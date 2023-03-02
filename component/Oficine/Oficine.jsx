import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import { getCurrency } from '../../provider/api/currency.queries'
import { getCountry } from '../../provider/api/home.queries'
import { Context } from '../../provider/user/context'

import { Icons } from '../../utils/icons'


const initialDate = {
    name: 'Colombia',
    flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1200px-Flag_of_Colombia.svg.png'
}

const Oficine = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [oficine, setOficine] = useState();
    const { country, setCountry } = useContext(Context);
    const { currency, setCurrency } = useContext(Context);
    const { countrySelect, setCountrySelect } = useContext(Context);
    const router = useRouter();


    useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            } else if (event?.target?.id !== 'myMenu') {
                setTimeout(() => {
                    setShowMenu(false);
                }, 100);
            }
        });

    });




    const getCountries = async () => {
        const data = await getCountry();
        setOficine(data?.data);
        setCountry(data?.data);
    }

    const onSelectCountry = async (e) => {
        setCountrySelect(e);
        localStorage.setItem('country', JSON.stringify(e))
        const data = await getCurrency(e?.currency);
        setCurrency([data.data]);
    }

    useEffect(() => {
        getCountries();
    }, [])



    return (
        <div className="lg:w-36  relative  w-auto  lg:ml-0 ">
            <div id="myMenu" onClick={() => setShowMenu(!showMenu)} className=" 
            lg:cursor-pointer outline-none lg:border-white rounded-full h-9 lg:w-36  hover:scale-105 py-1 space-x-2 flex items-center lg:justify-center justify-start">
                <p id="myMenu" className=" text-black font-medium text-[18px] md:hidden block ">
                    {countrySelect?.name}
                </p>
                <div className="w-6 h-6 bg-white rounded-full overflow-hidden">


                    <img
                        id="myMenu"
                        src={countrySelect && `${countrySelect?.flag}?time=${Date.now()}`}
                        className="w-full h-full"
                    />
                </div>

                <p id="myMenu" className={`ml-4 ${router?.pathname === '/' ? 'text-white' : 'text-black'}  font-medium text-[16px] hidden lg:block`}>
                    Oficinas
                </p>


                <p id="myMenu" className="ml-2 text-white hidden lg:block">
                    {Icons.DownArrow}
                </p>


            </div>

            {showMenu &&
                <div className="absolute mt-2 flex justify-center items-center 
                flex-col w-auto bg-white py-4 ml-0 rounded-md 
                shadow-2xl transition ease-in-out duration-300 z-50 ">
                    {oficine && oficine.map((e, i) => {
                        return (
                            // <MenuItem key={i} href={e.path}>
                            //   {e.name}
                            // </MenuItem>
                            <div className="space-y-2 flex justify-center items-center w-full px-2 " key={i}>

                                <div onClick={() => onSelectCountry(e)} className=" space-x-2 hover:bg-Option hover:rounded-md 
                                cursor-pointer h-12 w-full flex justify-start items-center lg:px-2 ml-0.5"  >
                                    <div className="h-6 w-6 rounded-full  flex justify-center items-center overflow-hidden ">
                                        <img
                                            src={e.flag}
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <a
                                        type="button"
                                        // href={e.path}
                                        className="flex   h-8  items-center justify-start  text-sm text-black font-semibold"
                                    >
                                        {e.name}
                                    </a>
                                </div>
                            </div>

                        );
                    })}
                </div>


            }

        </div>
    )
}

export default Oficine