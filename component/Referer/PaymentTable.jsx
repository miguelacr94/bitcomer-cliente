import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { getReferred } from '../../provider/api/user.queries';
import { Icons } from '../../utils/icons';
import LoadTable from '../Ui/LoadTable';

const PaymentTable = () => {

    const [payment, setPayment] = useState(null);
    const [load, setLoad] = useState(false);

    const PaymentTitle = ['#', 'Referido', 'Correo electrónico', 'Fecha'];


    const Mypayment = async () => {
        setLoad(true);
        const res = await getReferred('paid');
        if (res) {
            setPayment(res?.data);
            setLoad(false);
        } else {
            setLoad(false);
        }
    };
    useEffect(() => {
        Mypayment();
    }, [setPayment]);


    return (
        <div className={` shadow-lg rounded-3xl  p-4 mt-6 w-full `}>
            <div className="w-full flex lg:flex-row flex-col">
                <div className="lg:w-4/6 w-full flex space-x-6 items-center ">
                    <p className="text-black font-bold  text-xl">Detalles de tus pagos por referidos</p>
                    {/* <FilterDate /> */}
                </div>

            </div>
            {!load ?
                <>
                    {payment && payment.length > 0 ?
                        <div className="w-full hidden lg:block max-h-[400px] overflow-y-auto">
                            <table className="w-full mt-4  ">
                                <thead className="">
                                    <tr className=" text-grey-head  ">
                                        {PaymentTitle.map((item, index) => {
                                            return (
                                                <th key={index} className="text-start h-8 pl-6 font-light text-sm">{item}</th>
                                            )
                                        })}

                                    </tr>
                                </thead>
                                <tbody className="rowAlternate">

                                    {
                                        payment && payment.map((data, index) => {
                                            return (
                                                <tr key={index} onClick={''} className="h-8 text-xs font-semibold  text-dataTable cursor-pointer">
                                                    <td className="pl-6 ">{index + 1}</td>
                                                    <td className="pl-6 ">{data?.referred?.fullName}</td>
                                                    <td className="pl-6 ">{data?.referred?.email}</td>

                                                    <td className="pl-6">
                                                        <div className='flex items-center space-x-1'>
                                                            <p>{Icons.calendar}</p>
                                                            <p> {moment(data?.createdAt).format('L')}</p>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                        :

                        <p className='mt-8 text-grey'>No se encontraron registros ...</p>


                    }
                </>
                :
                <LoadTable />


            }




        </div >
    )
}

export default PaymentTable
