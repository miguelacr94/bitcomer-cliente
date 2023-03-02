import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import FormGiro from '../component/Form/FormGiro'
import OrderGiro from '../component/Giro/OrderGiro'
import OrderGiroFinish from '../component/Giro/OrderGiroFinish'
import MainLayout from '../component/Layouts/MainLayout'
import { getSucursal } from '../provider/api/home.queries'
import { Context } from '../provider/user/context'


const giro = () => {



    const [sucursal, setSucursal] = useState(null);
    const { countrySelect, } = useContext(Context);
    const [resGiro, setResGiro] = useState(null); //recibe respuesta del registro
    const { quantityCalculeGiro } = useContext(Context);
    const { userPurchase } = useContext(Context);

    const getAllSucursar = async () => {
        const res = await getSucursal(countrySelect?._id);
        if (res) {
            console.log(res);
            setSucursal(res.data);

        }
    }


    const bloqueo = false;



    useEffect(() => {
        getAllSucursar();
    }, [setSucursal, countrySelect]);





    return (
        <MainLayout>

            <div className="lg:w-purchase  w-full  flex lg:flex-row flex-col justify-center items-start mt-10 text-blackText pb-8  ">

                {!resGiro ?
                    <div className='w-full flex justify-center'>
                        <div className='flex w-full lg:flex-row flex-col lg:pl-12'>
                            <div className='w-full lg:w-7/12 px-2'>
                                <FormGiro
                                    resp={(e) => setResGiro(e)}
                                    dataSucursal={sucursal}

                                />

                            </div>
                            <div className='w-full lg:w-5/12'>
                                <OrderGiroFinish
                                // setRes={resGiro && resGiro}
                                />
                            </div>
                        </div>
                    </div>

                    :

                    <OrderGiro
                        setRes={resGiro}
                        onBack={() => setResGiro('')}
                    />
                }
            </div>

        </MainLayout >
    )
}

export default giro