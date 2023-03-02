import React, { useContext, useEffect, useState } from 'react'
import Validations from '../component/Form/Validations'
import MainLayout from '../component/Layouts/MainLayout'
import Prices from '../component/Purchases/Prices';
import EnableCount from '../component/UserPanel/EnabledCount';
import { getPurchaseAndSale } from '../provider/api/home.queries';
import { Context } from '../provider/user/context';
import { capitalizer, currencyFormat } from '../utils/helpers';
import useIsMounted from '../utils/hoocks/useIsMounted';



export default function Panel() {


    const { user } = useContext(Context);
    const { statusUser, setStatusUser } = useContext(Context);
    const [typeUser, setTypeUser] = useState(null);
    const isMounted = useIsMounted();
    const [purchase, setPurchase] = useState();
    const [chart, setChart] = useState(null)


    const getPurchase_Sales = async () => {

        const res = await getPurchaseAndSale();
        if (res) {
            setPurchase(res?.data);
            setChart(res?.data?.chart);

        } else {
            setPurchase(0);
        }
    }



    useEffect(() => {
        if (!isMounted) return null;
        getPurchase_Sales();
    }, [isMounted]);

    useEffect(() => {
        setStatusUser(user?.userVerification?.account?.status);
        setTypeUser(user?.typeUser);
    }, [setTypeUser]);




    return (
        <MainLayout >
            <main className="overflow-auto lg:h-window lg:h-windowMovil  lg:containerEnabled flex flex-col justify-start items-center">

                {statusUser && statusUser === 'verified' ?
                    <>

                        {/* <div className="w-full  lg:-mt-24 h-10 bg-green-100 text-grey-light font-bold text-xl flex space-x-2 items-center justify-center opacity-75">
                            <h1 className="text-sm lg:text-mm">Tu cuenta ya ha sido verificada </h1>
                            <p className="text-green-500 text-3xl " >{Icons.checkCircle}</p>
                        </div> */}


                        <div className="overflow-auto px-4 mt-8 lg:mt-16 py-2 lg:pl-12 pb-8 w-full lg:w-10/12 flex flex-col justify-center lg:justify-start lg:items-start items-center pb-12">
                            <h1 className="text-grey text-xl font-normal ml-2">Bienvenido, <span className="font-semibold">{user && capitalizer(user?.fullName)}</span></h1>
                            {/* <div className='md:hidden block '>
                                <CardReferredTotal />
                            </div> */}



                            {/* <div className="mt-6 lg:w-5/6 md:w-5/6 w-full">

                                <TransactionsGraphy
                                    data={chart && chart}

                                />


                            </div> */}
                            {/* 
                            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-2 mt-4 mb-10 lg:mb-0  md:w-3/6  lg:w-4/6 w-5/6 ">
                                <div className="w-full h-28 rounded-lg bg-white shadow-lg border flex p-4">
                                    <div className="w-5/6 flex items-start justify-center h-full flex-col">
                                        <span className="text-menu text-3xl font-bold">{currencyFormat(purchase && purchase?.purchases) || 0} </span>
                                        <p className="text-black text-md font-semibold">Tu cantidad en compras</p>
                                    </div>
                                    <div className="w-2/6 flex items-center justify-center">
                                        <img
                                            src="./image/circlerow.svg"
                                            className="w-10 h-10"
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-28 rounded-lg bg-white shadow-lg border flex p-4">
                                    <div className="w-5/6 flex items-start justify-center h-full flex-col">
                                        <span className="text-menu text-3xl font-bold">{currencyFormat(purchase && purchase?.sales) || 0}</span>
                                        <p className="text-black text-md font-semibold">Tu cantidad en ventas</p>
                                    </div>
                                    <div className="w-2/6 h-full flex items-center justify-center">
                                        <img
                                            src="./image/circlerow2.svg"
                                            className="w-10 h-10"
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <Prices />


                        </div>

                    </>



                    :
                    <div className="flex flex-col justify-start items-center lg:mt-12 ">
                        <div className="w-full flex items-center justify-center w-full lg:w-10/12">
                            <EnableCount
                                state={statusUser}
                            />
                        </div>


                        <div className="w-full flex justify-center flex-col items-center mt-6">
                            <div className="lg:w-5/6 w-full text-center px-8 lg:px-4 my-4 text-sm text-grey flex items-center justify-center">
                                <p className="lg:w-5/6 w-full ">Obtén el nivel de verificación y podrás comprar tus primeras criptomonedas. Podrás abonar y retirar hasta el equivalente de <span className='font-semibold px-1'>1.000 USD en tu moneda local.</span>
                                    Una vez aprobada tu verificación básica, podrás optar a la verificación avanzada y así operar sin limites
                                </p>
                            </div>

                            <div className="lg:w-10/12 w-11/12 mt-6 mb-24 lg:mb-0">

                                {statusUser && statusUser === 'waiting' ?
                                    < Validations
                                        typeUser={typeUser}
                                        dataUser={user}
                                    />
                                    : ''
                                }
                            </div>
                        </div>
                    </div>

                }


            </main>
        </MainLayout>

    )
}

