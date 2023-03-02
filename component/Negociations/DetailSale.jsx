import React from 'react'
import moment from 'moment';
import { currencyFormat, myRound, percent } from '../../utils/helpers';

const DetailSale = ({ res, currency, oficine }) => {


   
    return (
        <div className="border rounded-lg w-11/12 px-3 space-y-3 pb-2">
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
            {res?.purchase?.wallet &&
                <div className="w-full flex ">
                    <p className="w-2/6 text-start text-grey font-semibold text-sm">Wallet:</p>
                    <p className="w-4/6 text-end  text-grey-sale text-sm">{res?.purchase?.wallet}</p>
                </div>
            }
            <hr className="mt-4 bg-grey w-full m-auto" />

            <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Total:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">{currencyFormat(res?.value)} {res?.purchase?.currency}</p>
            </div>

            <div className="w-full flex ">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Descuento:</p>
                <p className={`w-3/6 text-end text-sm ${res?.purchase?.commission < 0 ? 'text-red-400' : 'text-green-sale '}`}>{res?.purchase?.commission}%</p>
            </div>

            <hr className="mt-4 bg-grey w-full m-auto" />
            {res?.purchase?.account && res?.paymentMethod === 'banco' &&

                <div className="text-start">
                    <h1 className="text-grey font-semibold text-center mb-4">Cuenta donde se depositará</h1>
                    <div className="w-full space-y-1">
                        <p className="font-semibold text-grey text-sm">Nombre: <span className="text-grey-light font-light text-sm ml-1">{res?.purchase?.account?.userName}</span></p>
                        <p className="font-semibold text-grey text-grey">Tipo de cuenta: <span className="text-grey-light font-light text-sm ml-1">{res?.purchase?.account?.typeAccount}</span></p>
                        <p className="font-semibold text-grey text-sm">banco: <span className="text-grey-light font-light text-sm ml-1">{res?.purchase?.account?.bank}</span></p>
                        <p className="font-semibold text-grey text-sm">Numero: <span className="text-grey-light font-light text-sm ml-1">{res?.purchase?.account?.number}</span></p>
                        <p className="font-semibold text-grey text-sm">Cédula o Nit: <span className="text-grey-light font-light text-sm ml-1">{res?.purchase?.account?.nit}</span> </p>

                    </div>
                </div>
            }






            {res?.paymentMethod === 'efectivo' &&
                <>

                    <div className=" w-full flex flex-col justify-center items-center">
                        <img
                            src={res?.purchase?.qr}
                            className="w-40"
                        />
                        <p className="text-xs font-semibold text-grey text-center w-48">Con este código QR podrás reclamar tu efectivo</p>
                    </div>

                    < div className="text-start">
                        <h1 className="text-grey font-semibold text-center mb-4">Oficina para reclamar efectivo</h1>

                        <div className='w-full space-y-4'>

                            {
                                oficine && oficine.map((o) => {
                                    return (
                                        <div className="w-full flex items-center ">
                                            <p className="w-2/6 text-start text-grey font-semibold text-sm">Dirección:</p>
                                            <p className={`w-4/6 text-end text-sm text-grey-light'}`}>{o}%</p>
                                        </div>
                                    )

                                })
                            }

                        </div>
                    </div>
                </>
            }


        </div >
    )
}

export default DetailSale