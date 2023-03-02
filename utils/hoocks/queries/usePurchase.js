import React, { useContext, useState } from 'react'
import { Purchase } from '../../../provider/api/user.queries';
import { Context } from '../../../provider/user/context';
import { myRound } from '../../helpers';
import useConvert from '../useConvert';

const usePurchase = () => {

    const [load, setLoad] = useState(false);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { countrySelect } = useContext(Context);
    const { quantityCalcule, setQuantityCalcule } = useContext(Context);
    const { openChat, setOpenChat } = useContext(Context);
    const { valueCurrency } = useContext(Context);
    const { valueCrypto } = useContext(Context);

    const { convert } = useContext(Context);
    const { commission } = useContext(Context);



    const purchase = async (purchaseType, networks) => {

        let value = 0;
        let quantity = 0;

        if (!convert) {
            value = valueCurrency;
            quantity = valueCrypto;

        } else {
            value = valueCurrency,
                quantity = valueCrypto
        }


        const data = {
            crypto: {
                cryptoId: userPurchase?.currency?._id,
                quantity: myRound(quantity)
            },
            account: {
                bank: userPurchase?.bank?.name,
                number: userPurchase?.number,
                typeAccount: userPurchase?.typeAccount?.name,
                userName: userPurchase?.userName,
                nit: userPurchase?.nit
            },
            commission: commission,
            wallet: userPurchase.wallet,
            paymentMethod: userPurchase?.typeSale || 'efectivo',
            purchaseType: userPurchase?.operation || purchaseType,
            currency: countrySelect.currency,
            network: networks,
            value: value,
            country: countrySelect._id
        }





        setLoad(true);
        const res = await Purchase(data);
        if (res) {
            setLoad(false);
            localStorage.removeItem('purchase'); // elimina items de local storage
            setOpenChat(true);
            // getCryptoList();
            return res;
        } else {

            setLoad(false);

        }
    }


    return { purchase, load }
}

export default usePurchase
