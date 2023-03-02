import React, { useContext, useEffect, useState } from 'react'
import InputMaskUi from '../Ui/InputMask'
import Input from '../Ui/Input'
import { Context } from '../../provider/user/context';
import { getPriceCurrency, getPriceCurrencyInverse } from '../../provider/api/currency.queries';
import { useDebounce } from 'use-debounce';
import { Icons } from '../../utils/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { currencyFormat, myRound } from '../../utils/helpers';
import useConvert from '../../utils/hoocks/useConvert';


const schema = yup.object({
    wallet: yup.string().required("Nombre es requerido"),
    quantity: yup.string().required("Direccion es requerida"),
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});


const ConvertForm = ({ countrySelect, tab, typeTrasaction, type }) => {

    const { quantityCalcule, setQuantityCalcule } = useContext(Context);
    const [load, setLoad] = useState(false);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { setLoadCalculator } = useContext(Context);
    const { valueCurrency, setValueCurrency } = useContext(Context);
    const { valueCrypto, setValueCrypto } = useContext(Context);

    const [valueCalcule] = useDebounce(valueCurrency, 1000);
    const [valueCryto] = useDebounce(valueCrypto, 1000);

    //hoosks
    const { convert, setConvert, calculeCurrencyToCrypto, calculeToCurrency } = useConvert();

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });



    const ConvertToCryto = async (value, valueCripto) => {
        setLoad(true);
        const res = await
            !convert && type !== 'giro' ?
            calculeCurrencyToCrypto(countrySelect, value, typeTrasaction)
            : calculeToCurrency(countrySelect, valueCripto, typeTrasaction);

        res ? setLoad(false) : setLoad(false);

    }



    useEffect(() => {

        if (convert == false) {
            // calculePrice(userPurchase?.value);
            ConvertToCryto(userPurchase?.value)
        }
        else {
        }
    }, [valueCalcule, countrySelect, typeTrasaction, setLoad, userPurchase?.currency]);


    // useEffect(() => {
    //     if (convert === true) {
    //         ConvertToCryto(null, valueCrypto);
    //     } else {
    //     }
    // }, [valueCryto, countrySelect, typeTrasaction, setLoad]);



    return (
        <>

            <>
                <div className="flex lg:flex-row flex-col w-full justify-start items-center space-x-2 ">
                    <div className={`lg:w-7/12  w-full   `}>

                        <InputMaskUi
                            id='quantity'
                            name='quantity'
                            label={` 
                    ${countrySelect?.currency === 'COP' ? 'Monto en pesos colombianos' :
                                    countrySelect?.name === 'El Salvador' && typeTrasaction === 'sale' ? '¿Quieres recibir cuantos dólares?' :
                                        'Monto en dólar estadounidense'}`}
                            colorLabel="text-purchase"
                            value={
                                convert ? valueCurrency && myRound(valueCurrency, 1) :

                                    (valueCurrency && currencyFormat(valueCurrency))}

                            onChange={(e) => setValueCurrency(e.target.value)}
                            placeholder={valueCurrency ? valueCurrency : '0'}
                            type='text'
                            className={`${!convert ? 'border-greenBorder' : ''} bg-white`}
                            mask={convert ? '' : '999999999999'}
                            signo={'$'}
                            onClick={() => setConvert(false)}
                        />

                    </div>

                    <i className="mx-2 mt-8 text-xl  text-grey-bTab cursor-pointer ">{Icons.Arrows}</i>
                    <div className={` lg:w-5/12  w-full `}>



                        <InputMaskUi
                            id='quan'
                            name='quant'
                            label={` ${tab === 'sale' ? 'Venderás' : 'Recibirás'} en ${userPurchase?.currency?.name}`}
                            colorLabel="text-purchase"
                            value={
                                valueCrypto

                                // convert && valueCrypto?.length > 6 ? myRound(valueCrypto) :
                                //     convert && valueCrypto?.length < 6 ? valueCrypto :
                                //         convert && valueCrypto?.length > 0 ?
                                //             myRound(valueCrypto, 5) : 0
                                // valueCrypto && valueCrypto
                            }

                            onChange={(e) => setValueCrypto(e.target.value)}

                            placeholder="0"
                            type='text'
                            className={`${!convert ? '' : 'border-greenBorder'} bg-white`}
                            control={control}
                            register={register}
                            // mask={convert ? '999999' : '999999'}
                            readonly={"readonly"}
                            // onClick={() => setConvert(true)}
                            max={6}

                        />


                    </div>

                </div>
                <div className="w-full flex justify-center items-center mt-2">
                </div>
            </>

        </>

    )
}

export default ConvertForm

