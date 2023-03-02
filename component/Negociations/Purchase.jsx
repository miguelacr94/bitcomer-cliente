import React, { useEffect } from 'react'
import { currencyFormat } from '../../utils/helpers'
import { Icons } from '../../utils/icons'
import DetailPurchase from './DetailPurchase'

const Purchase = ({ res, currency, countrySelect }) => {

    useEffect(() => {
        window.location.href = '#purchaseId'
    })



    console.log(res);

    return (
        <div id='purchaseId' className="text-center flex flex-col justify-center items-center lg:w-detailPurchase w-full m-auto  w-window py-6 lg:py-4 lg:px-3">


            <div className=" w-full py-6 rounded-lg space-y-4 border p-4 items-center justify-center flex flex-col">

                <p className="text-yellow-400 text-4xl">{Icons.checkCircleDark}</p>
                <h1 className="mt-2 text-yellow-400  font-semibold text-xl">Compra pendiente por aprobar</h1>
                <hr className="mt-4 bg-grey w-full m-auto" />
                <div>
                    <p className="text-grey text-sm text-start">Debes enviar <span className="font-semibold">{currencyFormat(res?.value)} {res?.purchase?.currency}</span> a la siguiente cuenta Bancaria y enviar el comprobante de la transferencia por <span className="font-semibold">CHAT</span></p>
                </div>


                {res?.purchase?.country?.account &&

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

                }
                <div className="border-dotted px-2 lg:px-4 text-md border border-menu text-menu rounded-lg w-full lg:h-14 flex items-center justify-center mt-4">
                    <p className="font-light">En 15 minutos, <span className="font-normal">Recibirás tus

                        <span className="font-bold">

                            <span className="ml-1">{res?.purchase?.crypto?.cryptoId?.code}</span>

                        </span>
                    </span> en la Wallet <span className="font-bold">{res?.purchase?.wallet}</span> </p>
                </div>

                {/* {res && res?.qr ?
        <div className="flex justify-center items-center w-full flex-col">
          <img
            className="w-48 h-48"
            src={res && res?.qr}
          />
          <h1 className="text-grey text-grey font-semibold text-xs">Con este codigo QR podras reclamar tu compra en nuestras oficinas</h1>
        </div>
        : ''
      } */}
                <div className="mt-4 w-full flex justify-center pt-4">
                    <DetailPurchase
                        res={res}
                        currency={currency}
                    />

                </div>

            </div>

        </div >
    )
}

export default Purchase