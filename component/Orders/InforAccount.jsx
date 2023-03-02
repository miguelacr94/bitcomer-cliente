import React from 'react'

const InforAccount = ({ countrySelect }) => {
    return (
        <div className="w-full flex flex-col lg:flex-row space-x-2 mt-4 pb-4 pt-4 items-center">
            <div className="w-full lg:w-5/12 border h-36 flex justify-center">
                <img
                    src={countrySelect?.accounts[0]?.image}
                    className="w-auto h-full"
                />
            </div>
            <div className="w-full lg:mt-0 mt-4 lg:w-7/12 flex flex-col justify-start items-start space-y-2">
                {countrySelect?.accounts[0]?.userName &&
                    < div className="w-full  text-start flex space-x-2">
                        <p className="font-semibold text-notification text-sm">Nombre:</p>
                        <p className="text-grey-light font-light text-sm">{countrySelect?.accounts[0]?.userName}</p>
                    </div>
                }
                {countrySelect?.accounts[0]?.accountType &&
                    <div className="w-full  text-start flex space-x-2">
                        <p className="font-semibold text-notification text-sm">Tipo de cuenta:</p>
                        <p className="text-grey-light font-light text-sm">{countrySelect?.accounts[0]?.accountType}</p>
                    </div>
                }

                <div className="w-full  text-start flex space-x-2">
                    <p className="font-semibold text-notification text-sm">Banco:</p>
                    <p className="text-grey-light font-light text-sm">{countrySelect?.accounts[0]?.name}</p>
                </div>
                <div className="w-full  text-start flex lg:flex-row flex-col lg:space-x-2">
                    <p className="font-semibold text-notification text-sm">Numero:</p>
                    <p className="text-grey-light font-light text-sm">{countrySelect?.accounts[0]?.account}</p>
                </div>
                {countrySelect?.accounts[0]?.nit &&
                    <div className="w-full  text-start flex space-x-2">
                        <p className="font-semibold text-notification text-sm">Nit:</p>
                        <p className="text-grey-light font-light text-sm">{countrySelect?.accounts[0]?.nit}</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default InforAccount