import React, { useContext, useEffect, useState } from 'react'
import { getPurchaseMe } from '../../provider/api/user.queries';
import { Orders } from '../../utils/data'
import { capitalizer, currencyFormat, States } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import Pagination from '../Ui/Pagination';
import moment from 'moment';
import { Context } from '../../provider/user/context';
import { useDebounce } from 'use-debounce';
import LoadTable from '../Ui/LoadTable';
moment().format();

const TableOrders = ({ onSelectedOrder }) => {


    const [order, setOrders] = useState([]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { currency } = useContext(Context);
    const [search, setSearch] = useState(null);
    const [valueCalcule] = useDebounce(search, 500);




    const getPurschase = async (search) => {
        setLoad(true);
        const res = await getPurchaseMe(page, search);

        if (res) {
            setOrders(res?.data?.docs);
            setTotalPages(res?.data?.totalPages)
            setLoad(false);
        } else {
            setTimeout(() => {
                setLoad(false);
            }, 3000)
        }

    };


    const onPageChange = (e) => {
        setPage(e.selected + 1);
        // getPurschase();
    };


    useEffect(() => {
        getPurschase();
    }, [page, setPage]);


    useEffect(() => {
        getPurschase();
    }, [setOrders]);


    useEffect(() => {
        if (search) {
            getPurschase(search);

        } else {
            getPurschase();
        }

    }, [valueCalcule]);



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
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="search"
                            placeholder='Buscar orden'
                            className="pl-2 placeholder:pl-2 outline-none placeholder:text-sm w-52 text-sm bg-grey-testimonial"
                        />

                    </div>
                    {/* <button className="w-8 h-8 text-2xl ">{Icons.list}</button>
                    <button className="w-8 h-8 text-xl">{Icons.grid}</button> */}
                </div>

            </div>
            {!load ?
                <>
                    {order && order.length > 0 ?
                        <div className="w-full hidden lg:block">
                            <table className="w-full mt-4  ">
                                <thead className="">
                                    <tr className=" text-grey-head  ">
                                        {Orders.map((item, index) => {
                                            return (
                                                <th className="text-start h-8 pl-6 font-light text-sm">{item.name}</th>
                                            )
                                        })}

                                    </tr>
                                </thead>
                                <tbody className="rowAlternate">

                                    {
                                        order && order.map((data, index) => {
                                            return (
                                                <tr key={index} onClick={() => onSelectedOrder(data)} className="h-8 text-xs font-semibold  text-dataTable cursor-pointer">
                                                    <td className="pl-6 ">{index + 1}</td>
                                                    <td className="pl-6 ">{data.code}</td>
                                                    <td className="pl-6">
                                                        <div className='flex items-center space-x-1'>
                                                            <p className='text-md'>{data?.purchaseType === 'venta' ? Icons.sale : Icons.purchase}</p>
                                                            <p>{data?.purchaseType}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-6">
                                                        <div className='flex items-center space-x-1'>
                                                            <p className={`w-4 h-4 rounded-full 
                                            ${States(data?.status)}
                                            `}></p>

                                                            <p>{data.status}</p>
                                                        </div>

                                                    </td>
                                                    <td className="pl-6">
                                                        <div className='flex items-center space-x-1'>
                                                            <p>{Icons.calendar}</p>
                                                            <p> {moment(data?.createdAt).format('L')}</p>
                                                        </div>
                                                    </td>
                                                    <td className="pl-6">{

                                                        <div className='flex items-center space-x-1'>
                                                            <img src={data?.crypto?.cryptoId?.image}
                                                                className="w-4 h-4"
                                                            />
                                                            <p> {data?.crypto?.cryptoId?.code}</p>
                                                        </div>
                                                    }</td>
                                                    <td className="pl-6">
                                                        <div className='flex items-center  space-x-1'>
                                                            <p>
                                                                {Icons.coin}
                                                            </p>
                                                            <p>
                                                                {data?.crypto?.quantity}
                                                            </p>
                                                        </div>

                                                    </td>
                                                    <td className="pl-6">{currencyFormat(data?.value)}</td>
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

export default TableOrders