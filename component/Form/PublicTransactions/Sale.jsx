import React, { useContext, useEffect, useState } from 'react'
import { getCrypto } from '../../../provider/api/currency.queries';
import { Context } from '../../../provider/user/context';
import Select2 from '../../Ui/Select2';
import ConverFormPublic from '../../ConverterPrice/ConverFormPublic';

const Sale = ({ tab }) => {

    const [Crypto, setCrypto] = useState([]);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { networks, setNetworks } = useContext(Context);
    const { countrySelect } = useContext(Context);

    const getCryptoList = async () => {
        const res = await getCrypto();
        if (res) {
            setCrypto(res?.data);
            const cryto = res?.data.find((c) => c.code === 'USDT');
            setUserPurchase({ ...userPurchase, currency: cryto })
        }
    }
    useEffect(() => {
        getCryptoList();
        const cryto = Crypto.find((c) => c.code === 'USDT');
        setUserPurchase({ ...userPurchase, currency: cryto })
    }, [setCrypto, setUserPurchase]);



    const hanldeChangeCurrency = (e) => {
        if (e?.code !== userPurchase?.currency?.code) {
            setUserPurchase({ ...userPurchase, currency: e })
            setNetworks('');
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('purchase')) {

        } else {
            setUserPurchase(JSON.parse(localStorage.getItem('purchase')));
        }
    }, []);


    return (

        <form className="flex flex-col items-center justify-center  w-full space-y-2">

            <Select2
                id='currency'
                className={`w-full rounded-lg `}
                width={'w-36'}
                px={2}
                colorLabel="text-purchase"
                value={userPurchase && userPurchase.currency?.name}
                icon={userPurchase && userPurchase.currency?.image}
                defaultValue={(userPurchase && userPurchase.currency?.name)}
                onChange={hanldeChangeCurrency}
                items={Crypto}
                label='Seleccione moneda'
                placeholder='Seleccione moneda'
            // register={register}
            // constol={control}
            />
            <Select2
                id='bank'
                placeholder='Selecciona banco'
                label='Selecciona banco'
                colorLabel="text-purchase"
                className="w-full rounded-lg"
                width={"w-72"}
                px={4}
                value={userPurchase && userPurchase?.bank?.name}
                defaultValue={(userPurchase && userPurchase?.bank?.name)}
                onChange={(e) => setUserPurchase({ ...userPurchase, bank: e })}
                items={countrySelect?.banks}


            />
            <Select2
                id='typeAccount'
                placeholder='Selecciona tipo de cuenta'
                label='Selecciona tipo de cuenta'
                colorLabel="text-purchase"
                className="w-full rounded-lg"
                width={"w-36"}
                px={4}
                value={userPurchase && userPurchase?.typeAccount?.name}
                defaultValue={(userPurchase && userPurchase?.typeAccount?.name)}
                // icon={userPurchase && userPurchase.typeAccount?.icon}
                onChange={(e) => setUserPurchase({ ...userPurchase, typeAccount: e })}
                items={[
                    {
                        name: 'Ahorros'
                    },
                    {
                        name: 'Corriente'
                    }
                ]}

            />
            <div className='w-full'>
                <label className={`text-md font-semibold text-purchase `}>Numero de cuenta</label>
                <input
                    id='number'
                    name='number'
                    placeholder='Numero de cuenta'
                    label="Dirección wallet"
                    // colorLabel="text-purchase"
                    // defaultValue={userPurchase && userPurchase.wallet}
                    value={userPurchase && userPurchase.number}
                    onChange={(e) => setUserPurchase({ ...userPurchase, number: e.target.value })}
                    type='text'
                    // control={control}
                    // register={register}
                    required={true}
                    className={' border border-[#a3a3a3ad] h-12 w-full pl-4 rounded-lg bg-white text-black'}
                />
            </div>
            <div className='w-full'>
                <label className={`text-md font-semibold text-purchase `}>Nombre de usuario</label>
                <input
                    id='userName'
                    name='userName'
                    placeholder='Nombre de titular'
                    // label="Dirección wallet"
                    // colorLabel="text-purchase"
                    // defaultValue={userPurchase && userPurchase.wallet}
                    value={userPurchase && userPurchase.userName}
                    onChange={(e) => setUserPurchase({ ...userPurchase, userName: e.target.value })}
                    type='text'
                    // control={control}
                    // register={register}
                    required={true}
                    className={' border border-[#a3a3a3ad] h-12 w-full pl-4 rounded-lg bg-white text-black'}
                />

            </div>
            <div className='w-full'>
                <label className={`text-md font-semibold text-purchase `}>Numero de documento</label>
                <input
                    id='nit'
                    name='nit'
                    placeholder='Cédula o Nit'
                    // label="Dirección wallet"
                    // colorLabel="text-purchase"
                    // defaultValue={userPurchase && userPurchase.wallet}
                    value={userPurchase && userPurchase.nit}
                    onChange={(e) => setUserPurchase({ ...userPurchase, nit: e.target.value })}
                    type='text'
                    // control={control}
                    // register={register}
                    required={true}
                    className={' border border-[#a3a3a3ad] h-12 w-full pl-4 rounded-lg bg-white text-black'}
                />


            </div>

            {/* <ConverFormPublic
                tab={tab}
            /> */}


        </form>
    )
}

export default Sale