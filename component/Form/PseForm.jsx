import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../Ui/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Select2 from '../Ui/Select2';
import { Purchase } from '../../provider/api/user.queries';
import { toastTypes } from '../../utils/helpers';
import { useToasts } from "react-toast-notifications";
import { Context } from '../../provider/user/context';
import { Icons } from '../../utils/icons';
import InputMaskUi from '../Ui/InputMask';
import { getBankColombia } from '../../provider/api/home.queries';
import Select from '../Ui/Select';
import SelectBank from '../Ui/SelectBank';


const schema = yup.object({
    // name: yup.string().required("Nombre es requerido"),
    // quantity: yup.string().required("Direccion es requerida"),
    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")

});
const initialData = {
    quantity: 0
}


const PseForm = ({ payload, dataCountry, onClose, onBack, network }) => {


    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });



    const { addToast } = useToasts();
    const [form, setForm] = useState(null);
    const [load, setLoad] = useState(false);
    const { userPurchase, } = useContext(Context);
    const { quantityCalcule } = useContext(Context);
    const { countrySelect } = useContext(Context);


    const [name, setName] = useState(null);
    const [cc, setCc] = useState(null);
    const [typeDocument, setTypeDocument] = useState(null);
    const [bank, setBank] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [bankColombia, setBankColombia] = useState([]);
    const { valueCurrency } = useContext(Context);
    const { valueCrypto } = useContext(Context);
    const { convert } = useContext(Context); // estado del convertidor de monedas

    const getBank = async () => {
        const res = await getBankColombia();
        if (res) {
            setBankColombia(res?.data);
        }
    }


    useEffect(() => {
        getBank();
    }, [setBankColombia])



    const send = async (e) => {
        e.preventDefault();

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

        if (!form?.bank) {
            return setBank({ ...bank, message: 'Banco es requerido.' });
        } else {
            setBank({ ...bank, message: null });
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

        if (!form?.phone) {
            setPhone({ ...phone, message: 'Teléfono es requerido.' });
            return document.getElementById("phone").focus();
        } else {
            setPhone({ ...phone, message: null });
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
            paymentMethod: 'pse',
            purchaseType: 'purchase',
            currency: dataCountry.currency,
            value: value,
            commission: quantityCalcule?.commission,
            network: network,
            pse: {
                name: form?.name,
                cc: form?.cc,
                document_type: form?.typeDocument?.name,
                payment: "pse",
                email: form?.email,
                phone: form?.phone,
                bank: form?.bank?.bankCode,
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
            onBack();
            onClose();
            setValueCurrency('');
            setValueCrypto('');
            if (res?.data?.pseUrl) {
                window.open(res?.data?.pseUrl)
            }

        } else {
            addToast('Error al momento de pagar',
                { appearance: toastTypes.ERROR, transitionDuration: 2000 });
            setLoad(false);
        }
    }

    const onCancel = (e) => {
        e.preventDefault();
        onClose();
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




    return (

        <div className="py-6 px-4 lg:w-pse w-full">
            <h1 className="text-grey font-bold text-center h-full">Método de pago PSE </h1>
            <hr className="bg-menu h-1 mt-2" />
            <form>
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
                            label="Numero de documento"
                            colorLabel="text-grey"
                            defaultValue={(form && form.cc)}
                            value={(form && form.cc)}
                            onChange={(e) => setForm({ ...form, cc: e.target.value })}
                            placeholder=""
                            type='text'
                            className="bg-white"
                            mask='9999999999'
                            max={10}
                            // control={control}
                            // register={register}
                            // required={true}
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
                    <div className="lg:w-3/6 w-full">
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
                            className="bg-white rounded-lg"
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
                <div className="w-full pb-2">
                    <SelectBank
                        id='bank'
                        name='bank'
                        label="Seleccione banco"
                        colorLabel="text-grey"
                        defaultValue={(form && form?.bank?.bankName)}
                        value={(form && form.bank?.bankName)}
                        onChange={(e) => setForm({ ...form, bank: e })}
                        placeholder=""
                        type='text'
                        className="bg-white"
                        width={"w-82"}
                        px={4}
                        control={control}
                        items={
                            bankColombia?.map((e) => e)
                        }
                        register={register}
                        // required={true}
                        hint={
                            bank || bank?.message
                                ? bank?.message
                                : ""
                        }
                        errors={
                            bank?.message
                                ? true
                                : false
                        }
                    />
                </div>
                <div className="w-full pb-2">
                    <Input
                        id='email'
                        name='email'
                        label="Email"
                        colorLabel="text-grey"
                        autocomplete={'off'}
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
                </div>

                <div className="lg:w-3/6 w-full  pb-2">
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
                        mask='9999999999'
                        max={10}
                        // control={control}
                        // register={register}
                        // required={true}
                        hint={
                            phone || phone?.message
                                ? phone?.message
                                : ""
                        }
                        errors={
                            phone?.message
                                ? true
                                : false
                        }

                    />

                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                    <button className="w-24 h-10 rounded-full bg-red-400 text-white hover:bg-red-500"
                        onClick={onCancel}
                    >Cancelar
                    </button>
                    <button
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

export default PseForm