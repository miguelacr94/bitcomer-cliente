import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { getCrypto } from '../../provider/api/currency.queries';
import { Context } from '../../provider/user/context';
import Select from '../Ui/Select';
import Select2 from '../Ui/Select2'

const SelectCurrency = ({ className }) => {

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({});


    const { userPurchase, setUserPurchase } = useContext(Context);
    const [Crypto, setCrypto] = useState([]);
    const { networks, setNetworks } = useContext(Context);

    const getCryptoList = async () => {
        const res = await getCrypto();
        if (res) {
            setCrypto(res?.data);
            const cryto = res?.data.find((c) => c.code === 'USDT');
            setUserPurchase({ ...userPurchase, currency: cryto })
        }
    }

    const hanldeChangeCurrency = (e) => {
        if (e?.code !== userPurchase?.currency?.code) {
            setUserPurchase({ ...userPurchase, currency: e })
            setNetworks('');
        }
    }


    useEffect(() => {
        if (!localStorage.getItem('purchase')) {
            getCryptoList();
            const cryto = Crypto.find((c) => c.code === 'USDT');
            setUserPurchase({ ...userPurchase, currency: cryto })
        }

    }, [setCrypto, setUserPurchase]);



    useEffect(() => {
        if (localStorage.getItem('purchase')) {

        } else {
            setNetworks(userPurchase?.currency?.networks[0]);
        }

    }, [userPurchase?.currency]);

    return (
        <div className='w-full space-y-2'>
            {/* <Select
            if
            /> */}


            <Select2
                id='currency'
                className={`w-full rounded-lg ${className}`}
                width={'w-36'}
                px={2}
                colorLabel="text-purchase"
                value={userPurchase && userPurchase.currency?.name}
                icon={userPurchase && userPurchase.currency?.image}
                defaultValue={(userPurchase && userPurchase.currency?.name)}
                onChange={hanldeChangeCurrency}
                items={Crypto}
                label='Seleccione moneda '
            // register={register}
            // constol={control}
            />

            <Select2
                id='networks'
                colorLabel="text-purchase"
                className="w-full rounded-lg"
                width={'w-36'}
                px={1}
                value={networks && networks}
                defaultValue={(networks && networks)}
                onChange={(e) => setNetworks(e)}
                items={userPurchase?.currency?.networks || []}
                register={register}
                control={control}
                label='Seleccione red '
            />

        </div>
    )
}

export default SelectCurrency
