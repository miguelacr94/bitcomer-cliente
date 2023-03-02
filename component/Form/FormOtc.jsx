import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Ui/Input'
import InputMaskUi from '../Ui/InputMask'
import Select from '../Ui/Select'
import Select2 from '../Ui/Select2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useState } from 'react'
import { sendSaleOtc } from '../../provider/api/user.queries'
import { Icons } from '../../utils/icons'
import { useContext } from 'react'
import { Context } from '../../provider/user/context'
import { getCountryRegister } from '../../provider/api/home.queries'
import { getCrypto, getPriceCurrency, getPriceCurrencyInverse } from '../../provider/api/currency.queries'
import { useDebounce } from 'use-debounce';
import { currencyFormat, toastTypes } from '../../utils/helpers'
import { useToasts } from "react-toast-notifications";

const schema = yup.object({

});


const FormOtc = ({ resp }) => {



    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });


    const { addToast } = useToasts();

    //state

    const [load, setLoad] = useState();
    const [country, setCountry] = useState(null);
    const [crypto, setCrypto] = useState([]);



    //context 
    const { quantityCalculeOtc, setQuantityCalculeOtc } = useContext(Context);
    const { countrySelect } = useContext(Context)
    const { setOpenChat } = useContext(Context);
    const { formOtc, setFormOtc } = useContext(Context);

    //debounce
    const [valueCalcule] = useDebounce(formOtc?.quantity, 1000);



    const getCountries = async () => {
        const res = await getCountryRegister();
        if (res) {
            setCountry(res.data)
        }
    }

    const getCryptoList = async () => {
        const res = await getCrypto();
        if (res) {
            const cryto = res?.data.filter((c) => c.code !== 'BTC');
            setCrypto(cryto);

        }
    }

    useEffect(() => {
        getCryptoList();
    }, [setCountry]);


    useEffect(() => {
        getCountries();
    }, [setCountry])



    const calculePrice = async () => {
        setQuantityCalculeOtc('');
        setLoad(true);
        const payload = {
            currency: 'USD',
            crypto: formOtc.sale?.code,
            quantity: formOtc.quantity,
            typeTrasaction: 'sale'
        }
        const res = await getPriceCurrencyInverse(payload, countrySelect?._id);
        if (res) {
            setQuantityCalculeOtc(res?.data);
            setLoad(false);
        } else {
            setLoad(false);
        }
    }


    useEffect(() => {
        if (crypto) {
            setFormOtc({ ...formOtc, sale: crypto.find((c) => c.code == 'USDT') })
        }
    }, [setFormOtc, crypto,]);


    const setOtc = async (e) => {
        e.preventDefault();
        const payload = {
            currency: 'USD',
            value: quantityCalculeOtc.value,
            commission: quantityCalculeOtc.commission,
            crypto: {
                cryptoId: formOtc?.sale?._id,
                quantity: formOtc?.quantity
            },
            account: {
                bank: formOtc?.bankName,
                number: formOtc?.number,
                typeAccount: formOtc?.typeAccount,
                address: formOtc?.bankAddress,
                code: formOtc?.code
            },
            information: {
                name: formOtc?.beneficiaryName,
                address: formOtc?.address,
                city: formOtc?.city,
                potalCode: formOtc?.postal,
                region: formOtc?.region
            },
            country: formOtc?.country?._id,
            transferType: {
                type: 'Internacional'

            }
        }
        setLoad(true);
        const res = await sendSaleOtc(payload);

        if (res) {
            resp(res.data);
            addToast('Venta exitosa',
                { appearance: toastTypes.SUCCESS });
            setLoad(false);
            setOpenChat(true);
            setFormOtc('');
            setQuantityCalculeOtc('');
        } else {
            addToast('Error al realizar la venta',
                { appearance: toastTypes.ERROR });
            setLoad(false);
        }
    }

    //valida solo letras
    const handleChangeInput = (evento) => {
        //destructurin de los valores enviados por el método onchange de cada input
        const { name, value } = evento.target;
        let regex = new RegExp("^[a-zA-Z ]+$");
        if (regex.test(value)) {
            setFormOtc({ ...formOtc, [name]: value })
        } else {
            if (value.length < 2) {
                setFormOtc({ ...formOtc, [name]: '' })
                return false;
            }
        }
    }

    useEffect(() => {
        if (formOtc?.quantity) {
            calculePrice(formOtc?.quantity);
        } else {
            setQuantityCalculeOtc(0);
        }
    }, [valueCalcule, setQuantityCalculeOtc, formOtc?.sale, countrySelect]);


    return (
        <div className='w-full border rounded-3xl lg:p-6 p-4 mb-16 shadow-lg'>
            <h1 className='text-center font-semibold text-menu my-2 text-lg my-4'>Venta Otc</h1>
            <p className='text-grey-light text-xs pb-4 font-semibold text-justify'>
                El mínimo para vender en otc es de 2000 dólares.
                Venderás tus Tether (Usdt) a nuestra empresa a nivel internacional,
                por lo tanto te enviaremos una transferencia en dólares,
                solo tendrás que cubrir los costos financieros ☺ Esta transferencia
                demora máximo 48 horas hábiles en llegar tu cuenta bancaria.
            </p>
            <hr />
            <form className='w-full mt-4'>
                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4'>
                    <div className='w-full lg:w-3/6'>
                        <Select2
                            id='sale'
                            name='sale'
                            label='¿Que desea vender?'
                            colorLabel="text-purchase"
                            className='rounded-md'
                            value={formOtc && formOtc.sale?.name}
                            onChange={(e) => setFormOtc({ ...formOtc, sale: e })}
                            items={crypto}

                        />
                    </div>
                    <div className='w-full lg:w-3/6'>
                        <Input
                            id='typeTransfer'
                            name='typeTransfer'
                            label='Tipo de transferencia'
                            colorLabel="text-purchase"
                            value={'Internacional'}
                            onChange={(e) => setFormOtc({ ...formOtc, transferType: e })}
                            register={register}
                            control={control}
                            readonly={"readonly"}
                        />



                    </div>
                </div>
                <div className='w-full flex lg:flex-row flex-col justify-start items-center lg:space-x-4 mt-4'>

                    <div className='w-full lg:w-3/6'>
                        <InputMaskUi
                            id='quantity'
                            name='quantity'
                            placeholder='Cantidad en criptomonedas'
                            label='Cantidad en criptomonedas'
                            colorLabel="text-purchase"
                            value={formOtc && formOtc?.quantity}
                            onChange={(e) => setFormOtc({ ...formOtc, quantity: e.target.value })}
                            mask='999999999999'
                        />
                    </div>
                    <div className='mt-4 w-3/6 flex flex-col justify-center items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <span className=' text-menu font-semibold text-start'>Monto en dólar </span>
                            <span className='font-semibold'>{quantityCalculeOtc && currencyFormat(quantityCalculeOtc.value)}</span>
                        </div>

                        <p className='text-xs text-red-400 '>{quantityCalculeOtc?.value < 2000 ? 'El monto debe superar los 2000 dólares' : ''}</p>

                    </div>


                    {/* <div className='w-full lg:w-3/6'>
                        <Input
                            id='value'
                            name='value'
                            label={`Monto en dólar`}
                            colorLabel="text-purchase"
                            value={quantityCalculeOtc && currencyFormat(quantityCalculeOtc.value)}

                            mask='999999999999'
                            register={register}
                            control={control}
                            readonly={"readonly"}
                        />
                       
                    </div> */}
                </div>
                <p className='text-grey-light text-xs mt-8 text-justify font-semibold'>
                    La comisión es del 0.85% equivalente a los costos financieros de esta operación.
                    El valor que se te muestra es el valor neto que te debe llegar a tu cuenta bancaria.
                </p>

                <h1 className='text-center font-semibold text-menu my-6 text-lg '>Información bancaria</h1>
                <hr />
                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4 mt-4'>
                    <div className='w-full lg:w-3/6'>
                        <Input
                            id='bankName'
                            name='bankName'
                            label='Nombre de banco'
                            colorLabel="text-purchase"
                            register={register}
                            control={control}
                            value={formOtc && formOtc.bankName}
                            onChange={handleChangeInput}

                        />
                    </div>
                    <div className='w-full lg:w-3/6'>
                        <InputMaskUi
                            id='number'
                            name='number'
                            label='Numero de cuenta'
                            colorLabel="text-purchase"
                            value={formOtc && formOtc.number}
                            onChange={(e) => setFormOtc({ ...formOtc, number: e.target.value })}
                            mask='999999999999'

                        />
                    </div>
                </div>

                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4 mt-4'>
                    <div className='w-full lg:w-3/6'>
                        <Select2
                            id='_typeTransfer'
                            name='_typeTransfer'
                            placeholder='Tipo de cuenta'
                            label='Tipo de cuenta'
                            colorLabel="text-purchase"
                            className="w-full rounded-lg"
                            width={"w-36"}
                            px={4}
                            value={formOtc && formOtc?.typeAccount}
                            // icon={userPurchase && userPurchase.typeAccount?.icon}
                            onChange={(e) => setFormOtc({ ...formOtc, typeAccount: e })}
                            items={[
                                'Ahorros',
                                'Corriente'

                            ]}

                        />




                    </div>
                    <div className='w-full lg:w-3/6'>
                        <InputMaskUi
                            id='bankAddress'
                            name='bankAddress'
                            label='Dirección de banco'
                            colorLabel="text-purchase"
                            value={formOtc && formOtc.bankAddress}
                            onChange={(e) => setFormOtc({ ...formOtc, bankAddress: e.target.value })}

                        />

                    </div>
                </div>
                <div className='mt-4'>
                    <div className='w-full lg:w-3/6'>
                        <InputMaskUi
                            id='code'
                            name='code'
                            label='Código SWIFT/BIT'
                            colorLabel="text-purchase"
                            value={formOtc && formOtc.code}
                            onChange={(e) => setFormOtc({ ...formOtc, code: e.target.value })}
                        />
                    </div>
                </div>


                <h1 className='text-center font-semibold text-menu my-6 text-lg'>Información del beneficiario</h1>
                <hr />
                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4 mt-4'>
                    <div className='w-full lg:w-3/6'>
                        <Input
                            id='beneficiaryName'
                            name='beneficiaryName'
                            label='Nombre de beneficiario'
                            colorLabel="text-purchase"
                            register={register}
                            control={control}
                            value={formOtc && formOtc.beneficiaryName}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className='w-full lg:w-3/6'>
                        <Input
                            id='address'
                            name='address'
                            label='Dirección'
                            colorLabel="text-purchase"
                            register={register}
                            control={control}
                            value={formOtc && formOtc.address}
                            onChange={(e) => setFormOtc({ ...formOtc, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4 mt-4'>
                    <div className='w-full lg:w-3/6'>
                        <Select2
                            id='country'
                            name='country'
                            label='País'
                            colorLabel="text-purchase"
                            className='rounded-md'
                            value={formOtc && formOtc?.country?.name}
                            onChange={(e) => setFormOtc({ ...formOtc, country: e })}
                            items={country}

                        />
                    </div>
                    <div className='w-full lg:w-3/6'>
                        <Input
                            id='city'
                            name='city'
                            label='Ciudad'
                            colorLabel="text-purchase"
                            register={register}
                            control={control}
                            value={formOtc && formOtc.city}
                            onChange={(e) => setFormOtc({ ...formOtc, city: e.target.value })}

                        />
                    </div>
                </div>

                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4 mt-4'>
                    <div className='w-full lg:w-3/6'>
                        <Input
                            id='region'
                            name='region'
                            label='Region'
                            colorLabel="text-purchase"
                            register={register}
                            control={control}
                            value={formOtc && formOtc.region}
                            onChange={(e) => setFormOtc({ ...formOtc, region: e.target.value })}
                        /></div>
                    <div className='w-full lg:w-3/6'>
                        <InputMaskUi
                            id='postal'
                            name='postal'
                            label='Código postal'
                            colorLabel="text-purchase"
                            value={formOtc && formOtc.postal}
                            onChange={(e) => setFormOtc({ ...formOtc, postal: e.target.value })}
                            mask='99999'

                        />
                    </div>
                </div>

                <div className='flex justify-center'>
                    <button
                        onClick={setOtc}
                        disabled={
                            load ||
                            !formOtc?.bankName ||
                            !formOtc?.number ||
                            !formOtc?.typeAccount ||
                            !formOtc?.bankAddress ||
                            !formOtc?.code ||
                            !formOtc?.beneficiaryName ||
                            !formOtc?.address ||
                            !formOtc?.country ||
                            !formOtc?.city ||
                            !formOtc?.region ||
                            !formOtc?.postal ||
                            !quantityCalculeOtc ||
                            quantityCalculeOtc?.value < 2000
                        }
                        className={`${load ? 'cursor-text' : ''} disabled:cursor-not-allowed bg-menu w-36 h-10 rounded-full  text-white mt-6 disabled:opacity-75 flex items-center justify-center`}>
                        {load ? <p className="animate-spin  h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Vender'}


                    </button>
                </div>

            </form>
        </div>
    )
}

export default FormOtc