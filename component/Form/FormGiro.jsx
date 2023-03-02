import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Context } from '../../provider/user/context'
import Input from '../Ui/Input'
import Select2 from '../Ui/Select2'
import Select from '../Ui/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import InputMaskUi from '../Ui/InputMask'
import { useDebounce } from 'use-debounce';
import { useState } from 'react'
import SwitchUi from '../Ui/Switch'
import { getCrypto, getPriceCurrency, getPriceCurrencyInverse } from '../../provider/api/currency.queries'
import { currencyFormat, myRound, toastTypes } from '../../utils/helpers'
import { Purchase } from '../../provider/api/user.queries'
import { Icons } from '../../utils/icons'
import { useToasts } from "react-toast-notifications";
import SelectSucursal from '../Ui/SelectSucursal'
import { getCities } from '../../provider/api/home.queries'
import ConvertForm from './ConvertForm'
import GetPriceGiro from '../Giro/GetPriceGiro'

const schema = yup.object({

});


const FormGiro = ({ resp, dataSucursal }) => {





    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    //context
    const { formGiro, setFormGiro } = useContext(Context);
    const { quantityCalculeGiro, setQuantityCalculeGiro } = useContext(Context);
    const { countrySelect, setCountrySelect } = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const [city, setCity] = useState([]);
    const [sucursal, setSucursal] = useState(null);

    //states
    const [beneficiary, setBeneficiary] = useState(false);
    const [crypto, setCrypto] = useState(null);
    const [load, setLoad] = useState(false);
    const [_Sucursal, setDataSUcursal] = useState(null);
    const { valueCrypto, setValueCrypto } = useContext(Context);



    //debounce
    const [valueCalcule] = useDebounce(formGiro?.quantity, 1000);
    const { addToast } = useToasts();


    const getCryptoList = async () => {
        const res = await getCrypto();
        if (res) {
            const cryto = res?.data.filter((c) => c.code !== 'BTC');
            setCrypto(cryto);

        }
    }



    //valida solo letras
    const handleChangeInput = (evento) => {
        //destructurin de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (regex.test(value)) {
            setFormGiro({ ...formGiro, beneficiary: value });
        } else {

            if (value.length < 2) {

                setFormGiro({ ...formGiro, beneficiary: '' });
                return false;
            }


        }
    }

    const sendGiro = async (e) => {

        e.preventDefault();

        const payload = {
            crypto: {
                cryptoId: userPurchase?.currency?._id,
                quantity: parseInt(formGiro?.quantity),
            },
            currency: countrySelect?.currency,
            country: countrySelect?._id,
        
            value: quantityCalculeGiro?.value && parseFloat(quantityCalculeGiro?.value),
            commission: quantityCalculeGiro?.commission,
            rate: quantityCalculeGiro?.rate,
            subTotal: quantityCalculeGiro?.subTotal && parseFloat(quantityCalculeGiro?.subTotal),
            paymentMethod: 'efectivo',
            purchaseType: 'giro',
            information: {
                document: formGiro.idBeneficiary,
                name: formGiro.beneficiary
            },
            payee: beneficiary,
            branch: formGiro?.sucursal?._id
        }

        setLoad(true);

        const res = await Purchase(payload);
        if (res) {
            addToast('Giro enviado con éxito',
                { appearance: toastTypes.SUCCESS });
            setLoad(false);
            resp(res.data);
        }

    }
    const getFilterCities = async (idCountry) => {
        setFormGiro({ ...formGiro, city: '' });
        const res = await getCities(idCountry);
        if (res) {
            setCity(res?.data);
        }
    }

    useEffect(() => {
        getCryptoList();
    }, [setCrypto]);


    useEffect(() => { // Bitcoin initialized in the select
        if (crypto) {
            setUserPurchase({ ...userPurchase, currency: crypto.find((c) => c.code == 'USDT') })
        }
    }, [setUserPurchase, crypto,]);



    // useEffect(() => {
    //     setFormGiro({ ...formGiro, sucursal: '' });
    // }, [setCountrySelect, countrySelect]);


    useEffect(() => {
        getFilterCities(countrySelect?._id);
    }, [countrySelect]);


    useEffect(() => {
        setFormGiro({ ...formGiro, sucursal: '' });
        if (formGiro?.city) {
            setSucursal(dataSucursal.filter((c) => c?.city?.name === formGiro?.city?.name));
        }
    }, [setCity, city, formGiro?.city]);





    return (
        <div className='w-full border rounded-3xl lg:p-6 p-4 mb-16 shadow-lg'>
            <h1 className='text-center font-semibold text-menu my-2 text-lg my-4'>Giros</h1>

            <hr />
            <form className='w-full'>
                <div className='w-full flex lg:flex-row flex-col justify-center items-center lg:space-x-4 mt-2 space-y-2'>
                    <div className='w-full lg:w-3/6'>
                        <Select2
                            id='currency'
                            name='currency'
                            label='¿Que desea girar?'
                            colorLabel="text-purchase"
                            className=''
                            value={userPurchase && userPurchase.currency?.name}
                            onChange={(e) => setUserPurchase({ ...userPurchase, currency: e })}
                            items={crypto}

                        />
                    </div>

                    <div className='lg:w-3/6 w-full'>
                        <Select2
                            id='city'
                            name='city'
                            label='Seleccione ciudad de sucursal'
                            colorLabel="text-purchase"
                            value={formGiro && formGiro.city?.name}
                            onChange={(e) => setFormGiro({ ...formGiro, city: e })}
                            items={city}

                        />

                    </div>
                </div>


                <div className='w-full flex '>


                    <div className='lg:w-3/6 w-full mt-2'>
                        <Select2
                            id='currency'
                            name='currency'
                            label='Seleccione sucursal'
                            colorLabel="text-purchase"
                            value={formGiro && formGiro?.sucursal?.name}
                            onChange={(e) => setFormGiro({ ...formGiro, sucursal: e })}
                            items={sucursal}
                            width='w-72'

                        />

                    </div>
                </div>


                <Input
                    id='address'
                    name='address'
                    label={'Dirección'}
                    colorLabel="text-purchase"
                    value={formGiro?.sucursal && formGiro?.sucursal?.address}
                    register={register}
                    control={control}
                    // mask='999999999999'
                    readonly={"readonly"}
                />
                <GetPriceGiro />

                <SwitchUi
                    id='checked'
                    checked={beneficiary}
                    onChange={() => setBeneficiary(!beneficiary)}
                    label={'¿Es usted el titular?'}
                    colorLabel='text-purchase'
                    mt='mt-4'
                />
                {
                    beneficiary &&
                    <div className='flex space-x-4'>
                        <div className='w-full lg:w-3/6'>
                            <Input
                                id='nameBeneficiary'
                                name='nameBeneficiary'
                                label='Nombre del beneficiario'
                                colorLabel="text-purchase"
                                register={register}
                                control={control}
                                value={formGiro && formGiro.beneficiary}
                                onChange={handleChangeInput}

                            />
                        </div>
                        <div className='w-full lg:w-3/6'>
                            <InputMaskUi
                                id='idBeneficiary'
                                name='idBeneficiary'
                                label='Numero de documento'
                                colorLabel="text-purchase"
                                // register={register}
                                // control={control}
                                max={10}
                                mask='9999999999'
                                value={formGiro && formGiro.idBeneficiary}
                                onChange={(e) => setFormGiro({ ...formGiro, idBeneficiary: e.target.value })}

                            />
                        </div>
                    </div>
                }
                <div className='w-full flex justify-center'>
                    {beneficiary ?
                        <button
                            disabled={
                                !userPurchase?.currency ||
                                !quantityCalculeGiro ||
                                !formGiro.beneficiary ||
                                !formGiro.idBeneficiary ||
                                !formGiro?.sucursal
                            }
                            onClick={sendGiro}
                            className='  bg-menu disabled:opacity-75 h-10 rounded-full w-40 mt-4 text-white font-semibold flex justify-center items-center'>
                            {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Girar'}

                        </button>
                        :
                        <button
                            disabled={
                                !userPurchase?.currency

                            }
                            onClick={sendGiro}
                            className={`${load ? 'cursor-wait' : ''} bg-menu disabled:cursor-not-allowed disabled:opacity-75 h-10 rounded-full w-40 mt-4 text-white font-semibold flex justify-center items-center`}>
                            {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Girar'}
                        </button>
                    }
                </div>

            </form >
            <div className='w-full justify-center flex mt-8'>Recibirás {quantityCalculeGiro ? currencyFormat(quantityCalculeGiro?.value) : 0} {countrySelect?.currency} </div>
        </div >
    )

}

export default FormGiro