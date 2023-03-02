import React, { useContext, useState } from 'react'
import { getPriceCurrency, getPriceCurrencyInverse } from '../../provider/api/currency.queries';
import { Context } from '../../provider/user/context';
import { myRound } from '../helpers';

const useConvert = () => {

    const { quantityCalcule, setQuantityCalcule } = useContext(Context);
    const { setLoadCalculator } = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const [convert, setConvert] = useState(false);
    const { commission, setCommission } = useContext(Context);
    const { valueCurrency, setValueCurrency } = useContext(Context);
    const { valueCrypto, setValueCrypto } = useContext(Context);
    const { countrySelect } = useContext(Context);




    // convertidor de moneda a crypto 
    const calculeCurrencyToCrypto = async (typeTrasaction) => {
        const payload = {
            currency: countrySelect?.currency,
            crypto: userPurchase?.currency?.code,
            quantity: valueCurrency,
            typeTrasaction: typeTrasaction,
        }

        setQuantityCalcule('');
        setLoadCalculator(true);

        const res = await getPriceCurrencyInverse(payload, countrySelect?._id, typeTrasaction);
        if (res) {
            console.log(res);
            setQuantityCalcule(res?.data);
            setCommission(res?.data?.commission);
            setValueCrypto(myRound(res?.data?.value));
            setLoadCalculator(false)
            return res.data;

        } else {
            setValueCrypto('');
        }
    }


    //convertidor de crypto a moneda 
    const calculeToCurrency = async (typeTrasaction) => {

        const payload = {
            currency: countrySelect?.currency,
            crypto: userPurchase?.currency?.code,
            quantity: valueCrypto, /// valorque debo enviar crypto
            typeTrasaction: typeTrasaction,
        }
        setLoadCalculator(true);

        const res = await getPriceCurrency(payload, countrySelect?._id, typeTrasaction);
        if (res) {
            console.log(res);
            setQuantityCalcule(res?.data);
            setCommission(res?.data?.commission);
            setValueCurrency(myRound(res?.data?.value));
            setLoadCalculator(false)
            return res.data;

        } else {
            setValueCurrency('');
        }
    }


    return { calculeCurrencyToCrypto, calculeToCurrency, convert, setConvert };

}

export default useConvert
