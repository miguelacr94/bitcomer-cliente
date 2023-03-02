import React, { useEffect } from 'react'
import { useState } from 'react'
import { Icons } from '../../utils/icons'
import DetailSale from './DetailSale'

const Sale = ({ res, currency,oficine }) => {

    const [copyCode, setCope] = useState(null);

    useEffect(() => {
        window.location.href = '#saleId'
    })

    const copy = () => {
        var content = document.getElementById('wallet');
        content.select();
        document.execCommand('copy');
    }


    return (
        <div id='saleId' className="text-center flex flex-col justify-center  items-center lg:w-detailPurchase w-full m-auto  w-window py-6  lg:px-3">


            <div className=" w-full overflow-hidden  py-6 rounded-lg space-y-4 border p-1 lg:p-4 items-center justify-center flex flex-col">

                <p className="text-yellow-400 text-4xl">{Icons.checkCircleDark}</p>
                <h1 className="mt-2 text-yellow-400  font-semibold text-xl">Venta pendiente por aprobar</h1>
                <hr className="mt-4 bg-grey w-full m-auto" />
                <div>
                    <p className="text-grey text-sm text-start">Debes enviar <span className="font-semibold">
                        {res?.quantity} {res?.purchase?.crypto?.cryptoId?.code}</span> a la siguiente Wallet y enviar el comprobante de la transferencia por <span className="font-semibold">CHAT.</span></p>
                </div>

                <div className="w-full text-start overflow-auto">
                    <p className="text-grey font-semibold text-sm text-ellipsis ">Wallet para enviar criptomonedas:</p>
                    <p className="text-grey-light font-light text-sm  flex items-center space-x-2">
                        <input className='w-5/6 outline-none bg-white' readonly='readonly'  id='wallet' value={res?.purchase?.crypto?.cryptoId?.wallet?.crypto} />
                        <span onClick={() => copy()} className='cursor-pointer hover:text-menu text-lg'>{Icons.copy}</span></p>

                </div>

                <div className=" w-full flex flex-col justify-center items-center">
                    <img
                        src={res?.purchase?.crypto?.cryptoId?.wallet?.qr}
                        className="w-40"
                    />
                    <p className="text-xs font-semibold text-grey text-center w-48">Con este código QR podrás enviar criptomonedas</p>
                </div>

                <div className="border-dotted px-4 text-md border border-menu text-menu rounded-lg w-full h-14 flex items-center justify-center mt-4">
                    <p className="font-light">En 15 minutos, la consignación a tu cuenta bancaria </p>
                </div>

                <div className="mt-4 w-full flex justify-center pt-4">
                    <DetailSale
                        res={res}
                        currency={currency}
                        oficine={oficine}
                    />
                </div>

            </div>


        </div>
    )
}

export default Sale