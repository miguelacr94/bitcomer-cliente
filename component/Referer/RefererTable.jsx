import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getReferred } from '../../provider/api/user.queries';
import { currencyFormat } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import { Routes } from '../../utils/routes';
import LoadTable from '../Ui/LoadTable';

const RefererTable = () => {

    const [referred, setReferred] = useState(null);
    const [load, setLoad] = useState(null);
    const order = null;
    const ReferredTitle = ['#', 'Referido', 'Correo electrónico', 'Fecha'];
    const router = useRouter();

    const MyReferred = async () => {
        setLoad(true);
        const res = await getReferred();
        if (res) {
            setReferred(res?.data);
            setLoad(false);
        } else {
            setLoad(false);
        }
    };


    useEffect(() => {
        if (!router?.query?.page) {
            router.replace(Routes.referer + '/?page=1')
        }
    })

    useEffect(() => {
        MyReferred();
    }, [setReferred, router?.query]);

    return (
        <div className={` shadow-lg rounded-3xl  p-4 mt-6 w-full `}>
            <div className="w-full flex lg:flex-row flex-col">
                <div className="lg:w-4/6 w-full flex space-x-6 items-center ">
                    <p className="text-black font-bold  text-xl">Detalles de tus Referidos</p>
                    {/* <FilterDate /> */}
                </div>

            </div>
            {!load ?
                <>
                    {referred && referred.length > 0 ?
                        <div className="w-full hidden lg:block max-h-[400px] overflow-y-auto">
                            <table className="w-full mt-4  ">
                                <thead className="">
                                    <tr className=" text-grey-head  ">
                                        {ReferredTitle.map((item, index) => {
                                            return (
                                                <th key={index} className="text-start h-8 pl-6 font-light text-sm">{item}</th>
                                            )
                                        })}

                                    </tr>
                                </thead>
                                <tbody className="rowAlternate">

                                    {
                                        referred && referred.map((data, index) => {
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

            <div className="full space-y-3  flex justify-center items-center  mt-8 grid grid-cols-1 gap-1 lg:hidden block">
                {order && order.map((data, index) => {
                    return (
                        <div onClick={() => onSelectedOrder(data)} key={index} className="w-full  pt-8 rounded-xl shadow-md border p-6 space-y-3">
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Código:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{data?.code}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Operación:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{data && capitalizer(data?.purchaseType)}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Estado:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{data && capitalizer(data?.status)}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Fecha:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{moment(data?.createdAt).format('L')}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Moneda:</p>
                                <div className="flex w-2/6 space-x-1">

                                    <p className="w-2/6 text-xs font-light text-grey-light">{data?.crypto?.cryptoId?.code}</p>

                                    {
                                        currency && currency[0]?.map((c) => {
                                            if (c.symbol === data?.crypto?.cryptoId?.code) {
                                                return (
                                                    <img
                                                        src={c?.icon}
                                                        className="w-4 h-4"
                                                    />
                                                )
                                            }
                                        })
                                    }

                                </div>

                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Valor:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{currencyFormat(data?.value)}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>


            {
                order && order.length > 0 && (
                    <Pagination totalPages={totalPages} onPageChange={onPageChange} />
                )
            }
        </div >
    )
}

export default RefererTable
