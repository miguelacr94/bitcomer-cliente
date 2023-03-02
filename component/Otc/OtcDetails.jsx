import React, { useContext, useState } from 'react'
import { Context } from '../../provider/user/context';
import { capitalizer, currencyFormat } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import moment from 'moment';
import OtcResume from './OtcResume';
const OtcDetails = ({ detailOtc, onBack }) => {


    const { openChat } = useContext(Context);
    const [resume, setResume] = useState(false);


    const copy = () => {
        var content = document.getElementById('wallet');
        content.select();
        document.execCommand('copy');
    }



    return (
        <div className={`w-full  pt-12 flex justify-center ${openChat ? 'items-start' : 'items-center'} flex-col`}>

            {!resume ? <>
                <a onClick={onBack} className='text-grey lg:ml-0 ml-6 w-full lg:w-containerCard text-start cursor-pointer underline mt- flex items-center'>{Icons.back} Atrás</a>
                <div className="lg:w-containerCard w-full  mt-6 pb-6 border rounded-xl p-6 mb-12">


                    <div className={`w-full flex flex-col justify-center text-center items-center  pb-4
${detailOtc?.status === 'completado' ? 'text-green-400' :
                            detailOtc?.status === 'pendiente' ? 'text-yellow-400' :
                                detailOtc?.status === 'declinada' ? 'text-red-400' :
                                    ''
                        }

`}>
                        <p className={` text-4xl`}>
                            {
                                detailOtc?.status === 'pendiente' ? Icons.warningCircle :
                                    detailOtc?.status === 'completado' ? Icons.checkCircle :
                                        detailOtc?.status === 'declinada' ? Icons.error :
                                            ''
                            }

                        </p>
                        <h1 className="mt-2  font-semibold text-xl text-center"> Venta OTC  {
                            detailOtc?.status === 'completado' ? 'completada' :
                                detailOtc?.status === 'declinada' ? 'rechazada' :
                                    detailOtc?.status === 'pendiente' ? 'aprobada' : ''
                        }

                        </h1 >
                        <p className='text-grey-light font-semibold text-sm mt-4'>
                            Ahora solo debes enviar los usdt a la dirección que se te indica abajo
                            y confirmarla por el chat que aparece a tu derecha:
                        </p>
                    </div>




                    {detailOtc?.crypto?.cryptoId?.wallet &&
                        <>
                            <div className='w-full text-start mt-8'>
                                <h1 className='text-sm font-semibold text-order'>Wallet para enviar criptomonedas:</h1>
                                <p className="text-grey-light font-light text-sm  flex items-center space-x-2">
                                    <input className='w-80 outline-none bg-transparent' readonly='readonly' id='wallet' value={detailOtc?.crypto?.cryptoId?.wallet?.crypto} />
                                    <span onClick={() => copy()} className='cursor-pointer hover:text-menu text-lg'>{Icons.copy}</span></p>

                                <div className='flex flex-col justify-center items-center mt-8'>
                                    <img
                                        src={detailOtc?.crypto?.cryptoId?.wallet?.qr}
                                        className="h-52 w-52"
                                    />
                                    <p className="text-xs font-semibold text-grey text-center w-48">Con este código QR podrás enviar criptomonedas</p>
                                    <button onClick={() => setResume(true)} className='bg-menu h-10 w-48 text-sm rounded-full text-white font-semibold mt-6'>Confirmar transacción</button>
                                </div>

                            </div>


                        </>
                    }
                    {/* 
                {detailOtc?.country?.account &&
                    <div className='px-2 w-full'>
                        <h1 className='text-center font-semibold text-grey-light'>Nuestras Cuentas</h1>
                        <InforAccount
                            countrySelect={detailOtc?.country}
                        />
                    </div>
                } */}



                    <div className={`w-full  flex  flex-col justify-center items-center  space-x-4 pt-8 `}>
                        <div>
                            <h1 className='text-center text-menu font-semibold'>Detalles de la venta <span className='font-semibold text-menu'>#{detailOtc.code} </span></h1>
                        </div>
                        <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                        <div className='w-full space-y-4 mt-2'>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Fecha:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{moment(detailOtc?.createdAt).format('L')}</p>
                            </div>
                            <div className='w-full flex items-center'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Tipo de transferencia:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc.TransferType)}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Moneda:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm flex justify-end items-center'>{detailOtc.crypto?.cryptoId?.code}
                                    <img className='w-4 h-4 ml-1' src={detailOtc.crypto?.cryptoId?.image} />
                                </p>
                            </div>

                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Cantidad en criptomonedas:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm flex justify-end items-center'>{detailOtc.crypto?.quantity}<span>{Icons.coin} </span></p>
                            </div>

                            <div className='w-full flex items-center'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Monto en dólar estadounidense:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{currencyFormat(detailOtc.value)}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Descuento:</p>
                                <p className={`w-4/6 text-end ${detailOtc.commission * 100 > 0 ? 'text-green-400' : 'text-red-400'} font-light text-sm `}>{detailOtc.commission * 100}%</p>
                            </div>


                        </div>
                    </div>

                    <div className={`w-full  flex  flex-col justify-center items-center  space-x-4 pt-4 `}>
                        <h1 className='w-full text-center py-3 font-semibold text-menu'>Información bancaria</h1>
                        <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                        <div className='w-full space-y-4 mt-2'>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Banco:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.account?.bank)}</p>
                            </div>
                            <div className='flex w-full items-center'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Numero de cuenta:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.account?.number}</p>
                            </div>
                            <div className='flex w-full items-center'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Tipo de cuenta:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.account?.typeAccount}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-3/6 text-start text-sm font-semibold text-order'>Dirección de banco:</p>
                                <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.account?.address)}</p>
                            </div>
                            <div className='flex w-full'>
                                <p className='w-3/6 text-start text-sm font-semibold text-order'>Código SWIFT/BIT:</p>
                                <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.account?.code}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <h1 className='w-full text-center py-3 font-semibold text-menu'>Información del beneficiario</h1>
                            <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                            <div className='w-full space-y-4 mt-2'>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Beneficiario:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.information?.name)}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Dirección:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.information?.address)}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>País:</p>
                                    <p className='w-4/5 text-end  text-grey-light font-light text-sm'>{detailOtc?.country.name}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Ciudad:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.information?.city}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Region:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(detailOtc?.information?.region)}</p>
                                </div>
                                <div className='w-full flex'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Código postal:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{detailOtc?.information?.potalCode}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div >

            </>
                :
                <OtcResume
                    resume={detailOtc}
                    onBack={onBack}
                />

            }
        </div>

    )
}

export default OtcDetails