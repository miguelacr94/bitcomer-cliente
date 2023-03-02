import React from 'react'
import moment from 'moment';
import { Context } from '../../provider/user/context';
import { useContext } from 'react';
import { currencyFormat, myRound } from '../../utils/helpers';
import { Icons } from '../../utils/icons';

const DetailGiro = ({ res }) => {

    const { currency } = useContext(Context);
    const { user, setUser } = useContext(Context);




    return (
        <div className="border w-11/12 px-3 space-y-3 pb-2">
            <div className="w-full mt-4">
                <h1 className="text-md font-normal text-grey">Detalles de la transacción <span className="font-semibold text-grey">#{res?.code}</span></h1>
                <hr className="mt-4 bg-grey w-full m-auto" />
            </div>

            <div className=" w-full flex flex-col justify-center items-center">
                <img
                    src={res?.qr}
                    className="w-40"
                />
                <p className="text-xs font-semibold text-grey text-center w-48">Con este código QR podrás reclamar el giro</p>
            </div>


            <div className="w-full flex mt-4">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Fecha:</p>
                <p className="w-3/6 text-end  text-grey-sale text-sm">{moment(res?.createdAt).format('L')}</p>
            </div>
            <div className="w-full flex">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Moneda:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm flex w-full justify-end space-x-1 items-center">


                    {res?.purchase?.crypto?.cryptoId?.name &&
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

                    {res?.crypto?.cryptoId?.name &&
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

                    <span>{res?.purchase?.crypto?.cryptoId?.code}</span>
                </p>
            </div>
            <div className="w-full flex ">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Cantidad:</p>
                <div className='flex w-3/6 justify-end items-end'>

                    <p className="w-3/6 text-end text-grey-sale text-sm flex justify-end items-center"><span className='ml-1'>{Icons.coin}</span> {myRound(res?.quantity) || myRound(res?.crypto?.quantity)}</p>
                </div>

            </div>


            <hr className="mt-4 bg-grey w-full m-auto" />

            <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Descuento:</p>
                <p className={`w-3/6 text-end ${res?.purchase?.rate > 0 ? 'text-green-400' : 'text-red-400'} text-sm`} >{res?.purchase?.rate || res?.rate}%</p>
            </div>

            {/* <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Subtotal:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">
                    {currencyFormat(res?.purchase?.subTotal || res?.subTotal)} &nbsp;
                 
                    {res?.purchase?.currency || res?.currency}
                </p>
            </div>
 */}

            <div className="w-full flex mt-2">
                <p className="w-3/6 text-start text-grey font-semibold text-sm">Total a recibir:</p>
                <p className="w-3/6 text-end text-grey-sale text-sm">{currencyFormat(res?.value || res?.purchase?.currenc)} &nbsp;
                    {/* {currencyFormat(res?.subTotal)} */}
                    {res?.purchase?.currency || res?.currency}</p>
            </div>

            {res?.purchase?.branch && <>
                <div className="text-start">
                    <h1 className="text-grey font-semibold text-center mb-4">Información de sucursal</h1>
                </div>
                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.purchase?.branch?.name || res?.branch?.name}</p>
                </div>
                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">País:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.purchase?.country?.name || res?.country?.name}</p>
                </div>



                < div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Ciudad:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm ">{res?.purchase?.branch?.city?.name || res?.branch?.city?.name}</p>
                </div>

                <div className="w-full flex mt-4">
                    <p className="w-3/6 text-start text-grey font-semibold text-sm">Dirección:</p>
                    <p className="w-3/6 text-end  text-grey-sale text-sm overflow-hidden">{res?.purchase?.branch?.address || res?.branch?.address}</p>
                </div>
            </>
            }




            {
                res?.branch && <>
                    <div className="text-start">
                        <h1 className="text-grey font-semibold text-center mb-4">Información de sucursal</h1>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.branch?.name}</p>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">País:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.purchase?.country?.name || res?.country?.name}</p>
                    </div>



                    < div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Ciudad:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm ">{res?.purchase?.branch?.city?.name || res?.branch?.city?.name}</p>
                    </div>

                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Dirección:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm overflow-hidden">{res?.purchase?.branch?.address || res?.branch?.address}</p>
                    </div>
                </>
            }



            {
                res?.purchase?.information &&
                <>
                    <div className="text-start pt-4">
                        <h1 className="text-grey font-semibold text-center mb-4">Información de beneficiario</h1>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.purchase?.information?.name}</p>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">N° documento:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{res?.purchase?.information?.document}</p>
                    </div>
                </>
            }



            {
                res?.payee === false &&

                <>
                    <div className="text-start">
                        <h1 className="text-grey font-semibold text-center mb-4">Información de beneficiario</h1>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{user?.fullName}</p>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Correo electrónico:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{user?.email}</p>
                    </div>
                </>

            }
            {
                res?.purchase?.payee === false &&

                <>
                    <div className="text-start">
                        <h1 className="text-grey font-semibold text-center mb-4">Información de beneficiario</h1>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Nombre:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{user?.fullName}</p>
                    </div>
                    <div className="w-full flex mt-4">
                        <p className="w-3/6 text-start text-grey font-semibold text-sm">Correo electrónico:</p>
                        <p className="w-3/6 text-end  text-grey-sale text-sm">{user?.email}</p>
                    </div>
                </>

            }

        </div >


    )
}

export default DetailGiro