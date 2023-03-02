import React from 'react'
import moment from 'moment';
import { useContext } from 'react';
import { Context } from '../../provider/user/context';
import { Icons } from '../../utils/icons';
import { currencyFormat, myRound } from '../../utils/helpers';
import FormGiro from '../Form/FormGiro';

const OrderGiroFinish = () => {

    const { formGiro } = useContext(Context);
    const { quantityCalculeGiro } = useContext(Context);
    const { countrySelect } = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { valueCrypto } = useContext(Context);
    const { valueCurrency } = useContext(Context);
    const { commission } = useContext(Context);

    return (
        <div className=" w-full  lg:ml-4 lg:mr-4 border border-menu rounded-3xl  text-start pt-4 px-2 lg:px-8 lg:mt-0 mt-8 pb-12 mb-12 overflow-x-hidden">
            <h2 className="font-semibold text-xl text-menu">Orden final</h2>
            <div className="flex mt-4">
                <p className="w-3/6 text-start text-sm text-menu font-semibold text-order">Fecha:</p>
                <p className="w-3/6 text-end  text-sm text-grey-light -ml-4">{moment().format('L')}</p>
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
            <div className="flex mt-4 items-center">
                <p className="w-4/6 text-start text-sm  text-menu font-semibold text-order">Cantidad en criptomoneda:</p>
                <p className="w-2/6 text-end  text-sm text-grey-light  -ml-4 flex justify-end items-center space-x-2">
                    <span>{formGiro?.quantity}</span> <span>{Icons.coin}</span> </p>
            </div>
            <div className="flex mt-4">
                <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">Descuento:</p>
                <p className={` w-4/6 text-end  text-end  text-sm  -ml-4 font-semibold
                ${quantityCalculeGiro?.rate > 0 ? 'text-green-400' : 'text-red-400'}
                
                `}>{quantityCalculeGiro ? quantityCalculeGiro?.rate : 0}%</p>
            </div>
            <div className="flex mt-4">
                <p className="w-2/6 text-start text-sm  text-menu font-semibold text-order">Monto a recibir:</p>
                <p className="w-4/6 text-end  font-bold text-xl text-totalOrder">{quantityCalculeGiro ? currencyFormat(quantityCalculeGiro?.value) : currencyFormat(0)} {countrySelect?.currency} </p>
            </div>
        </div>

    )
}

export default OrderGiroFinish
