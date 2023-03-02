import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Context } from '../../../provider/user/context';
import SelectCurrency from '../../Currencys/SelectCurrency';

const Purchase = ({ tab }) => {


    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { userPurchase, setUserPurchase } = useContext(Context);




    return (

        <form className="flex flex-col items-center justify-center  w-full space-y-2 w-full">
            <div className='w-full'>
                <label className={`text-md font-semibold text-purchase `}>Dirección wallet</label>
                <input
                    id='wallet'
                    name='wallet'
                    placeholder='Dirección wallet'
                    label="Dirección wallet"
                    // colorLabel="text-purchase"
                    // defaultValue={userPurchase && userPurchase.wallet}
                    value={userPurchase && userPurchase.wallet}
                    onChange={(e) => setUserPurchase({ ...userPurchase, wallet: e.target.value })}
                    type='text'
                    // control={control}
                    // register={register}
                    required={true}
                    className={' border border-[#a3a3a3ad] h-12 w-full pl-4 rounded-lg bg-white text-black'}
                />
            </div>


            <SelectCurrency
                className={'bg-white'}
            />

            {/* <ConverFormPublic
                tab={tab}
            /> */}
            {/* <ConverFormToCurrency
                tab={tab}
            /> */}


        </form>
    )
}

export default Purchase