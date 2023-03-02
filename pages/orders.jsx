import React, { useState } from 'react';
import OrderGiro from '../component/Giro/OrderGiro';
import MainLayout from '../component/Layouts/MainLayout';
import DetailsOrders from '../component/Orders/DetailsOrders';
import OtcDetails from '../component/Otc/OtcDetails';
import TableOrders from '../component/tables/TableOrders';
import { Icons } from '../utils/icons';
const data = [
    { data: 'data.codigo' },
    { data: 'data.comentario' },
    { data: 'data.estado' },
    { data: 'data.fecha' },
]


const Orders = () => {

    const [orderSelected, setOrderSelected] = useState(null);

    return (
        <MainLayout >
            <div className="overflow-auto  py-2 lg:pl-12 lg:pr-16 pb-8 lg:px-0 px-2 lg:h-window">
                <h2 className=" font-bold ml-2 text-md text-menu mt-12 ">Ordenes</h2>

                {!orderSelected &&
                    <TableOrders
                        onSelectedOrder={(e) => setOrderSelected(e)}
                    />
                }
                {orderSelected?.purchaseType === 'venta' &&
                    <>
                        <div className='w-full'>
                            <p onClick={() => setOrderSelected('')} className="underline cursor-pointer text-grey-light text-start mt-4 ml-4 flex items-center">{Icons.back}Atrás</p>
                        </div>
                        <DetailsOrders
                            detailOrder={orderSelected}
                        />

                    </>
                }

                {orderSelected?.purchaseType === 'compra' &&
                    <>
                        <div className='w-full'>
                            <p onClick={() => setOrderSelected('')} className="underline cursor-pointer text-grey-light text-start mt-4 ml-4 flex items-center">{Icons.back}Atrás</p>
                        </div>
                        <DetailsOrders
                            detailOrder={orderSelected}
                        />

                    </>
                }



                {orderSelected?.purchaseType === 'otc' &&
                    < OtcDetails
                        detailOtc={orderSelected}
                        onBack={() => setOrderSelected('')}
                    />
                }



                {
                    orderSelected?.purchaseType === 'giro' &&
                    <OrderGiro
                        setRes={orderSelected}
                        onBack={() => setOrderSelected('')}
                    />
                }



            </div>
        </MainLayout >
    )
}

export default Orders