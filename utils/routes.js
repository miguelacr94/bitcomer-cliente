export class Routes {
    static index = '/'
    static home = '/home'
    static negociations = '/negociations'
    static orders = '/orders'
    static verifications = '/verifications'
    static tickets = '/tickets'
    static configurations = '/configurations'
    static login = '/login'
    static register = '/register'
    static terminos = '/terminos'
    static otc = '/otc'
    static otcList = '/otcList'
    static referer = '/referer'
    //  Public routes

    static us = '/us'
    static help = '/'
    static contact = '/contact'
    static giro = '/giro'

}


export const menuLink = [
    {
        name: 'Home',
        link: Routes.home,
        icon: './image/grid.svg',
        iconActive: './image/gridActive.svg'

    },
    {
        name: 'Compras y Ventas',
        link: Routes.negociations,
        icon: './image/transaccion.svg',
        iconActive: './image/purchaseActive.svg'

    },
    {
        name: 'Giros',
        link: Routes.giro,
        icon: './image/transaccion.svg',
        iconActive: './image/purchaseActive.svg'

    },



    {
        name: 'Ordenes',
        link: Routes.orders,
        icon: './image/orders.svg',
        iconActive: './image/orderActive.svg'


    },
    {
        name: 'Referidos',
        link: Routes.referer,
        icon: './icon/referredWhite.png',
        iconActive: './icon/referredBlue.png'


    },


    // {
    //     name: 'Verificación',
    //     link: Routes.verifications,
    //     icon: './image/user.png',
    //     status: 'verified'

    // },
    // {
    //     name: 'Ticket',
    //     link: Routes.tickets,
    //     icon: './image/ticket.png'

    // },
    {
        name: 'Configuracion',
        link: Routes.configurations,
        icon: './image/configuration.svg',
        iconActive: './image/configurationActive.svg'

    }

]

export const publicNavRoute = [

    {
        name: 'Nosotros',
        link: Routes.us
    },
    // {
    //     name: 'Ayuda',
    //     link: Routes.help
    // },
    {
        name: 'Contacto',
        link: Routes.contact
    }
]
