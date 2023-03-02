import React from 'react'
import moment from 'moment';
import { currencyFormat, myRound, percent } from '../../utils/helpers';


const DetailPurchase = ({ res, currency }) => {
    return (
        <div className="border w-full lg:w-11/12 px-3 space-y-3 pb-2">
            <div className="w-full mt-4">
                <h1 className="text-md font-normal text-grey">Detalles de la transacción <span className="font-semibold text-grey">#{res?.purchase?.code}</span></h1>
                <hr className="mt-4 bg-grey w-full m-auto" />
            </div>


            <div className="w-full flex mt-4">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Fecha:</p>
                <p className="w-3/6 text-end  text-grey-sale text-sm">{moment(res?.createdAt).format('L')}</p>
            </div>
            <div className="w-full flex">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Moneda:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm flex w-full justify-end space-x-1 items-center">
                    {
                        currency && currency[0]?.map((c, i) => {
                            if (c.name === res?.purchase?.crypto?.cryptoId?.name) {
                                return (
                                    <img
                                        src={c.icon}
                                        className="h-4 h-4"
                                    />
                                )
                            }
                        })
                    }

                    <span>{res?.purchase?.crypto?.cryptoId?.code}</span>
                </p>
            </div>
            <div className="w-full flex">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Cantidad:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">{myRound(res?.quantity)}
                    {
                        currency && currency[0].map((c, i) => {
                            if (c.name === res?.cryptoName) {
                                return (
                                    <span className="ml-1">{c.symbol}</span>
                                )
                            }
                        })
                    }
                </p>
            </div>

            <div className="w-full flex ">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Red:</p>
                <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.purchase?.network}</p>
            </div>

            <div className="w-full flex lg:flex-row flex-col">
                <p className="w-2/6 text-start text-grey font-semibold text-sm">Wallet:</p>
                <p className="w-4/6 text-end  text-grey-sale text-sm">{res?.purchase?.wallet}</p>
            </div>

            <div className="w-full bg-grey-bTab h-linePurchase mt-2" />

            <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Total:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">{currencyFormat(res?.value)} {res?.purchase?.currency}</p>
            </div>

            <div className="w-full flex ">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Descuento:</p>
                <p className={`w-3/6 text-end text-sm ${res?.purchase?.commission < 0 ? 'text-red-400' : 'text-green-400 '}`}>{res?.purchase?.commission}%</p>
            </div>
        </div>

    )
}

export default DetailPurchase