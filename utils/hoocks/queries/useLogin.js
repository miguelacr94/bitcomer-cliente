import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import { loginUser } from '../../../provider/user/actions';
import { Context } from '../../../provider/user/context';
import Cookies from '../../cookies';
import { toastTypes } from '../../helpers';
import { Routes } from '../../routes';

const useLogin = () => {

    const [loadLogin, setLoadLogin] = useState(false);
    const { user, setUser } = useContext(Context);
    const {statusUser,setStatusUser} = useContext(Context);
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { addToast } = useToasts();

    const router = useRouter();

    const login = async (data) => {
        const res = await loginUser(data);
        if (res) {
            savaUserAndGo(res.token, res.user);
        } else {
            addToast("El usuario o la contraseña es incorrecto", {
                appearance: toastTypes.WARNING,
            });
        }

    }


    const savaUserAndGo = (token, user) => {
        if (!token || !user) {
            return;
        } else {
            Cookies.set("ssid", token);
            setUser(user);
            setStatusUser(user?.userVerification.account.status);
            if (localStorage.getItem('purchase')) {
                setUserPurchase(JSON.parse(localStorage.getItem('purchase')) || []);
                router.push(Routes.negociations);
            } else {
                router.push(Routes.home);
            }

        }

    }

    return { loadLogin, login, }

}

export default useLogin
