import React, { useContext } from 'react'
import { Icons } from '../../utils/icons'
import moment from 'moment';
import { capitalizer, currencyFormat } from '../../utils/helpers';
import { Context } from '../../provider/user/context';
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const OtcResume = ({ onBack, resume }) => {
    const inputRef = useRef(null);
    const { openChat, setOpenChat } = useContext(Context);
    const { copy, setCopy } = useContext(Context);

    const printDocument = () => {
        html2canvas(inputRef.current).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save("download.pdf");
        });
    };


    const copyCode = () => {
        var content = document.getElementById('wallet');
        content.select();
        document.execCommand('copy');
        setOpenChat(true);
        setCopy('Confirmación de transacción ' + content?.value);
    }

    return (
        <>
            <a onClick={onBack} className='text-grey w-full ml-6 lg:ml-0 lg:w-containerCard text-start cursor-pointer underline mt- flex items-center'>{Icons.back} Atrás</a>
            {/* <a onClick={printDocument}>descargar</a> */}
            <div id="divToPrint" ref={inputRef} className='flex justify-center items-start w-full'>
                <div className="lg:w-detailPurchase w-full  mt-6 pb-6 border rounded-xl p-6 mb-12">

                    <div className={`w-full  flex  flex-col justify-center items-center  space-x-4 pt-8 `}>
                        <div className='flex flex-col'>
                            <h1 className='text-center text-menu font-semibold'>Detalles de la venta #{resume?.code}

                            </h1>
                            <input id='wallet' className='font-semibold min-w-minCode hidden bg-grey text-menu outline-none ' readonly='readonly' value={resume?.code} />
                        </div>
                        <p className='text-sm text-grey font-semibold text-center mt-2'>
                            Envíanos el hash de la transacción por el chat que está
                            a tu derecha de esta forma confirmaremos tu transacción y
                            te enviaremos el código Swift de la transferencia en fiat.
                        </p>
                        <div className='w-full space-y-3 mt-6'>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Fecha:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{moment(resume?.createdAt).format('L')}</p>
                            </div>
                            <div className='w-full flex items-center'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Tipo de transferencia:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(resume.TransferType)}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Moneda:</p>
                                <p className='w-4/6 text-end  text-grey-light font-light text-sm flex justify-end items-center'>{resume.crypto?.cryptoId?.code}
                                    <img className='w-4 h-4 ml-1' src={resume.crypto?.cryptoId?.image} />
                                </p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-4/6 text-start text-sm font-semibold text-order'>Cantidad en criptomonedas:</p>
                                <p className='w-2/6 text-end  text-grey-light font-light text-sm flex justify-end items-center'>{resume.crypto?.quantity}<span>{Icons.coin} </span></p>
                            </div>

                            <div className='w-full flex items-center'>
                                <p className='w-3/6 text-start text-sm font-semibold text-order'>Monto en dólar estadounidense:</p>
                                <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{currencyFormat(resume.value)}</p>
                            </div>
                            <div className='w-full flex'>
                                <p className='w-2/6 text-start text-sm font-semibold text-order'>Descuento:</p>
                                <p className={`w-4/6 text-end ${resume.commission * 100 > 0 ? 'text-green-400' : 'text-red-400'} font-light text-sm `}>{resume.commission * 100}%</p>
                            </div>
                        </div>
                        <div className={`w-full  flex  flex-col justify-center items-center  space-x-4 pt-4 `}>
                            <h1 className='w-full text-center py-3 font-semibold text-menu'>Información bancaria</h1>
                            <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                            <div className='w-full space-y-3 mt-2'>
                                <div className='w-full flex'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Banco:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(resume?.account?.bank)}</p>
                                </div>
                                <div className='flex w-full items-center'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Numero de cuenta:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{resume?.account?.number}</p>
                                </div>
                                <div className='flex w-full items-center'>
                                    <p className='w-2/6 text-start text-sm font-semibold text-order'>Tipo de cuenta:</p>
                                    <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{resume?.account?.typeAccount}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-3/6 text-start text-sm font-semibold text-order'>Dirección de banco:</p>
                                    <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{capitalizer(resume?.account?.address)}</p>
                                </div>
                                <div className='flex w-full'>
                                    <p className='w-3/6 text-start text-sm font-semibold text-order'>Código SWIFT/BIT:</p>
                                    <p className='w-3/6 text-end  text-grey-light font-light text-sm'>{resume?.account?.code}</p>
                                </div>
                            </div>
                            <div className='w-full'>
                                <h1 className='w-full text-center py-3 font-semibold text-menu'>Información del beneficiario</h1>
                                <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
                                <div className='w-full space-y-3 mt-2'>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-order'>Beneficiario:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(resume?.information?.name)}</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-order'>Dirección:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(resume?.information?.address)}</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-order'>País:</p>
                                        <p className='w-4/5 text-end  text-grey-light font-light text-sm'>{resume?.country.name}</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-order'>Ciudad:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{resume?.information?.city}</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-order'>Region:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{capitalizer(resume?.information?.region)}</p>
                                    </div>
                                    <div className='w-full flex'>
                                        <p className='w-2/6 text-start text-sm font-semibold text-order'>Código postal:</p>
                                        <p className='w-4/6 text-end  text-grey-light font-light text-sm'>{resume?.information?.potalCode}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button onClick={() => copyCode()} className='w-36 bg-menu rounded-full h-10 text-white font-semibold mt-6'>Enviar</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default OtcResume