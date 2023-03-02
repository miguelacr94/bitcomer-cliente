import React, { useContext, useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Select2 from '../Ui/Select2';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Input from '../Ui/Input';
import { expireDate, expireDateAlt, toastTypes } from '../../utils/helpers';
import { useToasts } from "react-toast-notifications";
import { Purchase } from '../../provider/api/user.queries';
import { Card } from '../../utils/hooks';
import { Context } from '../../provider/user/context';
import InputMaskUi from '../Ui/InputMask';
import { Icons } from '../../utils/icons';




const schema = yup.object({
    // name: yup.string().required("Nombre es requerido"),
    // quantity: yup.string().required("Direccion es requerida"),
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});

const CreditForm = ({ dataCountry, onClose, resp, setModal, network }) => {

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const { addToast } = useToasts();
    const [form, setForm] = useState(null);
    const [load, setLoad] = useState(false);
    const { userPurchase } = useContext(Context);
    const { quantityCalcule } = useContext(Context);
    const { countrySelect } = useContext(Context);

    const [name, setName] = useState(null);
    const [cc, setCc] = useState(null);
    const [email, setEmail] = useState(null);
    const [typeDocument, setTypeDocument] = useState(null);
    const [number, setNumber] = useState(null);
    const [fecha, setFecha] = useState(null);
    const [cvv, setCvv] = useState(null);
    const { valueCurrency, setValueCurrency } = useContext(Context);
    const { valueCrypto, setValueCrypto } = useContext(Context);
    const { convert } = useContext(Context); // estado del convertidor de monedas

    const send = async (e) => {
        e.preventDefault();

        const numberCard = form?.creditCard;



        for (var i = 0; i < 4; i++) {
            numberCard = numberCard?.replace('-', '');
        }


        if (!form?.name) {
            setName({ ...name, message: 'Nombre es requerido.' });
            return document.getElementById("name").focus();
        } else {
            setName({ ...name, message: null });
        }
        if (!form?.cc) {
            return setCc({ ...cc, message: 'Documento es requerido.' });

        } else {
            setCc({ ...cc, message: null });
        }
        if (!form?.typeDocument) {
            return setTypeDocument({ ...typeDocument, message: 'Tipo de documento requerido' });

        } else {
            setTypeDocument({ ...typeDocument, message: null });
        }
        if (!form?.creditCard) {
            setNumber({ ...number, message: 'Numero de tarjeta es requerido.' });
            return document.getElementById("creditCard").focus();

        } else if (form?.creditCard.length < 19) {
            setNumber({ ...number, message: 'Dígitos incompletos' });
            return document.getElementById("creditCard").focus();
        }
        else {
            setNumber({ ...number, message: null });
        }


        if (!form?.email) {
            setEmail({ ...email, message: 'Email es requerido' });
            return document.getElementById("email").focus();
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
            setEmail({ ...email, message: 'Por favor, ingresa una dirección de email válida.' });
            return document.getElementById("email").focus();
        } else {
            setEmail({ ...email, message: null });
        }


        if (!form?.expired) {
            setFecha({ ...fecha, message: 'Fecha es requerida.' });
            return document.getElementById("expired").focus();
        }
        else if (form?.expired.length < 5) {
            setFecha({ ...fecha, message: 'Fecha incorrecta' });
            return document.getElementById("expired").focus();
        }
        else {
            setFecha({ ...fecha, message: null });
        }

        if (!form?.cvv) {
            setCvv({ ...cvv, message: 'Cvv es requerido.' });
            return document.getElementById("cvv").focus();
        }
        else if (form?.cvv.length < 3) {
            setCvv({ ...fecha, message: 'Cvv incompleto' });
            return document.getElementById("cvv").focus();
        }
        else {
            setCvv({ ...fecha, message: null });
        }


        var quantity = 0;
        var value = 0;

        if (convert === 'toCurrency') {
            quantity = valueCrypto;
            value = valueCurrency
        }else{
            quantity = valueCurrency
            value=valueCrypto
        }




        const data = {
            crypto: {
                cryptoId: userPurchase?.currency?._id,
                quantity: quantity
            },

            wallet: userPurchase?.wallet,
            paymentMethod: 'card',
            purchaseType: 'purchase',
            currency: dataCountry.currency,
            value: value,
            commission: quantityCalcule?.commission,
            network: network,
            card: {
                name: form?.name,
                cc: form?.cc,
                document_type: form?.typeDocument.name,
                credit_card: numberCard,
                expiration_date: form?.expired,
                cvv: form?.cvv,
                email: form?.email,
                phone: form?.phone,
            },
            country: countrySelect._id

        }

        setLoad(true);
        const res = await Purchase(data);
        if (res) {
            addToast('Pago exitoso',
                { appearance: toastTypes.SUCCESS, transitionDuration: 2000 });
            setLoad(false);
            localStorage.removeItem('purchase');
            resp(res?.data);
            setModal();
            onClose();
            setValueCurrency('');
            setValueCrypto('');
        } else {
            addToast('Error al momento de realizar pago',
                { appearance: toastTypes.ERROR, transitionDuration: 2000 });
            setLoad(false);
        }
    }

    //valida solo letras
    const handleChangeInput = (evento) => {
        //destructurin de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (regex.test(value)) {
            setForm({ ...form, [name]: value })
        } else {

            if (value.length < 2) {

                setForm({ ...form, [name]: '' })
                return false;
            }


        }
    }




    const onCancel = (e) => {
        e.preventDefault();
        onClose();
    }


    return (
        <div className="py-6 px-4 lg:w-pse w-full">
            <h1 className="text-grey font-bold text-center">Método de pago por tarjeta de crédito</h1>
            <hr className="bg-menu h-1 mt-2" />
            <form >

                <Input
                    id='name'
                    name='name'
                    label="Nombre de titular"
                    colorLabel="text-grey"
                    defaultValue={(form && form.name)}
                    value={(form && form.name)}
                    onChange={handleChangeInput}
                    placeholder=""
                    type='text'
                    className="bg-white"
                    control={control}
                    register={register}
                    // required={true}
                    hint={
                        name || name?.message
                            ? name?.message
                            : ""
                    }
                    errors={
                        name?.message
                            ? true
                            : false
                    }

                />


                <div className="flex lg:flex-row flex-col lg:space-x-2 items-center mb-2">
                    <div className="lg:w-3/6 w-full">
                        <InputMaskUi
                            id='cc'
                            name='cc'
                            label="Cédula o Nit"
                            colorLabel="text-grey"
                            defaultValue={(form && form.cc)}
                            value={(form && form.cc)}
                            onChange={(e) => setForm({ ...form, cc: e.target.value })}
                            placeholder=""
                            type='text'
                            className="bg-white"
                            // control={control}
                            // register={register}
                            // required={true}
                            max={10}
                            mask='9999999999'
                            // formatChars={ '9' }
                            hint={
                                cc || cc?.message
                                    ? cc?.message
                                    : ""
                            }
                            errors={
                                cc?.message
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    <div className="lg:w-3/6  w-full">
                        <Select2
                            id='typeDocument'
                            name='typeDocument'
                            label="Tipo de documento"
                            colorLabel="text-grey"
                            defaultValue={(form && form.typeDocument?.name)}
                            value={(form && form.typeDocument?.name)}
                            onChange={(e) => setForm({ ...form, typeDocument: e })}
                            placeholder=""
                            type='text'
                            className="bg-white"
                            width={"w-24"}
                            px={4}
                            control={control}
                            items={[
                                {
                                    name: 'CC'

                                },
                                {
                                    name: 'CE'

                                },
                                {
                                    name: 'PA'

                                },
                                {
                                    name: 'TI'

                                },


                            ]}
                            register={register}
                            required={true}
                            hint={
                                typeDocument || typeDocument?.message
                                    ? typeDocument?.message
                                    : ""
                            }
                            errors={
                                typeDocument?.message
                                    ? true
                                    : false
                            }
                        />
                    </div>

                </div>

                <Input
                    id='email'
                    name='email'
                    label="Correo electrónico"
                    colorLabel="text-grey"
                    defaultValue={(form && form.email)}
                    value={(form && form.email)}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder=""
                    type='text'
                    className="bg-white"
                    control={control}
                    register={register}
                    // required={true}
                    hint={
                        email || email?.message
                            ? email?.message
                            : ""
                    }
                    errors={
                        email?.message
                            ? true
                            : false
                    }
                />
                <InputMaskUi
                    id='phone'
                    name='phone'
                    label="Teléfono"
                    colorLabel="text-grey"
                    defaultValue={(form && form.phone)}
                    value={(form && form.phone)}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder=""
                    type='text'
                    className="bg-white"
                    // control={control}
                    // register={register}
                    // required={true}
                    max={10}
                    mask='9999999999'
                    // formatChars={ '9' }
                    hint={
                        cc || cc?.message
                            ? cc?.message
                            : ""
                    }
                    errors={
                        cc?.message
                            ? true
                            : false
                    }
                />

                <InputMaskUi
                    id='creditCard'
                    name='creditCard'
                    label="Numero de tarjeta"
                    colorLabel="text-grey"
                    defaultValue={(form && form.creditCard)}
                    value={(form && form.creditCard)}
                    onChange={(e) => setForm({ ...form, creditCard: e.target.value })}
                    placeholder=""
                    type='text'
                    className="bg-white"
                    // control={control}
                    // register={register}
                    // required={true}
                    max={20}
                    mask='9999-9999-9999-9999'
                    // onKeyup={Card(event)}
                    hint={
                        number || number?.message
                            ? number?.message
                            : ""
                    }
                    errors={
                        number?.message
                            ? true
                            : false
                    }

                />
                <div className="flex lg:flex-row flex-col space-x-2 pb-4">
                    <div className="lg:w-3/6 w-full">
                        <InputMaskUi
                            id='expired'
                            name='expired'
                            label="Fecha de expiración"
                            colorLabel="text-grey"
                            defaultValue={(form && form.expired)}
                            value={(form && form.expired)}
                            onChange={(e) => setForm({ ...form, expired: e.target.value })}
                            placeholder=""
                            type='text'
                            className="bg-white"
                            // control={control}
                            // register={register}
                            required={true}
                            mask='12/34'
                            formatChars={

                                form?.expired?.[0] <= 0 ?
                                    expireDate
                                    : expireDateAlt
                            }
                            hint={
                                fecha || fecha?.message
                                    ? fecha?.message
                                    : ""
                            }
                            errors={
                                fecha?.message
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    <div className="lg:w-3/6 w-full">
                        <InputMaskUi
                            id='cvv'
                            name='cvv'
                            label="CVV"
                            colorLabel="text-grey"
                            defaultValue={(form && form.cvv)}
                            value={(form && form.cvv)}
                            onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                            placeholder=""
                            type='text'
                            className="bg-white"
                            // control={control}
                            // register={register}
                            // required={true}
                            mask='999'
                            max={3}
                            hint={
                                cvv || cvv?.message
                                    ? cvv?.message
                                    : ""
                            }
                            errors={
                                cvv?.message
                                    ? true
                                    : false
                            }

                        />
                    </div>
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                    <button className="w-24 h-10 rounded-full bg-red-400 text-white hover:bg-red-500"
                        onClick={onCancel}>Cancelar
                    </button>
                    <button
                        type='submit'
                        onClick={send}
                        disabled={load}
                        className="w-24 h-10 rounded-full bg-menu text-white hover:bg-active flex justify-center items-center disabled:opacity-75" >
                        {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Pagar'}
                    </button>

                </div>
            </form>

        </div>
    )
}

export default CreditForm