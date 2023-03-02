import { useRouter } from 'next/router'
import React from 'react'
import { Routes } from '../../utils/routes'
import ButtonAuth from '../Ui/ButtonAuth'

const RouterAuth = () => {


    const router = useRouter();

    const routes = [
        {
            text: 'Iniciar sesión',
            className: ` text-white bg-[#3075DE] border border-white hover:opacity-75 `,
            router: Routes.login
        },
        {
            text: 'Regístrate',
            className: 'text-black bg-white border border-[#3075DE] hover:text-menu',
            router: Routes.register
        },


    ];



    return (
        <div className='flex space-x-6'>
            {routes.map((r, index) => {
                return (
                    <ButtonAuth
                        onClick={() => router.push(r?.router)}
                        key={index}
                        text={r.text}
                        className={r?.className}
                    />
                )

            })

            }
        </div>
    )
}

export default RouterAuth
