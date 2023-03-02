import React, { useContext, useEffect, useState } from 'react'
import ImgProfile from '../component/Configurations/ImgProfile'
import ProfileForm from '../component/Form/ProfileForm'
import MainLayout from '../component/Layouts/MainLayout'
import { passwordUpdate } from '../provider/api/user.queries'
import { Context } from '../provider/user/context'
import { toastTypes } from '../utils/helpers'
import { Icons } from '../utils/icons'
import { useToasts } from "react-toast-notifications"
import Swal from 'sweetalert2'
import { deleteAccount } from '../provider/user/actions'
import { getCountryRegister } from '../provider/api/home.queries'
import { dominio } from '../utils/config'
import ReferredCopy from '../component/Referer/ReferredCopy'

const Configurations = () => {

    const { user, setUser } = useContext(Context);
    const [country, setCountry] = useState(null);
    const [load, setLoad] = useState(false);
    const [form, setForm] = useState(null);
    const { addToast } = useToasts();
    const [password, setPassword] = useState(false);
    const [password2, setPassword2] = useState(false);


    const getCountries = async () => {
        const res = await getCountryRegister();
        if (res) {
            setCountry(res.data)
        }
    }

    useEffect(() => {
        getCountries();
    }, [setCountry]);




    const updatePassword = async () => {

        if (!form?.re_password) {
            setPassword({ ...password, message: 'Contraseña es requerida' });
            return document.getElementById("password").focus();
        }

        else if (!/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){0})(?=.*\d)((?=.*[a-z]){0})((?=.*[A-Z]){0})((?=.*[0-9]){1}).*$/i.test(form.re_password)) {
            setPassword({ ...password, message: 'ingresa 8 o más caracteres con una combinación de letras y números' });
            return document.getElementById("password").focus();
        } else {
            setPassword({ ...password, message: null });
        }
        if (!form?.re_password2) {
            setPassword2({ ...password2, message: 'Contraseña es requerida' });
            return document.getElementById("password2").focus();
        }
        else if (form.re_password !== form.re_password2) {
            setPassword2({ ...password2, message: 'Contraseñas no coinciden' });
            return document.getElementById("password2").focus();
        } else {
            setPassword2({ ...password2, message: null });

        }

        const payload = {
            password: form.re_password
        }


        setLoad(true);
        const res = await passwordUpdate(payload);
        if (res) {
            addToast('Cambio de contraseña exitoso',
                { appearance: toastTypes.SUCCESS });

            setLoad(false);

        } else {
            addToast('Error al actualizar contraseña',
                { appearance: toastTypes.ERROR });
            setLoad(false);
        }

    }


    const removeAccount = () => {

        Swal.fire({
            title: 'Seguro desea desactivar su cuenta?',
            text: "Una vez desactivada no podrá recuperarla!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, desactivar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoad(true);
                const res = await deleteAccount();
                if (res) {
                    addToast('Cuanta desactivada con éxito',
                        { appearance: toastTypes.SUCCESS });
                    setLoad(false);
                } else {
                    addToast('Eror al cancelar cuenta',
                        { appearance: toastTypes.ERROR });
                    setLoad(false);
                }

            }
        })
    }



    return (
        <MainLayout >

            <div className="overflow-auto lg:mt-6 py-2 lg:pl-12 lg:pr-0 pb-8 relative px-4 lg:px-0">

                <h2 className=" font-bold ml-2 text-md text-menu mt-12 ">Configuración</h2>
                <div className="w-5/6 flex justify-end px-16 hidden lg:block">
                    <button
                        disabled={load}
                        onClick={() => removeAccount()}
                        className="bg-red-400 float-right rounded-full text-white w-40 text-xs h-10 flex justify-center items-center">
                        {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-menu">{Icons.Load}</p> : 'Desactivar cuenta'}
                    </button>
                </div>
                <div className="w-full flex flex-col lg:mt-0 mt-12">
                    <span className="flex space-x-2 items-center">
                        <i className="bg-menu w-2 h-2 rounded-full" />
                        <p className="text-black text-xs font-semibold">Cambiar tu foto de perfil</p>
                    </span>
                    <div className="flex lg:flex-row flex-col lg:space-x-4 lg:w-10/12 w-full">

                        <div className="lg:w-2/6 w-full mt-4 flex flex-col items-center">
                            <ImgProfile
                                photo={user?.photo}
                            />
                            <p className="text-xs text-black font-semibold text-center w-40">Presiona click o arrastra la imagen para cambiar foto de perfil</p>

                            <ReferredCopy />
                        </div>
                        <div className="w-full md:px-16 lg:w-4/6 lg:pr-16">
                            <ProfileForm
                                user={user}
                                pais={country && country}
                                setUser={(e) => setUser(e)}
                            />
                        </div>
                    </div>
                </div>




                <div className="mt-16 pb-12  flex flex-col justify-center items-start w-full lg:w-5/6 lg:space-x-12 mb-16 lg:mb-0">
                    <span className="flex space-x-2 items-center w-40">
                        <i className="bg-menu w-2 h-2 rounded-full" />
                        <p className="text-black text-xs font-semibold">Cambiar contraseña</p>


                    </span>
                    <div className="flex flex-col items-start justify-center w-full space-y-8 mt-8 px-6  flex justify-center items-center ">

                        <div className="flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0 items-center justify-center">
                            <p className="text-grey-light text-xs w-48">Ingresa tu nueva contraseña</p>
                            <div className="flex justify-center flex-col">
                                <input
                                    id='password'
                                    type="password"
                                    className="border rounded-full outline-none h-11 text-center text-sm w-64 border-grey-bInput bg-white text-grey"
                                    onChange={(e) => setForm({ ...form, re_password: e.target.value })}
                                    value={form && form.re_password}

                                />
                                <p className="text-xs text-red-400 ml-4 mt-16 absolute">{password && password?.message}</p>
                            </div>

                        </div>

                        <div className="flex lg:flex-row flex-col lg:space-x-2 space-y-2 lg:space-y-0 mt-12 justify-center items-center">

                            <p className="text-grey-light text-xs w-48 mt-4 lg:-mt-12">Confirma tu nueva contraseña</p>

                            <div>
                                <input
                                    id='password2'
                                    type="password"
                                    className="border rounded-full outline-none h-11 text-center w-64 border-grey-bInput bg-white text-grey"
                                    onChange={(e) => setForm({ ...form, re_password2: e.target.value })}
                                    value={form && form.re_password2}


                                />
                                <p className="text-xs text-red-400 mt-1 ml-4 ">{password2 && password2?.message}</p>
                                <button
                                    disabled={load}
                                    onClick={() => updatePassword()}
                                    className="bg-white border border-menu mt-4 text-menu px-4 rounded-full w-36 m-auto h-10 disabled:opacity-75 flex items-center justify-center ">
                                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-menu">{Icons.Load}</p> : 'Actualizar'}
                                </button>
                            </div>

                        </div>
                        <div className="w-full flex justify-center px-16 block lg:hidden">
                            <button
                                disabled={load}
                                onClick={() => removeAccount()}
                                className="bg-red-400 rounded-full text-white w-40 text-xs h-10 flex justify-center items-center">
                                {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-menu">{Icons.Load}</p> : 'Desactivar cuenta'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </MainLayout >
    )
}

export default Configurations
