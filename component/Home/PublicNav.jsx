import { useRouter } from 'next/router'
import React from 'react'
import { ColorHeader, colorMenu, LogoHeader } from '../../utils/helpers'
import { Icons } from '../../utils/icons'
import { publicNavRoute, Routes } from '../../utils/routes'
import Oficine from '../Oficine/Oficine'
import Image from '../Ui/Image'
import RouterAuth from './RouterAuth'


const PublicNav = ({ showMenu, showButton }) => {

    const router = useRouter();



    return (
        <div className={` ${ColorHeader(router?.pathname)} grid md:grid-cols-3 grid-cols-2 w-full  fixed z-10 shadow-md`} >
            <div onClick={() => router.push(Routes.index)} className='flex justify-center'>
                <Image
                    imageContent='p-4 md:h-16 h-12 cursor-pointer'
                    src={LogoHeader(router?.pathname)}
                />
            </div>
            <div className='m-auto hidden md:block'>
                <div className='flex justify-center space-x-6 items-center t'>
                    {
                        publicNavRoute.map((route, index) => {
                            return (
                                <a className={`${router?.pathname === '/' ? 'text-white' : 'text-black'} cursor-pointer hover:scale-105`}
                                    key={index} onClick={() => router.push(route?.link)}>{route.name}</a>
                            )
                        })
                    }

                    <Oficine />


                </div>

            </div>

            <div className='m-auto hidden md:block'>
                <RouterAuth />
            </div>

            <div onClick={() => showMenu()} className={`${colorMenu(router?.pathname)} block lg:hidden w-full flex justify-end items-center px-8`}>
                {!showButton ?
                    <p className=" text-3xl">{Icons.hamburger}</p>
                    :
                    <p className=" text-3xl">{Icons.close}</p>
                }

            </div>



        </div>
    )
}

export default PublicNav
