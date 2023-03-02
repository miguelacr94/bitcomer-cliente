
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import RegisterForm from '../component/Form/RegisterForm';
import { getCountryRegister } from "../provider/api/home.queries";
import { getData } from "../provider/user/actions";
import { Context } from '../provider/user/context';
import Cookies from "../utils/cookies";
import { Icons } from "../utils/icons";
import { Routes } from "../utils/routes";


const Register = () => {


    const { user, setUser } = useContext(Context);
    const router = useRouter();
    const [country, setCountry] = useState(null);

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

    const getCountry = async () => {
        const res = await getCountryRegister();
        if (res) { setCountry(res.data); }
    }
    useEffect(() => {
        getCountry();
    }, [setCountry]);




    useEffect(() => {
        loadUser();
    }, [setUser]);



    return (
        <div className='bg-[#3075DE] md:p-12 p-0 w-full flex flex-col justify-center items-start md:max-w-screen-[1400px]'>

            <a
                href={Routes.index}
                className='text-white space-x-2 md:flex items-center justify-center py-4 md:block hidden '>
                <i className='text-xl'>{Icons.cicleLefArrow}</i>
                <span>Regresar</span></a>

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
                        src='../image/register/register.png'
                        className='h-[150px] md:h-[500px]'
                    />
                </div>
                <div className='flex flex-col justify-center items-center space-y-4 bg-white md:w-3/6 md:p-8 lg:p-24 pt-8 md:pt-0'>
                    <h2 className="text-center mt-6 font-semibold text-menu text-xl">Registro de usuario</h2>
                    <RegisterForm
                    />
                    <div className='grid grid-cols-1 m-auto mt-6 text-center pb-8 text-[#747474]'>
                        <span>¿Ya tienes una cuenta?</span>
                        <a onClick={() => router.push(Routes.login)} className='font-semibold cursor-pointer underline'>Ingresa aquí</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
