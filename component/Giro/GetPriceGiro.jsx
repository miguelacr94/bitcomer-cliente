
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { getGiroPrice, getPriceCurrency, getPriceCurrencyInverse } from '../../provider/api/currency.queries';
import { Context } from '../../provider/user/context';
import Input from '../Ui/Input';
import InputMaskUi from '../Ui/InputMask';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { currencyFormat } from '../../utils/helpers';


const schema = yup.object({

});


const GetPriceGiro = () => {


    const { formGiro, setFormGiro } = useContext(Context);
    const { countrySelect } = useContext(Context);
    const { userPurchase } = useContext(Context);
    const { quantityCalculeGiro, setQuantityCalculeGiro } = useContext(Context);
    const [load, setLoad] = useState();
    const [valueCalcule] = useDebounce(formGiro?.quantity, 1000);



    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const ConvertToCryto = async (value, valueCripto) => {
        setLoad(true);
        setQuantityCalculeGiro('');
        const payload = {
            country: countrySelect?._id,
            currency: countrySelect?.currency,
            typeTrasaction: 'giro',
            quantity: formGiro?.quantity,
            crypto: userPurchase?.currency?.code
        }

        const res = await
            getGiroPrice(payload, countrySelect?._id);
        if (res) {
            setQuantityCalculeGiro(res?.data)
            setLoad(false);
        }
    }


    useEffect(() => {
        if (formGiro?.quantity && userPurchase?.currency) {
            ConvertToCryto();
        }

    }, [formGiro?.quantity, formGiro?.currency, countrySelect])


    return (
        <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4'>
            <div className='w-full lg:w-3/6'>
                <InputMaskUi
                    id='value'
                    name='value'
                    label={`Cantidad en cripto`}
                    colorLabel="text-purchase"
                    onChange={(e) => setFormGiro({ ...formGiro, quantity: e.target.value })}
                    value={formGiro && formGiro?.quantity}
                    mask='999999999999'


                />
            </div>

            <div className='w-full lg:w-3/6'>
                <Input
                    id='quantity'
                    name='quantity'
                    label={`Monto en ${countrySelect?.currency === 'COP' ? 'peso colombiano' : 'dólar'}`}

                    colorLabel="text-purchase"
                    value={quantityCalculeGiro && currencyFormat(quantityCalculeGiro?.value)}
                    readonly={"readonly"}
                    register={register}
                    control={control}
                />
            </div>

        </div>
    )
}

export default GetPriceGiro
