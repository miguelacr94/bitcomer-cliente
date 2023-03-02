import React, { useContext, useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { getCrypto, getPriceCurrency } from '../../provider/api/currency.queries'
import { Context } from '../../provider/user/context'

import Purchase from './PublicTransactions/Purchase'
import Sale from './PublicTransactions/Sale'
import Converter from '../ConverterPrice/Converter';

const schema = yup.object({
    wallet: yup.string().required("Nombre es requerido"),
    quantity: yup.string().required("Direccion es requerida"),
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});

const PurchaseForm = ({ typeTrasaction, tab, cryptoMoney }) => {

    const [Crypto, setCrypto] = useState([])
    const { countrySelect } = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { networks, setNetworks } = useContext(Context);
    const [convert, setConvert] = useState('toCurrency');
    // const [userPrucase?.typeSale, setTypeSale] = useState(null);


    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

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
        cryptoMoney(cryto);
        setUserPurchase({ ...userPurchase, currency: cryto })
    }, [setCrypto, setUserPurchase,])




    useEffect(() => {
        if (localStorage.getItem('purchase')) {

        } else {
            setNetworks(userPurchase?.currency?.networks[0]);
        }

    }, [userPurchase?.currency]);


    //valida solo letras
    const handleChangeInput = (evento) => {
        //destructurin de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (regex.test(value)) {
            setUserPurchase({ ...userPurchase, userName: value });
        } else {

            if (value.length < 2) {

                setUserPurchase({ ...userPurchase, userName: '' });
                return false;
            }


        }
    }

    const handleChangeInputWallet = (evento) => {
        //destructurin de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        let regex = new RegExp(/^[A-Za-z0-9\s]+$/g);

        if (regex.test(value)) {
            setUserPurchase({ ...userPurchase, [name]: value });
        } else {

            if (value.length < 2) {

                setUserPurchase({ ...userPurchase, [name]: '' });
                return false;
            }
        }
    }

    const typeSale = [
        {
            name: 'banco',
        },
        {
            name: 'efectivo'
        }
    ];

    useEffect(() => {
        if (countrySelect?.name === 'Colombia') {
            setUserPurchase({ ...userPurchase, typeSale: 'banco' });
        }
    }, [setUserPurchase, countrySelect, typeTrasaction]);

    <input onkeydown="return /[a-z]/i.test(event.key)" ></input>



    return (
        // <form className="flex  flex-col justify-center  w-full px-4 rounded-2xl" autoComplete='off' >


        //     <Select2
        //         id='currency'
        //         label='Moneda'
        //         colorLabel="text-purchase"
        //         className="w-full"
        //         width={'w-36'}
        //         px={2}
        //         value={userPurchase && userPurchase.currency?.name}
        //         defaultValue={(userPurchase && userPurchase.currency?.name)}
        //         icon={userPurchase && userPurchase.currency?.image}
        //         onChange={hanldeChangeCurrency}
        //         items={Crypto}
        //         register={register}
        //         constol={control}

        //     />

        //     {tab === 'purchase' ?
        //         <>

        //             <Select
        //                 id='networks'
        //                 label='Red'
        //                 colorLabel="text-purchase"
        //                 className="w-full"
        //                 width={'w-36'}
        //                 px={1}
        //                 value={networks && networks}
        //                 defaultValue={(networks && networks)}
        //                 // icon={userPurchase && userPurchase.currency?.image}
        //                 onChange={(e) => setNetworks(e)}
        //                 items={userPurchase?.currency?.networks || []}
        //                 register={register}
        //                 control={control}

        //             />

        //             <Input
        //                 id='wallet'
        //                 name='wallet'
        //                 label="Dirección de wallet"
        //                 colorLabel="text-purchase"
        //                 defaultValue={(userPurchase && userPurchase.wallet)}
        //                 value={(userPurchase && userPurchase.wallet)}
        //                 onChange={handleChangeInputWallet}
        //                 placeholder=""
        //                 type='text'
        //                 className="bg-white"
        //                 control={control}
        //                 register={register}
        //                 required={true}
        //                 max={34}
        //             />
        //         </>
        //         : ''

        //     }

        //     {countrySelect && countrySelect.account === true && tab === 'sale' ?
        //         <>
        //             {countrySelect.name !== 'Colombia' &&
        //                 < Select2
        //                     id='typeSale'
        //                     label='¿Cómo quieres recibir el dinero?'
        //                     colorLabel="text-purchase"
        //                     className="w-full"
        //                     width={"w-72"}
        //                     px={4}
        //                     value={userPurchase?.typeSale}
        //                     defaultValue={userPurchase?.typeSale}
        //                     onChange={(e) => setUserPurchase({ ...userPurchase, typeSale: e.name })}
        //                     items={typeSale}
        //                     register={register}
        //                     constol={control}

        //                 />
        //             }

        //             {userPurchase?.typeSale == 'banco' &&
        //                 <>
        //                     <Select2
        //                         id='bank'
        //                         label='Selecciona banco'
        //                         colorLabel="text-purchase"
        //                         className="w-full"
        //                         width={"w-72"}
        //                         px={4}
        //                         value={userPurchase && userPurchase?.bank?.name}
        //                         defaultValue={(userPurchase && userPurchase?.bank?.name)}
        //                         onChange={(e) => setUserPurchase({ ...userPurchase, bank: e })}
        //                         items={countrySelect?.banks}
        //                         register={register}
        //                         constol={control}

        //                     />
        //                     <Select2
        //                         id='currency'
        //                         label='Tipo de cuenta'
        //                         colorLabel="text-purchase"
        //                         className="w-full"
        //                         width={"w-36"}
        //                         px={4}
        //                         value={userPurchase && userPurchase?.typeAccount?.name}
        //                         defaultValue={(userPurchase && userPurchase?.typeAccount?.name)}
        //                         // icon={userPurchase && userPurchase.typeAccount?.icon}
        //                         onChange={(e) => setUserPurchase({ ...userPurchase, typeAccount: e })}
        //                         items={[
        //                             {
        //                                 name: 'Ahorros'
        //                             },
        //                             {
        //                                 name: 'Corriente'
        //                             }
        //                         ]}
        //                         register={register}
        //                         constol={control}
        //                     />

        //                     <InputMaskUi
        //                         id='number'
        //                         name='number'
        //                         label="Cuenta bancaria"
        //                         colorLabel="text-purchase"
        //                         defaultValue={(userPurchase && userPurchase.number)}
        //                         value={(userPurchase && userPurchase.number)}
        //                         onChange={(e) => setUserPurchase({ ...userPurchase, number: e.target.value })}
        //                         placeholder=""
        //                         type='text'
        //                         className="bg-white"
        //                         max={15}
        //                         mask='999999999999999'
        //                     // control={control}
        //                     // register={register}
        //                     // required={true}

        //                     />
        //                     <Input
        //                         id='userName'
        //                         name='userName'
        //                         label="Nombre de titular"
        //                         colorLabel="text-purchase"
        //                         defaultValue={(userPurchase && userPurchase.userName)}
        //                         value={(userPurchase && userPurchase.userName)}
        //                         onChange={handleChangeInput}
        //                         placeholder=""
        //                         type='text'
        //                         className="bg-white"
        //                         control={control}
        //                         register={register}
        //                         required={true}


        //                     />

        //                     <InputMaskUi
        //                         id='nit'
        //                         name='nit'
        //                         label="Cédula o Nit"
        //                         colorLabel="text-purchase"
        //                         defaultValue={(userPurchase && userPurchase.nit)}
        //                         value={(userPurchase && userPurchase.nit)}
        //                         onChange={(e) => setUserPurchase({ ...userPurchase, nit: e.target.value })}
        //                         placeholder=""
        //                         type='text'
        //                         className="bg-white"
        //                         max={10}
        //                         mask='9999999999'
        //                     />
        //                 </>
        //             }
        //         </>

        //         : ''

        //     }

        //     <ConvertForm
        //         countrySelect={countrySelect}
        //         tab={tab}
        //         typeTrasaction={typeTrasaction}
        //     />

        //     {/* <div className="flex lg:flex-row flex-col w-full justify-start items-center space-x-2 ">
        //         <div className={`lg:w-7/12  w-full  ${convert ? 'order-3' : 'order-1'} `}>
        //             <InputMaskUi
        //                 id='quantity'
        //                 name='quantity'
        //                 label={` 
        //                 ${countrySelect?.currency === 'COP' ? 'Monto en pesos colombianos' :
        //                         countrySelect?.name === 'El Salvador' && typeTrasaction === 'sale' ? '¿Quieres recibir cuantos dólares?' :
        //                             'Monto en dólar estadounidense'}`}
        //                 colorLabel="text-purchase"
        //                 defaultValue={(userPurchase?.value && currencyFormat(userPurchase.value))}
        //                 value={(userPurchase?.value && currencyFormat(userPurchase.value))}

        //                 onChange={(e) => setUserPurchase({ ...userPurchase, value: e.target.value })}
        //                 placeholder={userPurchase ? userPurchase?.value : '0'}
        //                 type='text'
        //                 className="bg-white"
        //                 mask='999999999999'
        //                 signo='$'
        //             />

        //         </div>

        //         <i onClick={() => setConvert(!convert)} className="mx-2 mt-8 text-xl  text-grey-bTab cursor-pointer order-2">{Icons.Arrows}</i>
        //         <div className={`${convert ? 'order-1' : 'order-3'} lg:w-5/12  w-full `}>
        //             <Input
        //                 id='quan'
        //                 name='quant'
        //                 label={` ${tab === 'sale' ? 'Venderás' : 'Recibirás'} en ${userPurchase?.currency?.name}`}
        //                 colorLabel="text-purchase"
        //                 defaultValue={quantityCalcule ? myRound(quantityCalcule?.quantity, 5) : 0}
        //                 value={quantityCalcule ? myRound(quantityCalcule?.quantity, 5) : 0}
        //                 placeholder="0"
        //                 type='text'
        //                 className="bg-white border-greenBorder"
        //                 control={control}
        //                 register={register}
        //                 readonly={"readonly"}
        //             />
        //         </div>

        //     </div>
        //     <div className="w-full flex justify-center items-center mt-2">
        //     </div> */}
        // </form >

        <div className='w-full p-4'>
            {tab === 'purchase' &&
                < Purchase
                    tab={tab}
                />
            }
            {tab === 'sale' &&
                <Sale
                    tab={tab}
                />

            }

            <Converter
                tab={tab}
            />
           
        </div>
    )
}

export default PurchaseForm