import React, { useContext } from 'react'
import Menu from './Menu/Menu'
import Avatar from './user/Avatar'
import Link from "next/link";
import { Context } from '../provider/user/context';
import { useRouter } from "next/router";
import { Routes } from '../utils/routes';
import { logout } from '../provider/user/actions';

const Bar = () => {
    const { setUser } = useContext(Context);
    const { setQuantityCalcule } = useContext(Context);
    const { setUserPurchase } = useContext(Context);
    const { valueCurrency, setValueCurrency } = useContext(Context);
    const { valueCrypto, setValueCrypto } = useContext(Context);
    const { statusUser, setStatusUser } = useContext(Context);
    const router = useRouter();

    const onLogout = () => {
        logout();
        router.push(Routes.index);
        setUserPurchase('');
        setUser('');
        setStatusUser('');
        setQuantityCalcule('');
        setValueCurrency('');
        setValueCrypto('');

    }


    return (
        <div className="hidden lg:block bg-menu w-bar min-w-bar min-h-bar z-30 h-full  text-center fixed flex flex-col overflow-y-auto ">
            <div className="h-5/6  -mt- flex flex-col items-center">
                <Link href='/home'>
                    {/* <h2 className="text-white text-4xl mt-8 font-semibold cursor-pointer ">Bitcomer</h2> */}
                    <img
                        src="./image/logo/bitcomerwhite.png"
                        className="absolute mt-8 w-44 z-10 cursor-pointer"
                    />
                </Link>
                <div className="flex justify-center mt-32 w-full">
                    <Avatar />
                </div>

                <div className="mt-6 w-full overflow-y-auto ">
                    <Menu />
                </div>


            </div>

            {/* <div className="text-xs h-1/6  flex justify-center items-end ">
                <p className="text-white ">Bitcomer 2022</p>
                <p className="text-white ml-1 mb-0.5">{Icons.Copy}</p>
            </div> */}
            <div className="text-xs h-1/6 flex justify-center items-end ">
                {/* <p className="text-white">Bitcomer 2022 </p>
                <p className="text-white ml-1 mb-0.5">{Icons.Copy}</p> */}
                <button onClick={() => onLogout()} className="flex w-full h-12 justify-center items-center space-x-4 bg-darkBlue text-white text-sm  ">
                    <img src="./image/logout.svg " alt="description of image" />
                    <p>Cerrar sesión</p>
                </button>
            </div>
        </div >
    )
}

export default Bar