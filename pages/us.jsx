import React from 'react'
import PublicMain from '../component/Layouts/PublicMain'
import Content from '../component/Us/Content'
import TransactionsType from '../component/Us/TransactionsType'
import { Icons } from '../utils/icons'

const us = () => {
    return (
        <PublicMain >
            <div className='px-5 mt-12 md:mt-24 space-y-8 pb-12 md:pb-16  max-w-[1200px] m-auto'>
                <Content
                    title='Sobre nosotros'
                    text='Somos un equipo experto en pagos internacionales, trabajamos duro para proporcionar a nuestros usuarios la plataforma más conveniente y segura de Latinoamérica para comprar y vender BTC, LTC, ETH, XRP y otras Criptomonedas.                '
                    image='../image/contact/1.png'
                    className=''
                    order={'md:order-2'}
                    orderText={'md:order-1 md:max-w-[400px]'}
                />
                <Content
                    title='¿Por qué lo hacemos?'
                    text='Creemos que las criptomonedas le permitirá a más personas en todo el mundo, acceso a nuevos mercados, más formas y oportunidades de mejorar su calidad de vida. Queremos formar parte del cambio y ayudar a liderar el camino hacia una economía más descentralizada. Apoyamos la globalización de las criptomonedas para hacer más accesible el conocimiento tecnológico y así contribuir a una sociedad abierta y democrática.                    '
                    image='../image/contact/2.png'
                    className='pt-24'
                    orderText={' md:max-w-[550px]'}
                />
                <div className='grid grid-cols-1 md:grid-cols-2 place-content-center w-full md:pt-24'>
                    <div className='grid place-content-center'>
                        <TransactionsType
                            title={'Compra'}
                            text='Estamos simplificando las compras globales de criptomonedas. Bitcomer te permite comprar bitcoin, ethereum y litecoin al instante a través de nuestro mercado global.'
                            icon={Icons.cart}
                            className='md:max-w-[350px]'
                        />
                    </div>
                    <div className='grid place-content-center'>
                        <TransactionsType
                            title={'Venta'}
                            text='Bitcomer es el mejor lugar para vender sus monedas digitales. Nunca más perderás la oportunidad de cambiar tu moneda digital a efectivo o por transferencia bancaria.'
                            icon={Icons.cart}
                            className='md:max-w-[350px]'
                        />
                    </div>

                </div>

            </div>


        </PublicMain>

    )
}

export default us