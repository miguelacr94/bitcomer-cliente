import React from 'react'
import Countries from './Countries'
import Notifications from './Notifications'
import { Icons } from '../utils/icons';
import Link from 'next/link';
const NavBar = ({ showMenu, showButton }) => {


    return (
        <nav className="w-full relative lg:w-navBar lg:h-12 h-16 bg-white flex shadow-md fixed lg:min-w-ventana z-20">


            <div className="lg:w-2/6 w-3/12 flex z-10 lg:ml-10  flex lg:flex-row justify-center lg:justify-start ">
                <Countries />

            </div>

            <div className="block lg:hidden w-6/12  h-full flex items-center justify-center z-0">
                <Link href='/home'>
                    <img
                        src="./image/logo/bitcomer.png"
                        className=" z-10 h-5 "
                    // href='/home'
                    />
                </Link>
            </div>

            <div className='md:w-2/6 hidden md:block flex items-center justify-center h-full'>
                {/* <CardReferredTotal /> */}
            </div>


            <div className="lg:w-2/6 w-3/12 flex justify-end items-center lg:px-0 px-2 lg:pr-8 lg:space-x-0 space-x-3 lg:space-x-4">

                <Notifications />

                <div onClick={() => showMenu()} className="block lg:hidden z-10">
                    {!showButton ?
                        <p className="text-menu text-3xl">{Icons.hamburger}</p>
                        :
                        <p className="text-menu text-3xl">{Icons.close}</p>
                    }

                </div>
            </div>
        </nav>
    )
}

export default NavBar