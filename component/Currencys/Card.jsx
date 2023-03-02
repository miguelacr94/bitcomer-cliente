import { useRouter } from 'next/router';
import React from 'react'
import { useContext } from 'react';
import { Context } from '../../provider/user/context';
import { currencyFormat } from '../../utils/helpers'
import { Icons } from '../../utils/icons'
import { Routes } from '../../utils/routes';

const Card = ({ price }) => {

    const router = useRouter();

    const { countrySelect } = useContext(Context);
    const onTransaction = (e) => {

        const payload = {
            operation: e,
            currency: {
                name: price.name,
            }
        }
        if (e == 'sale') {
            // setUserPurchase(payload);
            return router.push(Routes.negociations + `?type=sale`);

        } else {
            return router.push(Routes.negociations + `?type=purchase`);
        }


    }

    return (
        <div className='w-64 min-h-64 rounded-lg shadow-xl p-4 flex flex-col justify-center border'>
            <div className='min-w-12 w-24 h-24 min-h-12 m-auto  rounded-full '>
                <img
                    src={price?.image}
                />
            </div>
            <span className='text-center pb-4'>{price.name}</span>
            <div className='grid grid-cols-2 gap-0 '>
                <span className='text-gray-500 text-sm'>
                    Precio compra:
                </span>
                <span className='text-sm font-semibold text-end text-black'>
                    {currencyFormat(price?.purchasePrice, countrySelect?.currency === 'USD' ? 5 : 0)}
                </span>
            </div>
            <div className='grid grid-cols-2 gap-0 mt-3'>
                <span className='text-gray-500 text-sm'>
                    Precio venta:
                </span>
                <span className='text-sm font-semibold text-end text-black'>
                    {currencyFormat(price?.salePrice, countrySelect?.currency === 'USD' ? 5 : 0)}
                </span>
            </div>
            <div className='w-full grid grid-cols-2 gap-2 mt-4'>
                <button
                    onClick={() => onTransaction('purchase')}
                    className='bg-menu px-4 py-1 text-white rounded-lg flex justify-center items-center space-x-1 hover:scale-105'>
                    <span>Comprar</span> <i>{Icons.purchase}</i>
                </button>
                <button
                    onClick={() => onTransaction('sale')}
                    className='bg-menu px-4 py-1 text-white rounded-lg flex justify-center items-center space-x-1 hover:scale-105'>
                    <span>Vender</span> <i>{Icons.sale}</i>
                </button>
            </div>
        </div>
    )
}

export default Card
