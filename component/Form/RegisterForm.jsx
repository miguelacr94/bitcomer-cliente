import React, { useContext, useState } from 'react'
import * as yup from 'yup';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useToasts } from "react-toast-notifications";
import { Icons } from '../../utils/icons';
import { useEffect } from 'react';
import Select from '../Ui/Select';
import InputPublic from '../Ui/InputPublic';
import useContact from '../../utils/hoocks/queries/useContact';
import useRegister from '../../utils/hoocks/queries/useRegister';




const schema = yup.object({

    email: yup.string().required('Email es requerido.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida."),
    password: yup.string().required("Contraseña es requerida.").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más caracteres con una combinación de letras, numeros y símbolos.")


});




const RegisterForm = ({ }) => {

    const { addToast } = useToasts();
    const router = useRouter();

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
        setValue,

    } = useForm();


    const [form, setForm] = useState();
    const [countrySelected, setCountry] = useState(null);
    const { loadRegister, onRegister } = useRegister();
    const [error, setError] = useState(null)


    useEffect(() => {
        setCountry(country?.find((c) => c.name === 'Colombia')); // inicia el select en el país 
    }, [country])






    const { getDataCountry, country } = useContact();
    useEffect(() => {
        getDataCountry();
    }, []);

    const onSend = (data) => {
        if (!data?._country) {
            return setError('_country')
        }
        if (!data?.country) {
            return setError('country')
        }


        onRegister(data);
    }



    return (
        <form
            onSubmit={handleSubmit(onSend)}
            className='space-y-4 px-6'
            autoComplete={false}
        >
            <InputPublic
                id='fullName'
                type='text'
                name='fullName'
                register={register}
                error={errors}
                placeholder='Nombre y apellido'
                control={control}
            />
            <InputPublic
                id='email'
                type='email'
                name='email'
                register={register}
                error={errors}
                placeholder='Correo electrónico'
            />
            <div className='flex space-x-4 items-start justify-start'>
                <div className='w-40'>

                    <Select
                        id='_country'
                        name='_country'
                        // value={country && country.name || pais?.find((c) => c.name === user?.location?.country?.name)?.name}
                        // defaultValue={(country && country.name || pais?.find((c) => c.name === user?.location?.country?.name)?.name)}
                        onChange={(e) => setValue('_country', e)}
                        items={country && country.map((c) => c.code)}
                        placeholder="País"
                        className="bg-white h-12  rounded-lg"
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
                <InputPublic
                    id='phone'
                    name='phone'
                    type='number'
                    register={register}
                    error={errors}
                    placeholder='Teléfono'
                />
            </div>
            <InputPublic
                id='password'
                type='password'
                name='password'
                register={register}
                error={errors}
                placeholder='Contraseña'
            />
            <Select
                id='country'
                name='country'
                register={register}
                errors={errors?.country}
                placeholder='Seleccione país'
                className="bg-white h-12 rounded-lg border"
                onChange={(e) => setValue('country', e)}
                items={country && country.map((c) => c.name)}
                error={error == 'country' ? true : false}

            />
            <Select
                id='personType'
                name='personType'
                register={register}
                errors={errors?.personType}
                placeholder='Tipo de persona'
                className="bg-white h-12  rounded-lg border"
                items={['Persona', 'Empresa']}
                onChange={(e) => setValue('personType', e)}
            />
            

            <button className='bg-menu text-white px-6 h-10 rounded-lg'>
                {loadRegister ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Enviar'}
            </button>
        </form>
    )
}

export default RegisterForm