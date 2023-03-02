import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import Input from '../Ui/Input';
import TextArea from '../Ui/TextArea';
import { SendContact } from '../../provider/api/home.queries';
import { useToasts } from "react-toast-notifications";
import { toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import InputContact from '../Ui/InputContact';
import TextAreaContact from '../Ui/TextAreaContact';
import useContact from '../../utils/hoocks/queries/useContact';
import Select from '../Ui/Select';

const schema = yup.object({
    name: yup.string().required("Nombre es requerido"),
    email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    message: yup.string().required("Nombre es requerido"),

});

const ContactForm = () => {

    const { addToast } = useToasts();
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm({ resolver: yupResolver(schema) });


    const [form, setForm] = useState(null);
    const [load, setLoad] = useState(false);


    const { getDataCountry, country } = useContact()
    useEffect(() => {
        getDataCountry();
    }, []);





    const sendContadMessage = async () => {
        const payload = {
            name: form?.name,
            email: form?.email,
            message: form?.message
        }
        setLoad(true);
        const res = await SendContact(payload);
        if (res) {
            setLoad(false);
            addToast('Mensaje enviado con exito',
                { appearance: toastTypes.SUCCESS });
            setForm('');
            reset();
        } else {
            addToast('Error al enviar mensaje',
                { appearance: toastTypes.SUCCESS });
        }

    }


    return (
        <form className="bg-[#3075DE] mt-12 px-4 rounded-lg max-w-[500px] m-auto" onSubmit={handleSubmit(sendContadMessage)}>
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 w-full rounded-lg ">
                <InputContact
                    id='name'
                    name='name'
                    colorLabel="text-grey"
                    defaultValue={(form && form.name)}
                    value={(form && form.name)}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nombre"
                    type='text'
                    className="bg-white h-14"
                    control={control}
                    register={register}
                    required={true}
                    hint={
                        errors.name?.type === "required" || errors.name?.message
                            ? errors.name?.message
                            : ""
                    }
                    error={
                        errors.name?.type === "required" || errors.name?.message
                            ? true
                            : false
                    }

                />
                <InputContact
                    id='email'
                    name='email'
                    colorLabel="text-grey"
                    defaultValue={(form && form.email)}
                    value={(form && form.email)}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Correo"
                    type='text'
                    className="bg-white h-14"
                    control={control}
                    register={register}
                    required={true}
                    hint={
                        errors.email?.type === "required" || errors.email?.message
                            ? errors.email?.message
                            : ""
                    }
                    error={
                        errors.email?.type === "required" || errors.email?.message
                            ? true
                            : false
                    }

                />
            </div>
            <div className="flex space-x-2">
                <div className='w-40'>
                    <Select
                        id='code'
                        name='code'
                        // value={country && country.name || pais?.find((c) => c.name === user?.location?.country?.name)?.name}
                        // defaultValue={(country && country.name || pais?.find((c) => c.name === user?.location?.country?.name)?.name)}
                        onChange={(e) => setValue('code', e)}
                        items={country && country.map((c) => c.code)}
                        placeholder="País"
                        className="bg-white h-[56px] mt-5  rounded-lg"
                        control={control}
                        width='px-4'
                        register={register}
                        search={true}
                        hint={
                            errors.country?.type === "required" || errors.country?.message
                                ? errors.country?.message
                                : ""
                        }
                        errors={
                            errors.country?.type === "required" || errors.country?.message
                                ? true
                                : false
                        }
                    />
                </div>

                <InputContact
                    id='phone'
                    name='phone'
                    defaultValue={(form && form.phone)}
                    value={(form && form.phone)}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Teléfono"
                    type='text'
                    className="bg-white h-14"
                    control={control}
                    register={register}
                    required={true}
                    hint={
                        errors || errors?.name
                            ? errors?.name
                            : ""
                    }
                    errors={
                        errors?.name || errors?.name
                            ? true
                            : false
                    }

                />

            </div>
            <TextAreaContact
                id='message'
                name='message'
                colorLabel="text-grey"
                placeholder='Escríbenos...'
                defaultValue={(form && form.message)}
                value={(form && form.message)}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                type='text'
                className="bg-white h-24"
                control={control}
                register={register}
                required={true}
                hint={
                    errors.message?.type === "required" || errors.message?.message
                        ? errors.message?.message
                        : ""
                }
                error={
                    errors.message?.type === "required" || errors.message?.message
                        ? true
                        : false
                }

            />
            <div className="w-full flex justify-start items-start pb-12">
                <button
                    disabled={load}
                    className="bg-transparent border border-white rounded-lg w-40 text-white h-12 mt-8 
                    m-auto disabled:opacity-75 
                    flex  hover:bg-white hover:text-[#3075DE]
                    justify-center items-center">
                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center
                     text-white">{Icons.Load}</p> : 'Enviar'}
                </button>

            </div>


        </form>
    )
}

export default ContactForm