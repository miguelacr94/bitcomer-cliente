import React, { useContext, useState } from 'react'
import { registerUser } from '../../../provider/api/user.queries';
import { useToasts } from "react-toast-notifications";
import Cookies from '../../cookies';
import { Routes } from '../../routes';
import useContact from './useContact';
import { Context } from '../../../provider/user/context';
import { toastTypes } from '../../helpers';
import { useRouter } from 'next/router';
const useRegister = () => {

    const { addToast } = useToasts();
    const [loadRegister, setLoadRegister] = useState(false);
    const { user, setUser } = useContext(Context);
    const router = useRouter();

    const savaUserAndGo = (token, user) => {
        if (!token || !user) {
            return;
        } else {
            Cookies.set("ssid", token);
            setUser(user);
            router.push(Routes.home);
        }
    }




    const onRegister = async (data) => {
        setLoadRegister(true);
        const res = await registerUser(data);
        if (res?.response?.data.data === 801) {
            setLoadRegister(false);
            addToast('Ya existe un registro con este correo electrónico, intente con otro', { appearance: toastTypes.WARNING });
    

        } else if (res) {
            setLoadRegister(false);
            savaUserAndGo(res.token, res.user);
            addToast('Registro exitoso, ahora puedes iniciar sesión',
                { appearance: toastTypes.SUCCESS });

        } else {
            setLoadRegister(false);
            addToast('Ocurrió un error durante el registro, intenta nuevamente', { appearance: toastTypes.ERROR });

        }
    }


    return { loadRegister, onRegister }


}

export default useRegister