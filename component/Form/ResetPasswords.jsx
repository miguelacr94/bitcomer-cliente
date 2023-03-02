import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { SendNewPassword } from '../../provider/user/actions';
import InputAlt from '../Ui/InputAlt';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToasts } from "react-toast-notifications";
import { toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import InputPublic from '../Ui/InputPublic';

const schema = yup.object({

    password: yup.string().required("Contraseña es requerida.").matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){0})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){0}).*$/, "ingresa 8 o más caracteres con una combinación de letras y numeros."),

    // re_password: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!")
    // .required('Required')


});


const ResetPasswords = ({ token, onClose }) => {

    const { addToast } = useToasts();

    const [form, setForm] = useState('');
    const [load, setLoad] = useState(false);
    const [passVerification, setPassVerification] = useState(null);

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });



    const onSendPassword = async () => {

        if (!form?.re_password) {
            setPassVerification({ ...passVerification, message: 'Confirmación es requerida' });
            document.getElementById("re_password").focus();
        } else if (form?.password !== form?.re_password) {
            setPassVerification({ ...passVerification, message: 'Contraseñas no coinciden' });
            document.getElementById("re_password").focus();
        } else {
            setLoad(true);
            setPassVerification(null);
            const payload = {
                password: form.password,
                token: token
            }
            const data = await SendNewPassword(payload);
            if (data) {
                addToast('Recuperación Exitosa',
                    { appearance: toastTypes.SUCCESS, transitionDuration: 2000 });
                setLoad(false);
                onClose();
            } else {
                addToast('Error al momento de enviar',
                    { appearance: toastTypes.ERROR, transitionDuration: 2000 });
                setLoad(false);
            }



        }



    }
    return (


        <div className="p-4 flex flex-col items-center text-md">
            <h1 className="text-center font-bold text-black">Recuperación de contraseña</h1>
            <form className="w-80 p-4" onSubmit={handleSubmit(onSendPassword)}>
                <div className=" flex flex-col justify-center items-center">

                    <InputPublic
                        label="Ingresa tu nueva contraseña"
                        colorLabel="text-black"
                        id='password'
                        type="password"
                        name='password'
                        placeholder="ingresa contraseña"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className=" bg-loginInput
                        outline-none text-xs mt-2 text-register bg-input
                        placeholder:text-grey-grey placeholder:text-md font-semibold text-black border border-grey-line"
                        register={register}
                        defaultValue={(form && form.password)}
                        value={(form && form.password) || ''}
                        control={control}
                        hint={
                            errors.password?.type === "required" || errors.password?.message
                                ? errors.password?.message
                                : ""
                        }
                        errors={
                            errors.password?.type === "required" || errors.password?.message
                                ? true
                                : false
                        }
                    />

                    <div className="mt-2 w-full">
                        <InputPublic
                            label="Ingresa confirmación de contraseña"
                            colorLabel="text-black"
                            id='re_password'
                            type="password"
                            name='re_password'
                            placeholder="confirmar contraseña"
                            onChange={(e) => setForm({ ...form, re_password: e.target.value })}
                            className=" bg-loginInput
                            outline-none text-xs mt-2 text-register bg-input
                            placeholder:text-grey-grey placeholder:text-md font-semibold text-black border border-grey-line"
                            register={register}
                            defaultValue={(form && form.re_password)}
                            value={(form && form.re_password) || ''}
                            control={control}
                            hint={
                                passVerification
                                    ? passVerification.message
                                    : ""
                            }
                            errors={
                                passVerification
                                    ? true
                                    : false
                            }
                        />
                    </div>

                </div>

                <div className="flex justify-center items-center mt-4">
                    <button
                        disabled={load}
                        className="text-white bg-menu rounded-lg px-4 h-10 w-24 flex justify-center items-center disabled:opacity-75" type="submit" >
                        {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Enviar'}

                    </button>
                </div>


            </form>



        </div>


    )
}

export default ResetPasswords