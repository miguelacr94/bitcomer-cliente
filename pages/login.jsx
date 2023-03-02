import { useContext, useEffect } from 'react';
import LoginForm from '../component/Form/LoginForm'
import { Context } from '../provider/user/context';
import Cookies from '../utils/cookies';
import Router, { useRouter } from "next/router";
import { Routes } from '../utils/routes';
import { getData } from '../provider/user/actions';
import { Icons } from '../utils/icons';

const Login = () => {


    const { user, setUser } = useContext(Context);
    const router = useRouter();

    const loadUser = async () => {
        const token = Cookies.read("ssid");
        if (!token) {
            // return Router.push(Routes.index);
        }
        if (token || !user) {
            const a = await getData();
            if (a) {
                setUser(a);

                return Router.push(Routes.home);
            }

        }
    }
    useEffect(() => {
        loadUser();
    }, [setUser]);


    return (
        <div className='bg-[#3075DE] md:p-12 p-0 w-full flex flex-col justify-center items-start md:max-w-screen-[1400px]'>

            <a
                href={Routes.index}
                className='text-white space-x-2 md:flex items-center justify-center py-4 md:block hidden'>
                <i className='text-xl'>{Icons.cicleLefArrow}</i>
                <span>Regresar</span>
            </a>

            <div className='flex md:flex-row flex-col w-full h-screen md:h-auto md:rounded-lg overflow-hidden relative'>
                <a
                    href={Routes.index}
                    className='text-menu space-x-2 flex items-center justify-center px-4 py-4 md:hidden block absolute'>
                    <i className='text-xl'>{Icons.cicleLefArrow}</i>
                    <span>Regresar</span>
                </a>
                <div className='bg-[#EEF2FE] flex flex-col justify-center items-center p-12 md:w-3/6' >
                    <img
                        src="../image/logo/bitcomer.png"
                        className=" h-6  cursor-pointer"
                    />
                    <img
                        src='../image/register/login.png'
                        className='h-[150px] md:h-[500px]'
                    />
                </div>
                <div className='flex flex-col justify-center items-start bg-white md:w-3/6 md:p-8 lg:p-24'>
                    <LoginForm
                    />
                    <div className='grid grid-cols-1 m-auto mt-6 text-center pb-8 text-[#747474]'>
                        <span>¿No tienes una cuenta?</span>
                        <a onClick={() => router.push(Routes.register)} className='font-semibold cursor-pointer underline'>Regístrate aquí</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 
