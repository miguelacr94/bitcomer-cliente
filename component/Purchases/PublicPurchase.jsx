import React, { useContext, useEffect, useState } from 'react'
import PurchasePublicForm from '../Form/PurchasePublicForm'
import PayMethod from '../Negociations/PayMethod'
import { Context } from '../../provider/user/context'
import { useRouter } from "next/router";
import { Routes } from '../../utils/routes'

const PublicPurchase = () => {

    const { countrySelect } = useContext(Context);
    const [pay, setPay] = useState('purchase');
    const [payMethod, setPayMetod] = useState(null);
    const router = useRouter();
    const [quantity] = useState(null);
    const { userPurchase } = useContext(Context);
    const { networks } = useContext(Context);

    const saveDataPurchase = () => {

        const payload = {
            quantity: userPurchase.quantity,
            wallet: userPurchase.wallet,
            currency: {
                code: userPurchase?.currency.code,
                image: userPurchase?.currency.image,
                name: userPurchase?.currency.name
            },
            payMethod: payMethod,
            network: networks,
            value: userPurchase?.value,
            operation: pay,

        }

        if (payload) {

            localStorage.setItem('purchase', JSON.stringify(payload));
            if (localStorage.getItem('purchase')) {
                router.push(Routes.login);
            }
        }

    }


    const saveDataSale = () => {
        const payload = {
            // value: valueCalcule,
            currency: {
                code: userPurchase?.currency.code,
                image: userPurchase?.currency.image,
                name: userPurchase?.currency.name
            },
            value: userPurchase.value,
            payMethod: pay,
            bank: userPurchase?.bank,
            typeAccount: userPurchase?.typeAccount,
            number: userPurchase?.number,
            userName: userPurchase?.userName,
            nit: userPurchase?.nit,
            operation: pay,
            typeSale: userPurchase.typeSale
        }


        if (payload) {
            localStorage.setItem('purchase', JSON.stringify(payload));
            if (localStorage.getItem('purchase')) {
                router.push(Routes.login);
            }
        }
    }



    return (
        <div className="w-full flex  flex-col items-center lg:justify-start justify-center ">


            <div className="lg:space-x-12 space-x-4 mt-6 flex flex-row  lg:space-y-0  lg:px-0 px-2">
                <button onClick={() => setPay('purchase')} className={`${pay === 'purchase' ? 'bg-menu text-white' : ''} lg:w-48 w-40 h-12 border border-menu rounded-xl text-menu font-semibold flex items-center justify-center space-x-4`}>
                    <img
                        src={pay === 'purchase' ? './image/carWhite.svg' : './image/carBlue.svg'}
                        className="w-8 h-8"
                    />
                    <p>
                        Comprar
                    </p>
                </button>
                <button onClick={() => setPay('sale')} className={`${pay === 'sale' ? 'bg-menu text-white' : ''} lg:w-48 w-40 h-12 border border-menu rounded-xl text-menu font-semibold flex flex items-center justify-center space-x-4`}>
                    <img
                        src={pay === 'sale' ? './image/moneyWhite.svg' : './image/moneyBlue.svg'}
                        className="w-8 h-8"
                    /> <p>
                        Vender
                    </p>
                </button>
            </div>
            <div className="lg:w-11/12 w-full lg:flex lg:flex-row flex-col  justify-center lg:items-start items-center  shadow-lg mt-6 pb-12 lg:space-x-12">

                < div className={`${countrySelect && countrySelect.name === 'Colombia' && pay !== 'sale' ? 'lg:w-3/6 w-full items-center lg:items-end' : 'lg:w-3/5 w-full items-center'} 
                flex flex-col  justify-center `}>
                    <div className="lg:w-4/6 w-5/6 ">
                        <PurchasePublicForm
                            quantity={quantity}
                            currency={countrySelect?.currency}
                            tab={pay}
                        />
                    </div>{
                        pay === 'sale' ?
                            <div className="w-full flex justify-center items-center ">
                                <button
                                    disabled={
                                        !userPurchase?.bank ||
                                        !userPurchase?.typeAccount ||
                                        !userPurchase?.number ||
                                        !userPurchase?.userName ||
                                        !userPurchase?.nit ||
                                        !userPurchase?.value

                                    }
                                    onClick={() => saveDataSale()}
                                    className="mt-4 bg-menu rounded-full w-64 h-10 text-white disabled:opacity-75">Continuar</button>
                            </div>
                            : ''

                    }

                </div>


                {pay === 'purchase' ?
                    <div className="lg:w-3/6 w-full flex  lg:justify-start justify-center  items-center lg:items-start flex-col ">
                        <div className="lg:w-4/6 w-5/6">
                            <PayMethod
                                payMethod={((e) => setPayMetod(e))}
                                className={'lg:mt-0 mt-4'}
                            />
                        </div>
                        <div className='lg:w-4/6 w-full flex flex-col justify-center items-center '>
                            <button
                                onClick={() => saveDataPurchase()}
                                className="mt-4 bg-menu rounded-full w-3/6 h-10 text-white disabled:opacity-75"
                                disabled={
                                    !payMethod ||
                                    !userPurchase?.wallet ||
                                    !userPurchase?.value ||
                                    !networks

                                }
                            >Comprar ahora
                            </button>
                            <p className="text-xs font-semibold text-menu mt-4">Complete los campos para continuar con la compra</p>
                        </div>
                    </div>
                    : ''

                }
                <div className="lg:w-full flex items-center justify-center mt-6 lg:hidden block w-5/6 m-auto">
                    <div className="border-dotted border border-menu text-menu rounded-xl w-full h-12 flex items-center justify-center">
                        <p className="font-bold">En 15 minutos, <span className="font-normal">Recibirás tus {userPurchase?.currency?.code}</span> </p>
                    </div>
                </div>


            </div>
        </div >
    )
}


export default PublicPurchase