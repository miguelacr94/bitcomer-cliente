import React from 'react'
import { Icons } from '../utils/icons'
import { useRouter } from "next/router";
import { Country } from '../utils/data';
import Image from './Ui/Image';
import { Routes } from '../utils/routes';

const Footer = () => {

    const router = useRouter();

    const Links = [
        {
            text: 'Nosotros',
            link: Routes.us
        },
        {
            text: 'Términos de servicio',
            link: Routes.terminos
        },
        {
            text: 'Contacto',
            link: Routes.contact
        }
    ];

    const App = [
        {
            text: 'App store',
            icons: Icons.apple,
            link: ''
        },
        {
            text: 'Play store',
            icons: Icons.playStore,
            link: ''
        }
    ]

    const SocialRed = [
        {
            text: 'Instagram',
            icons: Icons.instagram,
            link: 'https://www.instagram.com/bitcomeroficial/?igshid=YmMyMTA2M2Y%3D'
        },
        {
            text: 'Facebook',
            icons: Icons.facebook,
            link: 'https://www.facebook.com/bitcomer'
        },

    ]



    return (
        <div className="lg:h-52 md:h-footer bg-[#1D67D8] flex flex-col justify-start space-y-4 pt-6 ">

            <div className='w-full grid md:grid-cols-4 grid-cols-2 pl-8  gap-y-8 py-8'>

                <div className='space-y-4 p-4 hidden md:block'>
                    <Image
                        imageContent=' w-40  '
                        src='../image/logo/bitcomerwhite.png'
                    />
                    <div className='flex space-x-4'>
                        {
                            Country.map((c, index) => {
                                return (
                                    <div key={index} className='w-6 h-6 rounded-full overflow-hidden space-x-4'>
                                        <img
                                            src={c.flat}
                                            className='w-full h-full'
                                        />

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* ----------------------------------------------------------------------------- */}
                <div className='space-y-2 text-white'>
                    <h2 className='font-normal text-[text-16]'>Links de intereses</h2>
                    <div className='flex flex-col space-y-2 font-light text-[13px]'>
                        {
                            Links.map((t, index) => {
                                return (
                                    <a onClick={()=>router.push(t.link)} key={index}>{t.text}</a>
                                )
                            })

                        }
                    </div>

                </div>

                {/* --------------------------------------------------------------------------------- */}
                <div className='space-y-2 text-white order-3  min-w-[200px] md:w-auto'>
                    <h2 className='font-normal text-[text-16]'>Descarga nuestra app</h2>
                    <div className='flex flex-col space-y-3 font-light text-[13px]'>
                        {
                            App.map((t, index) => {
                                return (
                                    <div className='flex space-x-2'>
                                        <i className='text-xl'>{t.icons}</i>
                                        <a key={index}>{t.text}</a>
                                    </div>

                                )
                            })

                        }
                    </div>

                </div>

                {/* ---------------------------------------------------------------------------------- */}
                <div className='space-y-2 text-white order-2'>
                    <h2 className='font-normal text-[text-16]'>Síguenos</h2>
                    <div className='flex flex-col space-y-2 font-light text-[13px]'>
                        {
                            SocialRed.map((t, index) => {
                                return (
                                    <a href={t.link} target='_blanck' className='flex space-x-2 hover:underline cursor-pointer'>
                                        <i className='text-xl'>{t.icons}</i>
                                        <span key={index}>{t.text}</span>
                                    </a>

                                )
                            })

                        }
                    </div>

                </div>


            </div>


            <div className="lg:h-12 h-14  lg:mt-0  bg-[#3075DE]  lg:py-0 ">
                <div className="lg:w-2/6 w-full flex justify-start items-center text-start ">
                    <p className="text-white text-sm font-semibold mt-4 px-4 md:px-8">© 2022 Bitcomer. Todos los derechos reservados</p>
                </div>
            </div>

        </div >
    )
}

export default Footer