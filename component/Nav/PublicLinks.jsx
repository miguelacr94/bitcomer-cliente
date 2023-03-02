import Link from 'next/link';
import React from 'react'

import { Routes } from '../../utils/routes'
import Oficine from '../Oficine/Oficine';

const PublicLinks = () => {

    const routes = [
        {
            text: 'Inicio',
            route: Routes.index
        },
        {
            text: 'Nosotros',
            route: Routes.us
        },
        {
            text: 'Contacto',
            route: Routes.contact
        }
    ]

    return (
        <div className='space-y-2 text-black w-full flex md:flex-row flex-col text-[18px]'>
            {routes.map((r, index) => <Link href={r.route} passHref key={index}>
                <a >{r.text}</a>
            </Link>)}
            <Oficine />
        </div>
    )
}

export default PublicLinks
