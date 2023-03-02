import React, { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Select2 from '../Ui/Select2'
import { getCrypto, getPriceCurrency } from '../../provider/api/currency.queries';
import Input from '../Ui/Input';
import { Context } from '../../provider/user/context';
import { useDebouncedCallback, useDebounce } from 'use-debounce';
import InputMaskUi from '../Ui/InputMask';
import InputMask from 'react-input-mask';
import Select from '../Ui/Select';
import { myRound } from '../../utils/helpers';
import InputPublic from '../Ui/InputPublic';
import SelectCurrency from '../Currencys/SelectCurrency';
import Purchase from './PublicTransactions/Purchase';
import Sale from './PublicTransactions/Sale';
import Converter from '../ConverterPrice/Converter';

const schema = yup.object({
    wallet: yup.string().required("Nombre es requerido"),
    quantity: yup.string().required("Dirección es requerida"),
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});

const PurchasePublicForm = ({ currency, tab, }) => {

    const { quantityCalcule, setQuantityCalcule } = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { countrySelect } = useContext(Context);
    const [valueCalcule] = useDebounce(userPurchase?.value, 1000);
    const [load, setLoad] = useState(false);


    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });




    const getPrice = async (value) => {
        setQuantityCalcule('');
        const payload = {
            currency: countrySelect?.currency,
            crypto: userPurchase?.currency?.code,
            quantity: value,
            typeTrasaction: tab
        }
        setLoad(true)
        if (value > 0) {
            const res = await getPriceCurrency(payload)
            if (res) {
                setQuantityCalcule(res?.data?.quantity);
            }
            setLoad(false);
        }
    };



    useEffect(() => {
        if (userPurchase?.value) {
            getPrice(userPurchase?.value);
        }
    }, [valueCalcule, countrySelect, tab]);


    useEffect(() => {
        if (countrySelect?.name === 'Colombia') {
            setUserPurchase({ ...userPurchase, typeSale: 'banco' });
        }
    }, [setUserPurchase, countrySelect, userPurchase?.operation]);


    const typeSale = [
        {
            name: 'banco',
        },
        {
            name: 'efectivo'
        }
    ];



    return (
        <>{tab === 'purchase' ?
            < Purchase
                tab={tab}
            />

            :

            <Sale
                tab={tab}
            />

        }
            <Converter
                tab={tab}
            />

        </>
    )
}

export default PurchasePublicForm