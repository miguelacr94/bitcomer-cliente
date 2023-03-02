import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import { Context } from '../../provider/user/context';
import { Routes } from '../routes';

const useExternalPurchase = () => {

    const { userPurchase } = useContext(Context);
    const { networks } = useContext(Context);
    const { commission } = useContext(Context);
    const { valueCurrency } = useContext(Context);
    const { countrySelect } = useContext(Context);

    const router = useRouter();

    const purchaseExternal = (data) => {

        if (data?.purchaseType === 'purchase') {
            const payload = {
                wallet: userPurchase?.wallet,
                purchaseType: data?.purchaseType,
                networks: networks,
                paymentMethod: data?.paymentMethod,
                commission: commission,
                valueCurrency: valueCurrency,
                currency: countrySelect.currency,
                crypto: {
                    cryptoId: userPurchase?.currency?._id,

                },

            }
            localStorage.setItem('purchase', JSON.stringify(payload));
            router.push(Routes.login);
        } else {
            const payload = {
                purchaseType: data?.purchaseType,
                userName: userPurchase?.userName,
                number: userPurchase.number,
                bank: {
                    name: userPurchase.bank.name,
                },
                typeAccount: {
                    name: userPurchase?.typeAccount?.name
                },
                nit: userPurchase.nit,
                commission: commission,
                valueCurrency: valueCurrency,
                currency: countrySelect.currency,
                crypto: {
                    cryptoId: userPurchase?.currency?._id,

                },
            }
            localStorage.setItem('purchase', JSON.stringify(payload));
            router.push(Routes.login);
        }



    }

    return { purchaseExternal }
}

export default useExternalPurchase