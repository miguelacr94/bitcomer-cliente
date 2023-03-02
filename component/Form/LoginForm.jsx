import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { Context } from '../../provider/user/context';
import { Routes } from '../../utils/routes';
import Cookies from '../../utils/cookies';
import Check from '../Ui/Check';
import { loginUser } from '../../provider/user/actions';
import InputAlt from '../Ui/InputAlt';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { Modal } from "react-responsive-modal";
import ResetPassword from './ResetPassword'
import { Icons } from '../../utils/icons';
import ResetPasswords from './ResetPasswords';
import { toastTypes } from '../../utils/helpers';
import { useToasts } from "react-toast-notifications";
import InputPublic from '../Ui/InputPublic';
import useLogin from '../../utils/hoocks/queries/useLogin';


const schema = yup.object({

    email: yup.string().required('Email es requerido.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida."),
    password: yup.string().required("Contraseña requerida.")


});


const LoginForm = () => {

    const router = useRouter();
    const [showSendPasswordModal, setShowpaswordModal] = useState(false)
    const [sendReset, setSendReset] = useState(false)
    const { token } = router.query;

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });


    const { login, loadLogin } = useLogin();

    const onLogin = (data) => {

        login(data);

    }


    // identifica si existe una query en la ruta, y realiza petición de los datos por medio del token
    useEffect(() => {
        if (token) {
            setSendReset(true);
        }
    }, [token]);



    return (
        <div className='grid grid-cols-1 w-full px-8'>
            <img
                src='../image/logo/bitcomer.png'
                className='h-6 mt-6 m-auto hidden md:block'
            />
            <h2 className='text-center text-[#272727] text-[25px] font-normal py-6'>Ingresa a tu cuenta</h2>
            <form onSubmit={handleSubmit(onLogin)} className='space-y-4'>
                <InputPublic
                    id='email'
                    name='email'
                    register={register}
                    error={errors}
                    type='email'
                    placeholder={'Correo electrónico'}
                />
                <InputPublic
                    id='password'
                    name='password'
                    register={register}
                    error={errors}
                    type='password'
                    placeholder={'Contraseña'}
                />
                <div>
                    <a onClick={() => setShowpaswordModal(true)} className='underline text-[#747474]  cursor-pointer text-[15px]'>¿Olvidaste tu contraseña?</a>

                </div>


                <button
                    disabled={loadLogin}
                    className="px-6 h-10  rounded-lg bg-menu text-white flex justify-center items-center disabled:opacity-75" >
                    {loadLogin ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Iniciar sesión'}
                </button>


            </form>
            <Modal
                open={showSendPasswordModal}
                onClose={() => setShowpaswordModal(false)}
                center
            >
                <ResetPassword
                    onClose={() => setShowpaswordModal(false)}
                />


            </Modal>

            <Modal
                open={sendReset}
                onClose={() => setSendReset(false)}
                center
            >
                <ResetPasswords
                    token={token}
                />


            </Modal>

        </div>
    )

}

export default LoginForm