import React, { useState } from 'react'

const ChangePasswordForm = () => {

    const [form, setForm] = useState(null);
    const [password, setPassword] = useState(false);
    const [password2, setPassword2] = useState(false);
    const [load, setLoad] = useState(false);


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


    return (
        <div className="flex flex-col items-start justify-start w-full space-y-8 mt-8 px-6">

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
    )
}

export default ChangePasswordForm
