import React, { useContext, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { Context } from '../../provider/user/context';
import useConvert from '../../utils/hoocks/useConvert';
import { Icons } from '../../utils/icons';
import { currencyFormat } from '../../utils/helpers';

const ConverFormToCurrency = ({ tab, onSelectConvert }) => {


    const { convert, setConvert, calculeCurrencyToCrypto, calculeToCurrency } = useConvert();

    const { userPurchase, setUserPurchase } = useContext(Context);
    const { valueCurrency, setValueCurrency } = useContext(Context);
    const { countrySelect } = useContext(Context);
    const [load, setLoad] = useState(false);
    const { valueCrypto, setValueCrypto } = useContext(Context);
    const [valueCalcule] = useDebounce(valueCrypto, 1000);

    const ConvertToCryto = async (valueCripto) => {
        setLoad(true);
        const res = await
            calculeToCurrency(tab);
        res ? setLoad(false) : setLoad(false);

    }


    useEffect(() => {

        if (valueCrypto > 0) {
            ConvertToCryto(valueCrypto);
        }
        // calculePrice(userPurchase?.value);

    }, [valueCalcule, countrySelect, tab, userPurchase?.currency]);

    return (
        <div className='w-full mt-2'>

            <div className='flex space-x-4 items-end justify-center'>
                <div
                    className='w-full'>
                    <label
                        className={`text-md font-semibold text-purchase `}>Cantidad en {userPurchase?.currency?.name}</label>
                    <input
                        id='crypto'
                        name='crypto'
                        // label={` 
                        //             ${countrySelect?.currency === 'COP' ? 'Monto en pesos colombianos' :
                        //     countrySelect?.name === 'El Salvador' && typeTrasaction === 'sale' ? '¿Quieres recibir cuantos dólares?' :
                        //       'Monto en dólar estadounidense'}`}
                        colorLabel="text-purchase"
                        value={
                            valueCrypto && valueCrypto}

                        onChange={(e) => setValueCrypto(e.target.value)}
                        placeholder={`Monto en ${userPurchase?.currency?.name}`}
                        type='text'
                        className={' border border-[#a3a3a3ad] h-12 w-full pl-4 rounded-lg bg-white text-black'}
                        mask={convert ? '' : '999999999999'}
                        signo={'$'}
                        onClick={() => setConvert(false)}
                    />
                </div>
                <button
                    className='bg-menu text-white h-12 w-32 text-2xl rounded-md flex justify-center items-center'
                    onClick={() => onSelectConvert()}>{Icons.converter}</button>
            </div>

            <div className='flex items-center mt-6 text-[#747474] text-lg'>
                <span className='flex justify-start items-center space-x-1'>
                    <p>Recibirás en {countrySelect?.currency}</p>
                    <img
                        className='w-5 h-5 rounded-full'
                        src={countrySelect?.flag} />
                </span>
                <i className="mx-4  text-xl  text-grey-bTab cursor-pointer ">{Icons.Arrows}</i>
                <span className='font-semibold'>{valueCurrency ? currencyFormat(valueCurrency) : 0}</span>
            </div>

        </div>
    )
}

export default ConverFormToCurrency