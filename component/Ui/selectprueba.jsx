import React, { useContext, useEffect, useState } from 'react'
import Input from '../Ui/Input'
import Select from '../Ui/Select'
import Button from '../Ui/Button'
import { City, Country } from '../../utils/data'
import { Context } from '../../provider/user/context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { getCountry } from '../../provider/api/home.queries'
import { Formik, Form, Field, ErrorMessage } from "formik";


const schema = yup.object({
    fullName: yup.string().required("Nombre es requerido"),
    address: yup.string().required("Direccion es requerida"),
    // country: yup.string().required("Pais es requerido"),
    // city: yup.string().required("Ciudad es requerida")


    // email: yup.string().required('Falta el email electrónico.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida"),
    // password: yup.string().required("Contraseña requerida").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más casacteres con una combinación de letras, numeros y símbolos")


});


const initialState = {
    fullName: 'Harold ortiz',
    // country: '',
    // city: ''
}

const ProfileForm = () => {
    const { user, setUser } = useContext(Context);
    const [form, setForm] = useState(initialState);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState('');

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });



    const onSubmit = (e) => {
        // e.preventDefault();
        const payload = {
            fullname: form.fullName,
            country: form.country,
            city: city,
            address: form.address,
            phone: form.phone
        }
      
    }



    const handleChangeCountry = (e) => {
        const country = Country.find((c) => c.name === e);
        if (country) {
            setForm({ ...form, country: e });
            setCountry({ ...country, country });
        }
        if (e != form.country) {
            setCity('');
        }
    }



    useEffect(() => {
        // setForm(user)
        // setCity(user.city)
        getCountries()

    }, [user, setForm])



    const onSend = (e) => {
        e.preventDefault();
        if (form.country === null || form.country === undefined) {
            alert('seleccione pais')
        }

        handleSubmit(onSubmit)
    }


    return (
        <>

            <Formik
                initialValues={{ fullName: '', address: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.fullName) {
                        errors.fullName = 'Required';
                        console.log(errors);
                    }
                    if (!values.country) {
                        errors.country = 'Required';
                        console.log(errors);
                    }
                  
                    // } else if (
                    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    // ) {
                    //     errors.email = 'Invalid email address';
                    // }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
    
                        console.log(values);

                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} >

                        <Input
                            id='fullName'
                            name='fullName'
                            defaultValue={(form && form.fullName)}
                            value={values.fullName}
                            onChange={handleChange}
                            placeholder="Nombres y apellidos"
                            type='text'
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.fullName?.type === "required" || errors.fullName?.message
                                    ? errors.fullName?.message
                                    : ""
                            }
                            errors={
                                errors.fullName?.type === "required" || errors.fullName?.message
                                    ? true
                                    : false
                            }

                        />

                        <Input
                            id='email'
                            name='email'
                            defaultValue={(form && form.email)}
                            value={(form && form.email)}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                            type='text'
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.email?.type === "required" || errors.email?.message
                                    ? errors.fullName?.message
                                    : ""
                            }
                            errors={
                                errors.email?.type === "required" || errors.email?.message
                                    ? true
                                    : false
                            }

                        />
                        <Input
                            id='phone'
                            name='phone'
                            defaultValue={(form && form.phone)}
                            value={(form && form.phone)}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="Teléfono"
                            type='text'
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.phone?.type === "required" || errors.phone?.message
                                    ? errors.fullName?.message
                                    : ""
                            }
                            errors={
                                errors.phone?.type === "required" || errors.phone?.message
                                    ? true
                                    : false
                            }

                        />
                        <input type="text" placeholder="code" value={form && form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
                        <Select
                            id='country'
                            name='country'
                            value={values.country}
                            defaultValue={(form && form.country) || ''}
                            onChange={handleChange}
                            onSelect={(e) => handleChangeCountry(e)}
                            items={Country.map((c) => c.name)}
                            placeholder="Pais"
                            className="bg-white"
                            control={control}
                            register={register}
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
                        <Select
                            id='city'
                            name='city'
                            value={(city && city)}
                            defaultValue={(city && city)}
                            onChange={(e) => console.log(e)}
                            onSelect={(e) => setCity(e)}
                            items={country?.citys.map((e) => `${e.name}`) || []}
                            placeholder="Ciudad"
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.city?.type === "required" || errors.city?.message
                                    ? errors.city?.message
                                    : ""
                            }
                            errors={
                                errors.city?.type === "required" || errors.city?.message
                                    ? true
                                    : false
                            }
                        />
                        <Input
                            id='address'
                            name="address"
                            value={values.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            placeholder="Direccion"
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.address?.type === "required" || errors.address?.message
                                    ? errors.address?.message
                                    : ""
                            }
                            errors={
                                errors.address?.type === "required" || errors.address?.message
                                    ? true
                                    : false
                            }
                        />
                        <Input
                            id='phone'
                            value={form && form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="Celular"
                            className="bg-white"
                        />
                        <button type='submit'> dssdd</button>
                        <Button
                            text='ACTUALIZAR'
                            className="bg-menu px-10 text-xs float-right mt-6"
                            type='submit'

                        />
                    </form>
                )}
            </Formik>

        </>

    )
}

export default ProfileForm