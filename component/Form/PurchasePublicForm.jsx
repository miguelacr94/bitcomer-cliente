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
    const { networks, setNetworks } = useContext(Context);

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
        <form className="flex flex-col items-center justify-center  w-full">

            {tab === 'purchase' &&
                <InputPublic
                    id='wallet'
                    name='wallet'
                    placeholder='Dirección wallet'
                    // label="Dirección wallet"
                    // colorLabel="text-purchase"
                    defaultValue={userPurchase && userPurchase.wallet}
                    // value={userPurchase && userPurchase.wallet}
                    // onChange={(e) => setUserPurchase({ ...userPurchase, wallet: e.target.value })}
                    type='text'
                    control={control}
                    register={register}
                    required={true}
                />

            }
            <SelectCurrency />
            {tab === 'purchase' &&

                <Select
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

                />
            }

            {tab === 'sale' ?

                <>

                    {countrySelect.name !== 'Colombia' &&
                        < Select2
                            id='typeSale'
                            label='¿Cómo quieres recibir el dinero?'
                            colorLabel="text-purchase"
                            className="w-full"
                            width={"w-72"}
                            px={4}
                            value={userPurchase?.typeSale}
                            defaultValue={userPurchase?.typeSale}
                            onChange={(e) => setUserPurchase({ ...userPurchase, typeSale: e.name })}
                            items={typeSale}
                            register={register}
                            constol={control}

                        />
                    }


                    {userPurchase?.typeSale == 'banco' &&

                        <>
                            <div className="flex flex-col lg:flex-row w-full lg:space-x-4">

                                <Select2
                                    id='bank'
                                    label='Selecciona banco'
                                    className="w-full"
                                    width={"w-48"}
                                    px={4}
                                    colorLabel="text-purchase"
                                    value={userPurchase && userPurchase.bank?.name}
                                    defaultValue={(userPurchase && userPurchase?.bank?.name)}
                                    onChange={(e) => setUserPurchase({ ...userPurchase, bank: e })}
                                    items={countrySelect?.banks}
                                    register={register}
                                    constol={control}
                                // hint={
                                //     errors.fullName?.type === "required" || errors.fullName?.message
                                //         ? errors.fullName?.message
                                //         : ""
                                // }
                                // errors={
                                //     errors.fullName?.type === "required" || errors.fullName?.message
                                //         ? true
                                //         : false
                                // }

                                />



                                <Select2
                                    id='typeAccount'
                                    label='Tipo de cuenta'
                                    className="w-full"
                                    colorLabel="text-purchase"
                                    value={userPurchase && userPurchase.typeAccount?.name}
                                    defaultValue={(userPurchase && userPurchase.typeAccount?.name)}

                                    onChange={(e) => setUserPurchase({ ...userPurchase, typeAccount: e })}
                                    items={[
                                        {
                                            name: 'Ahorros'
                                        },
                                        {
                                            name: 'Corriente'
                                        }
                                    ]}
                                    register={register}
                                    constol={control}
                                // hint={
                                //     errors.fullName?.type === "required" || errors.fullName?.message
                                //         ? errors.fullName?.message
                                //         : ""
                                // }
                                // errors={
                                //     errors.fullName?.type === "required" || errors.fullName?.message
                                //         ? true
                                //         : false
                                // }

                                />

                            </div>
                            <InputMaskUi
                                id='number'
                                name='number'
                                label="Cuenta bancaria"
                                colorLabel="text-purchase"
                                defaultValue={(userPurchase && userPurchase.number)}
                                value={(userPurchase && userPurchase.number)}
                                onChange={(e) => setUserPurchase({ ...userPurchase, number: e.target.value })}
                                placeholder=""
                                type='text'
                                className="bg-white"
                                // control={control}
                                // register={register}
                                // required={true}
                                max={16}
                                mask='9999-9999-9999-9999'


                            />
                            <div className="flex lg:flex-row flex-col lg:space-x-4 w-full">
                                <Input
                                    id='userName'
                                    name='userName'
                                    label="Nombre de titular"
                                    colorLabel="text-purchase"
                                    defaultValue={(userPurchase && userPurchase.userName)}
                                    value={(userPurchase && userPurchase.userName)}
                                    onChange={(e) => setUserPurchase({ ...userPurchase, userName: e.target.value })}
                                    placeholder=""
                                    type='text'
                                    className="bg-white"
                                    control={control}
                                    register={register}
                                    required={true}



                                />
                                <InputMaskUi
                                    id='nit'
                                    name='nit'
                                    label="Cédula o Nit"
                                    colorLabel="text-purchase"
                                    defaultValue={(userPurchase && userPurchase.nit)}
                                    value={(userPurchase && userPurchase.nit)}
                                    onChange={(e) => setUserPurchase({ ...userPurchase, nit: e.target.value })}
                                    placeholder=""
                                    type='text'
                                    className="bg-white"
                                    max={10}
                                    mask='9999999999'


                                />
                            </div>
                        </>
                    }
                </>

                : ''

            }

            <div className="border border-grey-bInput rounded-lg w-full h-11 text-center items-center justify-center flex relative mt-1 p-2">
                <InputMask
                    id="autosized-input"
                    type='text'
                    name="quantity"
                    placeholder='Valor'
                    defaultValue={(userPurchase && userPurchase.value)}
                    value={(userPurchase && userPurchase.value)}
                    onChange={(e) => setUserPurchase({ ...userPurchase, value: e.target.value })}
                    className="w-full min-w-16 rounded-lg  h-8  text-grey-light outline-none  pr-2 bg-white text-md "
                    mask='999999999999999999'
                    maskChar={''}
                />
                <p className="text-menu font-semibold absolute text-xl right-0 pr-4">{currency && currency}</p>
                {/* <p className="text-purchase text-md font-semibold ">{form && form.quantity} COP</p> */}
            </div>

            <div className="flex space-x-6 relative py-6">
                <p className="w-24 text-grey font-semibold">Recibirás en {userPurchase?.currency?.name}</p>
                <img
                    src='./image/arrows2.png'
                    className=" z-10 w-8 h-10"

                />
                <p className="text-purchase font-semibold text-2xl flex space-x-2 items-center ">
                    <img className="w-6 h-6" src={userPurchase?.currency?.image} alt="description of image" />
                    <span>{quantityCalcule ? myRound(quantityCalcule, 5) : 0}</span>
                </p>
            </div>
            {tab === 'purchase' ?
                <>
                    <hr className="w-11/12 bg-grey-btab h-line mt-6 m-auto " />

                </>
                : ''
            }
            <div className="w-full flex items-center justify-center mt-6 lg:block hidden">
                <div className="border-dotted border border-menu text-menu rounded-xl w-full h-12 flex items-center justify-center">
                    <p className="font-bold">En 15 minutos, <span className="font-normal">Recibirás tus {userPurchase?.currency?.code}</span> </p>
                </div>
            </div>

        </form>
    )
}

export default PurchasePublicForm