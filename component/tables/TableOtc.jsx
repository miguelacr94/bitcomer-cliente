import React from 'react'
import { useState } from 'react'
import { Icons } from '../../utils/icons'
import Pagination from '../Ui/Pagination'
import moment from 'moment';
import { capitalizer, currencyFormat } from '../../utils/helpers';



const TableOtc = ({ otc, data, totalPages, onPageChange, onSelected, query }) => {
    const search = (e) => {
        query(e)
    }

    return (
        <div className={` shadow-lg rounded-3xl  p-4 mt-6 w-full `}>
            <div className="w-full flex lg:flex-row flex-col">
                <div className="lg:w-4/6 w-full flex space-x-6 items-center ">
                    <p className="text-black font-bold  text-xl">Detalles de tus Ordenes</p>
                    {/* <FilterDate /> */}
                </div>

                <div className="lg:w-2/6 w-full flex justify-end items-center space-x-3 h-6 mt-2 text-grey-placeholder2 ">
                    <div className="border-r-3 flex items-center w-full lg:mt-0 mt-4 ">
                        <p>{Icons.search}</p>
                        <input
                            name="search"
                            onChange={(e) => search(e.target.value)}
                            // value={search}
                            type="search"
                            placeholder='Buscar orden'
                            className="pl-2 placeholder:pl-2 outline-none placeholder:text-sm w-52 text-sm bg-grey-testimonial"
                        />

                    </div>
                    {/* <button className="w-8 h-8 text-2xl ">{Icons.list}</button>
            <button className="w-8 h-8 text-xl">{Icons.grid}</button> */}
                </div>

            </div>
            {otc && otc.length > 0 ?
                <div className="w-full hidden lg:block">
                    <table className="w-full mt-4  ">
                        <thead className="">
                            <tr className=" text-grey-head  ">
                                {otc.map((item, index) => {
                                    return (
                                        <th className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                                    )
                                })}

                            </tr>
                        </thead>
                        <tbody className="rowAlternate">

                            {
                                data && data?.map((d, index) => {
                                    return (
                                        <tr key={index} onClick={() => onSelected(d)} className="h-8 text-xs font-semibold  text-dataTable cursor-pointer">
                                            <td className="pl-6 ">{index + 1}</td>
                                            <td className="pl-6 ">{d.code}</td>
                                            <td className="pl-6">{d?.TransferType}</td>
                                            <td className="pl-6 ">
                                                <div className='flex items-center space-x-2'>
                                                    <p className={`w-4 h-4 rounded-full 
                                            ${d?.status === 'pendiente' ? 'bg-yellow-400' :
                                                            d?.status === 'completado' ? 'bg-green-400' :
                                                                d?.status === 'declinada' ? 'bg-red-400' :
                                                                    ''}
                                            `}></p>
                                                    <p>{d.status}</p>
                                                </div>
                                            </td>
                                            <td className="pl-6">
                                                <div className='flex items-center space-x-1'>
                                                    <p>{Icons.calendar}</p>
                                                    <p> {moment(d?.createdAt).format('L')}</p>
                                                </div>

                                            </td>
                                            <td className="pl-6">
                                                <div className='flex items-center space-x-1'>
                                                    <img
                                                        src={d?.crypto?.cryptoId?.image}
                                                        className='w-4 h-4'
                                                    />
                                                    <p> {d?.crypto?.cryptoId?.code}</p>
                                                </div>


                                            </td>
                                            <td className="pl-6">{d?.crypto?.quantity}</td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
                : <p className='mt-4 text-grey font-semibold text-xl text-center'>Sin ventas OTC</p>
            }

            <div className="full space-y-3  flex justify-center items-center  mt-8 grid grid-cols-1 gap-1 lg:hidden block">
                {data && data.map((data, index) => {
                    return (
                        <div onClick={() => onSelected(data)} key={index} className="w-full  pt-8 rounded-xl shadow-md border p-6 space-y-3">
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Código:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{data?.code}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">Operación:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{data && capitalizer(data?.TransferType)}</p>
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

                                    <img
                                        src={data?.crypto?.cryptoId?.image}
                                        className='w-4 h-4'
                                    />

                                </div>

                            </div>
                            <div className="flex items-center">
                                <p className="w-4/6 text-sm font-semibold text-dataTable">valor:</p>
                                <p className="w-2/6 text-xs font-light text-grey-light">{data?.crypto?.quantity}</p>
                            </div>
                        </div>
                    )
                }
                )}
            </div>


            {data && data.length > 0 && (
                <Pagination totalPages={totalPages} onPageChange={onPageChange} />
            )}
        </div>
    )
}

export default TableOtc