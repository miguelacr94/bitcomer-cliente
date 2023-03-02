import React, { useContext, useEffect, useState } from 'react'
import Input from '../Ui/Input'
import Select from '../Ui/Select'
import Button from '../Ui/Button'
import { City, Country } from '../../utils/data'
import { Context } from '../../provider/user/context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import Phone from '../Ui/Phone'
import { capitalizer, letter, toastTypes, viewFormData } from '../../utils/helpers'
import { updateUser } from '../../provider/user/actions'
import { useToasts } from "react-toast-notifications";
import { Icons } from '../../utils/icons'


const schema = yup.object({

});


const ProfileForm = ({ user, setUser, pais, image }) => {

    const [form, setForm] = useState(null);
    const [phone, setPhone] = useState(null);
    const [location, setLocation] = useState(null);
    const [country, setCountry] = useState(null);
    const [load, setLoad] = useState(false);
    const { addToast } = useToasts();



    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });


    useEffect(() => {
        setForm(user);
        setPhone(user?.phone);
        setLocation(user?.location);
        // setCountry(user?.location?.country);
        //    getCountries()

    }, [user, setForm])


    const updateUserData = async () => {

        const _country = pais.find((c) => c.name === country?.name);
        const payload = new FormData();
        payload.append("fullName", form?.fullName);
        payload.append("email", form?.email);
        payload.append("phone", JSON.stringify({ number: phone?.number, code: phone?.code?.code || phone?.code }));
        payload.append("photo", image?.image);
        payload.append("location", JSON.stringify({ address: location?.address, country: _country?._id || country?._id || location?.country?._id })
        );
        viewFormData(payload);
        setLoad(true);
        const res = await updateUser(payload);
        if (res) {
            setLoad(false);
            // setUser(res?.data);
            addToast('Actualización exitosa',
                { appearance: toastTypes.SUCCESS });
        } else {
            addToast('Error al actualizar',
                { appearance: toastTypes.ERROR });
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

    return (
        <>
            <form onSubmit={handleSubmit(updateUserData)} className="space-y-3 md:mt-0 mt-8" >
                <Input
                    id='fullName'
                    name='fullName'
                    defaultValue={(form && form.fullName)}
                    value={(form && form.fullName)}
                    onChange={handleChangeInput}
                    placeholder="Nombres y apellidos"
                    type='text'
                    className="bg-white"
                    // formatChars={letter}


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
                < div className="w-full flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-3">
                    <div className="lg:w-7/12 w-full">
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
                    </div>
                    <div className="lg:w-5/12 w-full ">
                        <Phone
                            id='phone'
                            name='phone'
                            defaultValue={(phone && phone.number)}
                            value={(phone && phone?.number)}
                            valuePhone={phone && phone.code}
                            onChange={(e) => setPhone({ ...phone, number: e.target.value })}
                            code={(e) => setPhone({ ...phone, code: e })}
                            valueCode={phone && phone.code}
                            placeholder="Teléfono"
                            type='text'
                            className="bg-white"
                            control={control}
                            register={register}
                            hint={
                                errors.phone?.type === "required" || errors.phone?.number?.message
                                    ? errors.fullName?.message
                                    : ""
                            }
                            errors={
                                errors.phone?.type === "required" || errors.phone?.message
                                    ? true
                                    : false
                            }

                        />
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col w-full lg:space-x-4 lg:space-y-0 space-y-3">
                    <div className="lg:w-5/12 w-full">
                        <Select
                            id='country'
                            name='country'
                            value={country && country.name || pais?.find((c) => c.name === user?.location?.country?.name)?.name}
                            defaultValue={(country && country.name || pais?.find((c) => c.name === user?.location?.country?.name)?.name)}
                            onChange={(e) => setCountry({ ...country, name: e })}
                            items={pais && pais.map((c) => c.name)}
                            placeholder="País"
                            className="bg-white"
                            control={control}
                            width='w-80'
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
                    <div className="lg:w-7/12 w-full">
                        <Input
                            id='address'
                            name="address"
                            value={location && location?.address && capitalizer(location.address)}
                            onChange={(e) => setLocation({ ...location, address: e.target.value })}
                            placeholder="Dirección"
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

                    </div>
                </div>

                <Input
                    id='phone'
                    value={form && form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Celular"
                    className="bg-white"
                />

                <button
                    disabled={load}
                    className="bg-menu px-10 text-xs m-auto outline-none lg:float-right mt-6 h-10 rounded-full text-white w-36 flex justify-center items-center disabled:opacity-75">
                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Actualizar'}
                </button>

            </form>



        </>

    )
}

export default ProfileForm