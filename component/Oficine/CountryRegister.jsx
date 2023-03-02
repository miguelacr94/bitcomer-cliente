import React, { useEffect, useState } from 'react'
import { Icons } from '../../utils/icons';

const CountryRegister = ({ listCountry, setCountrySelected, countrySelect }) => {

    const [showMenu, setShowMenu] = useState(false);
    const [filterText] = useState(null);
    const [country, setCountry] = useState();

    useEffect(() => { // función encargada de abrir el PopOver de los países y detecta si se presiona click fuera o cuando seleccione el país
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            }
            else if (event?.target?.id === 'filter') {
                return setShowMenu(true);
            }
            else if (event?.target?.id !== 'myMenu') {
                setTimeout(() => {
                    return setShowMenu(false);
                }, 100);
            }
        });
    });

    useEffect(() => { //lisa países en general
        setCountry(listCountry);
    }, [listCountry, showMenu, setShowMenu]) //reinicia el listado de países al detectar el show del menu 

    const onSelectCountry = (e) => {
        setCountrySelected(e)

    }

    const filter = (event) => {  //filtra loas países por medio de buscador 
        var text = event.target.value
        const data = listCountry
        const newData = data.filter(function (item) {
            const itemDataTitle = item.name.toUpperCase()
            const campo = itemDataTitle
            const textData = text.toUpperCase()
            return campo.indexOf(textData) > -1
        })
        setCountry(newData);
    }

    


    return (
        <div className="lg:w-auto w-11/12 relative ">

            {showMenu &&
                <div className="absolute overflow-hidden -mt-48 h-52  lg:w-96 w-full   bg-white  ml-6 rounded-md shadow-2xl transition ease-in-out duration-300 z-50">

                    <div className='flex border justify-center items-center'>
                        <input id='filter'
                            className="w-11/12 h-12 pl-3 text-sm bg-white text-grey-light"
                            placeholder='Buscar...'
                            value={filterText} onChange={(text) => filter(text)} />
                        <p className='w-1/12 text-grey-light'>{Icons.search}</p>
                    </div>


                    <div className='overflow-auto h-36 py-1'>
                        {country && country.map((e, i) => {
                            return (

                                <div className="space-y-2 px-2" key={i}>

                                    <div onClick={() => onSelectCountry(e)} className="hover:bg-Option hover:rounded-md h-12 w-full flex justify-start items-center px-2 cursor-pointer"  >
                                        <div className=" overflow-hidden h-6   w-6 min-w-6 lg:w-6 rounded-full bg-white border flex justify-center items-center overflow-hidden">
                                            <img
                                                src={e.flag}
                                                className="w-5 h-5 rounded-full"
                                            />
                                        </div>
                                        <a
                                            type="button"
                                            // href={e.path}
                                            className="flex  h-8  w-64  text-start items-center justify-start ml-2 text-sm text-black font-semibold"
                                        >
                                            {e.name}
                                        </a>
                                    </div>
                                </div>

                            );
                        })}
                        
                    </div>
                </div>


            }

            <div id="myMenu" onClick={() => setShowMenu(!showMenu)} className="bg-input  rounded-full h-8 w-full lg:w-64 px-2 py-1 flex items-center cursor-pointer">
                <div className="lg:w-5 w-5 h-5 bg-white rounded-full overflow-hidden">
                    <img
                        id="myMenu"
                        src={countrySelect && countrySelect.flag}
                        className="min-w-5 h-full"
                    />
                </div>

                <p id="myMenu" className="ml-4 text-white lg:w-40 w-48  font-medium text-sm ">
                    {countrySelect?.name}
                </p>
                <p id="myMenu" className="ml-2 text-white text-end ">
                    {Icons.DownArrow}
                </p>



            </div>


        </div>
    )
}

export default CountryRegister