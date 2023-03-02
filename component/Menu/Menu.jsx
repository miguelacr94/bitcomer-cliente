import React, { useContext } from 'react'
import Link from "next/link";
import { menuLink } from '../../utils/routes';
import { useRouter } from "next/router";
import { Context } from '../../provider/user/context';



export const Menu = () => {
    const router = useRouter();
    const { user } = useContext(Context);


    return (

        <nav className="text-white w-11/12 -mr-8 lg:mr-0 flex flex-col  flex justify-center items-start float-right">

            {menuLink.map((route, index) => {

                if (user?.userVerification?.account?.status !== route.status) {
                    return (

                        <Link href={route.link} passHref>
                            <div key={index} className={`${router.route == route.link ? 'bg-white text-menu' : ''} flex justify-center items-center  w-full px-8 h-itemMenu cursor-pointer rounded-l-full`}>
                                <>
                                    <div className="w-8 h-full text-white flex items-center">
                                        <img
                                            src={router.route === route.link ? route?.iconActive : route.icon}
                                            className={`${route.name === 'Home' ? 'w-5 h-5 ml-0.5' : ''}`}
                                        />
                                    </div>
                                    <a className="w-full h-8 text-start ml-2 flex justify-start items-center  font-semibold text-md lg:text-sm" >
                                        {route.name}
                                    </a>
                                </>
                            </div>

                        </Link>

                    )
                }
            })}



        </nav>
    )
}

export default Menu