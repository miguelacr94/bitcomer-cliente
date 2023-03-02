import React from 'react'
import moment from 'moment';
import { Context } from '../../provider/user/context';
import { useContext } from 'react';
import { currencyFormat, myRound } from '../../utils/helpers';

const DetailGiroTable = ({ res }) => {

    const { currency } = useContext(Context);

    return (
        <div className="border w-11/12 px-3 space-y-3 pb-2">
            <div className="w-full mt-4">
                <h1 className="text-md font-normal text-grey">Detalles de la transacción <span className="font-semibold text-grey">#{res?.code}</span></h1>
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
                            if (c.name === res?.crypto?.cryptoId?.name) {
                                return (
                                    <img
                                        src={c.icon}
                                        className="h-4 h-4"
                                    />
                                )
                            }
                        })
                    }

                    <span>{res?.crypto?.cryptoId?.code}</span>
                </p>
            </div>
            <div className="w-full flex">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Cantidad:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">{myRound(res?.crypto?.quantity)}

                </p>
            </div>
            <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Descuento:</p>
                <p className="w-3/6 text-end text-red-400 text-sm" >{res?.commission}%</p>
            </div>

            <hr className="mt-4 bg-grey w-full m-auto" />


            <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Total:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">{currencyFormat(res?.value)} USD</p>
            </div>

            {res?.purchase?.branch && <>
                <div className="text-start">
                    <h1 className="text-grey font-semibold text-center mb-4">Información de sucursal</h1>
                </div>
                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.branch?.name}</p>
                </div>
                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Pais:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.branch?.country?.name}</p>
                </div>
                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Ciudad:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.branch?.city}</p>
                </div>
                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Direccion:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.branch?.address}</p>
                </div>
            </>
            }

            {res?.information &&
                <>
                    <div className="text-start">
                        <h1 className="text-grey font-semibold text-center mb-4">Información de beneficiario</h1>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.information?.name}</p>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">N° documento:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.information?.document}</p>
                    </div>
                </>
            }
            {res?.information &&
                <>
                    <div className="text-start">
                        <h1 className="text-grey font-semibold text-center mb-4">Información de beneficiario</h1>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.information?.name}</p>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">N° documento:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.information?.document}</p>
                    </div>
                </>
            }

        </div>


    )
}

export default DetailGiroTable