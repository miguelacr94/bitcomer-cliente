import { useRouter } from 'next/router';
import React from 'react'
import { Icons } from '../../utils/icons';
import { Routes } from '../../utils/routes';
import PublicLinks from '../Nav/PublicLinks';

const MenuMobile = ({ showMenu, setShowMenu }) => {

    const router = useRouter();


    return (
        <div className={`${!showMenu ? '-mr-menu' : 'mr-0'} bg-white block lg:hidden top-0  w-full  h-screen lg:h-80 fixed z-30 right-0  transition-left duration-500 ease-in-out shadow-xl`}>
            <div className="grid grid-cols-2 px-4 mt-12">

                <div className="w-full ">
                    <img
                        src="./image/logo/bitcomer.png"
                        className=" -mt-1 w-40  w-40 z-10 "
                        onClick={() => { return router.push(Routes.index); }}
                    />
                </div>
                <div className="text-black h-full justify-end flex items-center">
                    <p onClick={() => setShowMenu(!showMenu)} className=" z-30 text-3xl">{Icons.close}</p>
                </div>
            </div>


            <div className="text-black mt-24 space-y-4">

                <div className=" px-6">
                    <PublicLinks />
                </div>

                <div className="w-full flex flex-col justify-center pt-8 px-4">
                    <button
                        onClick={() => { return router.push(Routes.login); }}
                        className="bg-menu w-full max-w-80 rounded-lg h-10 text-white m-auto font-semibold"
                    >Iniciar Sesión
                    </button>
                    <button
                        onClick={() => { return router.push(Routes.register); }}
                        className="bg-transparent w-full  max-w-80 rounded-lg h-10 text-[#747474] m-auto mt-4 font-semibold border"
                    >Regístrate
                    </button>
                </div>
            </div>


        </div>

    )
}

export default MenuMobile
