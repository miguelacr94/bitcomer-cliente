import React, { useContext, useState } from 'react'
import { Purchase } from '../../provider/api/user.queries'
import { Context } from '../../provider/user/context'
import Button from '../Ui/Button'
import PayMethod from './PayMethod'
import { Modal } from "react-responsive-modal";
import Qr from './Qr'
import PseForm from '../Form/PseForm'
import CreditForm from '../Form/CreditForm'
import moment from 'moment';
import { useToasts } from "react-toast-notifications";
import { currencyFormat, myRound, toastTypes } from '../../utils/helpers'
import { Routes } from '../../utils/routes'
import { useRouter } from "next/router";
import { Icons } from '../../utils/icons'
import usePurchase from '../../utils/hoocks/queries/usePurchase'

const OrderFinish = ({ payload, purchaseType }) => {

    const { countrySelect } = useContext(Context);
    const [showModal, setModal] = useState(false);
    const [res, setRes] = useState(null);
    const [payMethod, setPayMetod] = useState(null);
    const { statusUser } = useContext(Context);
    const { user } = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { quantityCalcule, setQuantityCalcule } = useContext(Context);
    const [respPaySelect,] = useState();
    const { networks, setNetworks } = useContext(Context);
    const { openChat, setOpenChat } = useContext(Context);
    const { commission, setCommission } = useContext(Context);
    const { valueCurrency, setValueCurrency } = useContext(Context);
    const { valueCrypto, setValueCrypto } = useContext(Context);


    const router = useRouter();

    const { addToast } = useToasts();
    const { purchase, load } = usePurchase();


    const onPurchase = async () => {
        const res = await purchase(purchaseType, networks);
        if (res) {
            addToast('Compra exitosa',
                { appearance: toastTypes.SUCCESS });
            setRes(res.data);
            setPayMetod('');
            setModal(true);
            setValueCrypto('');
            setValueCurrency('');
        } else {
            addToast('Error al realizar la compra',
                { appearance: toastTypes.ERROR });
        }

    }



    const onCloseQr = () => {
        setModal(false);
        setOpenChat(false);
        setUserPurchase(''); // deja en nulo estado de usuario de compra 
        setQuantityCalcule(0); // cambia estado de cantidad calculada a 0
        setNetworks('');
        return router.push(Routes.home);
    }

    return (
        <div className=" w-full  lg:ml-4 lg:mr-4 border border-menu rounded-3xl  text-start pt-4 px-2 lg:px-8 lg:mt-0 mt-8 pb-12 mb-12 overflow-x-hidden">
            <h2 className="font-semibold text-xl text-menu">Orden final</h2>
            <div className="flex mt-4">
                <p className="w-3/6 text-start text-sm text-menu font-semibold text-order">Fecha:</p>
                <p className="w-3/6 text-end  text-sm text-grey-light -ml-4">{moment().format('L')}</p>
            </div>
            {purchaseType === 'purchase' &&

                <div className="w-full mt-4 "> <div className="flex mt-4">
                    <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">Wallet:</p>
                    <p className="w-4/6 text-end  text-sm text-grey-light -ml-4">{userPurchase && userPurchase?.wallet}</p>
                </div>
                    <div className="flex mt-4">
                        <p className="w-3/6 text-start text-sm  text-menu font-semibold text-order">Moneda:</p>
                        <p className="w-3/6 text-end  text-sm text-grey-light -ml-4 flex justify-end space-x-2 items-center">
                            <img
                                src={userPurchase?.currency?.image}
                                className="w-4 h-4"
                            />
                            <spam> {userPurchase ? userPurchase?.currency?.name : ''}</spam></p>
                    </div>
                    <div className="flex mt-4">
                        <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">Red:</p>
                        <p className="w-4/6 text-end  text-sm text-grey-light -ml-4">{networks && networks}</p>
                    </div>
                </div>
            }

            {
                purchaseType === 'sale' &&

                <div className="w-full mt-4 ">
                    <div className="flex mt-4">
                        <p className="w-3/6 text-start text-sm  text-menu font-semibold text-order">Moneda:</p>
                        <p className="w-3/6 text-end  text-sm text-grey-light -ml-4 flex justify-end space-x-2 items-center">
                            <img
                                src={userPurchase?.currency?.image}
                                className="w-4 h-4"
                            />
                            <spam> {userPurchase ? userPurchase?.currency?.name : ''}</spam></p>
                    </div>
                    <div className="flex mt-4">
                        <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">Total a vender</p>
                        <p className="w-4/6 text-end  text-sm text-grey-light -ml-4">{valueCrypto && valueCrypto}</p>
                    </div>

                </div>

            }



            <hr className="bg-grey-btab h-line  w-full m-auto mt-6" />

            <div className="flex mt-4">
                <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">Descuento:</p>
                <p className={` w-5/6 text-end  text-end  text-sm  -ml-4 font-semibold
                ${commission > 0 ? 'text-green-400' : 'text-red-400'}
                
                `}>{commission ? commission : 0}%</p>
            </div>
            {}
            <div className="flex mt-4">
                <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">{ userPurchase==='purchase' ? 'Pago total:' : 'Total a recibir' }</p>
                <p className="w-5/6 text-end  font-bold text-xl text-totalOrder">{valueCurrency ? currencyFormat(valueCurrency) : 0} {countrySelect?.currency}</p>
            </div>


            {countrySelect?.name === 'Colombia' &&
                purchaseType === 'purchase'
                && userPurchase?.wallet && valueCurrency && networks ?
                <div id='pay'>
                    <PayMethod
                        payMethod={(e) => setPayMetod(e)}
                        disabled={user && user && statusUser !== 'verified'}
                        setSelectPay={payMethod}
                        payInitial={userPurchase?.payMethod}
                    />
                </div>

                :
                ''
            }

            {countrySelect?.name === 'Panama' &&
                purchaseType === 'purchase' && userPurchase?.wallet && valueCurrency && networks ?
                <div id='pay'>
                    <PayMethod
                        payMethod={(e) => setPayMetod(e)}
                        disabled={user && user && statusUser !== 'verified'}
                        setSelectPay={payMethod}
                        respPay={respPaySelect}
                    />
                </div>


                : ''

            }
            {countrySelect?.name === 'El Salvador' &&
                purchaseType === 'purchase' && userPurchase?.wallet && valueCurrency && networks ?
                <div id='pay'>
                    <PayMethod
                        payMethod={(e) => setPayMetod(e)}
                        disabled={user && user && statusUser !== 'verified'}
                        setSelectPay={payMethod}
                        respPay={respPaySelect}
                    />
                </div>


                : ''

            }





            <div className="flex flex-col items-center justify-end mt-8">

                <h1 className="text-menu font-semibold">{purchaseType === 'purchase' ? 'Recibirás en' : 'Venderás en'} {userPurchase ? userPurchase?.currency?.name : ''}</h1>
                <p className="mt-2 text-black font-semibold">{quantityCalcule ? myRound(quantityCalcule?.quantity) : 0}</p>


            </div>
            <div className="w-full flex justify-center  ">

                {countrySelect?.name === 'Colombia' && purchaseType === 'purchase' &&
                    <Button
                        text={purchaseType === 'purchase' ? 'Proceder al pago' : 'Proceder a la venta'}
                        className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                        onClick={() => onPurchase()}
                        disabled={
                            valueCrypto < 0.00001 ||
                            payMethod !== 'banco' ||
                            userPurchase?.wallet.length < 17 ||
                            !valueCurrency ||
                            !networks ||
                            load
                        }
                    />
                }
                {countrySelect?.name === 'Panama' && purchaseType === 'purchase' &&
                    <Button
                        text={purchaseType === 'purchase' ? 'Proceder al pago' : 'Proceder a la venta'}
                        className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                        onClick={() => onPurchase()}
                        disabled={
                            !quantityCalcule ||
                            quantityCalcule?.quantity < 0.00001 ||
                            !payMethod ||
                            userPurchase?.wallet.length < 17 ||
                            !valueCurrency ||
                            !networks ||
                            load
                        }
                    />
                }
                {countrySelect?.name === 'El Salvador' && purchaseType === 'purchase' &&
                    <Button
                        text={purchaseType === 'purchase' ? 'Proceder al pago' : 'Proceder a la venta'}
                        className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                        onClick={() => onPurchase()}
                        disabled={
                            !quantityCalcule ||
                            quantityCalcule?.quantity < 0.00001 ||
                            !payMethod ||
                            userPurchase?.wallet.length < 17 ||
                            !valueCurrency ||
                            !networks ||
                            load

                        }
                    />
                }



                {
                    purchaseType === 'sale' &&
                    <>

                        {countrySelect?.name === 'Colombia' &&
                            < Button
                                text={'Proceder a la venta '}
                                className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                                onClick={() => onPurchase()}
                                disabled={
                                    !userPurchase?.bank ||
                                    !userPurchase?.typeAccount ||
                                    userPurchase?.number?.length < 10 ||
                                    !userPurchase?.number ||
                                    !userPurchase?.userName ||
                                    !userPurchase?.nit ||
                                    !valueCurrency ||
                                    !quantityCalcule ||
                                    statusUser !== 'verified' ||
                                    load

                                }
                            />
                        }

                        {countrySelect?.name === 'Panama' && userPurchase?.typeSale === 'banco' ?
                            < Button
                                text={'Proceder a la venta '}
                                className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                                onClick={() => onPurchase()}
                                disabled={
                                    !userPurchase?.bank ||
                                    !userPurchase?.typeAccount ||
                                    userPurchase?.number?.length < 10 ||
                                    !userPurchase?.number ||
                                    !userPurchase?.userName ||
                                    !userPurchase?.nit ||
                                    !valueCurrency ||
                                    !quantityCalcule ||
                                    statusUser !== 'verified' ||
                                    load
                                }
                            />
                            :


                            < Button
                                text={'Proceder a la venta '}
                                className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                                onClick={() => onPurchase()}
                                disabled={
                                    !valueCurrency ||
                                    !quantityCalcule ||
                                    statusUser !== 'verified' ||
                                    load
                                }
                            />
                        }


                        {countrySelect?.name === 'El Salvador' &&
                            < Button
                                text={'Proceder a la venta '}
                                className={`bg-menu text-white w-64 h-14 rounded-full px-4 py-2 disabled:opacity-75 mt-5 absolute z-10 `}
                                onClick={() => onPurchase()}
                                disabled={
                                    !quantityCalcule ||
                                    !valueCurrency ||
                                    statusUser !== 'verified' ||
                                    load
                                }
                            />
                        }
                    </>
                }
                <div className="bg-white w-64 text-white  py-2 disabled:opacity-75 mt-10 absolute">

                </div>

            </div>
            {
                purchaseType === 'sale' &&
                <p className="text-xs font-semibold text-menu mt-24 absolute ml-12">Complete los campos para continuar con la venta</p>
            }
            <Modal
                open={payMethod === 'credit'}
                onClose={() => setPayMetod('')}
                center

            >
                <CreditForm
                    payload={payload}
                    dataCountry={countrySelect}
                    onClose={() => setPayMetod('')}
                    onBack={() => onCloseQr()}
                    resp={(r) => setRes(r)}
                    setModal={() => setModal(true)}
                    network={networks}
                />
            </Modal>


            <Modal
                open={payMethod === 'pse'}
                onClose={() => setPayMetod('')}
                center

            >
                <PseForm
                    payload={payload}
                    dataCountry={countrySelect}
                    onClose={() => setPayMetod('')}
                    onBack={() => onCloseQr()}
                    network={networks}
                />
            </Modal>


            <div id="myModal" className={`modal  ${showModal ? 'block' : 'hidden'}   flex justify-center items-start pt-10`}>

                {showModal &&
                    <div className={`modal-content  mb-4 p-4 rounded-lg ${openChat ? 'lg:-ml-72 ml-0' : 'ml-0'}`}>
                        <p onClick={() => onCloseQr()} className="flex items-end justify-end w-full text-lg cursor-pointer text-end">{Icons.close}</p>

                        <Qr
                            res={res}
                            onClose={() => onCloseQr()}

                        />
                    </div>
                }
            </div>

            {/* 
            <Modal
                open={showModal}
                onClose={() => onCloseQr()}
                center={false}
                closeOnOverlayClick={false}
            >
                
                <Qr
                    res={res}
                    onClose={() => onCloseQr()}

                />

            </Modal> */}

        </div>
    )
}

export default OrderFinish