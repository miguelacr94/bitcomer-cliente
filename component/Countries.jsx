import React, { useState, useEffect, useContext } from 'react'
import { Icons } from '../utils/icons'
import { Context } from '../provider/user/context'

const initialDate = {
    name: 'Colombia',
    flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1200px-Flag_of_Colombia.svg.png'
}

const Countries = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const [country, setCountry] = useState(initialDate);
    const { country, setCountry } = useContext(Context);
    const { countrySelect, setCountrySelect } = useContext(Context);
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

    const onSelectCountry = (e) => {
    localStorage.setItem('country', JSON.stringify(e))
      setCountrySelect(e)
    } 


    return (
        <div className="flex flex-col relative ">
            <div id="myMenu" onClick={() => setShowMenu(!showMenu)} className="w-12 lg:w-48   h-full flex justify-start lg:justify-center items-center text-grey h-full cursor-pointer">
                <div className="lg:h-6 lg:w-6 w-6 h-6 rounded-full  flex justify-center items-center overflow-hidden">
                    <img
                        id="myMenu"
                        src={countrySelect && countrySelect.flag}
                        className="w-full h-full"
                    />
                </div>
                <div id="myMenu" className="ml-2 hidden lg:block font-semibold text-sm w-20">{countrySelect && countrySelect.name}</div>
                <p id="myMenu" className="text-xs  h-full flex justify-center items-center mt- lg:ml-0 ml-2">{Icons.DownArrow}</p>
            </div>

            {showMenu &&
                <div className="absolute lg:mt-12 mt-16 lg:w-5/6 w-32 bg-white py-4 lg:ml-8 -ml-2 lg:px-4 rounded-md shadow-2xl transition ease-in-out duration-300">
                    {country && country.map((e, i) => {
                        return (
                            // <MenuItem key={i} href={e.path}>
                            //   {e.name}
                            // </MenuItem>
                            <div onClick={() => onSelectCountry(e)} key={i} className="hover:bg-Option hover:rounded-lg cursor-pointer  w-full flex justify-start items-center px-2"  >
                                <div className="h-6 w-6 rounded-full  flex justify-center items-center overflow-hidden">
                                    <img
                                        src={e.flag}
                                        className="w-full h-full"
                                    />
                                </div>
                                <a
                                    type="button"
                                    // href={e.path}
                                    className="flex  h-8  items-center justify-start ml-2 text-sm text-black font-semibold"
                                >
                                    {e.name}
                                </a>
                            </div>

                        );
                    })}
                </div>
            }

        </div>

    )
}

export default Countries