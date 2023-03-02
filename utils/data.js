export const Pay = [
    // {
    //     name: 'credit',
    //     icon: './image/visa.png',
    //     icon2: './image/mastercard.png',
    //     icon3: './image/american.png',
    //     text: 'Tarjeta de credito'
    // },
    // {
    //     name: 'pse',
    //     icon: 'https://images.squarespace-cdn.com/content/v1/5a1899b251a584c59851ac92/1553621616656-ZHE8W4QE20ZM4788RNP0/BotonPSE.png',
    //     text: 'PSE'
    // },

    //suspendidos hasta nuevo aviso

    {
        name: 'banco',
        icon: 'https://cdn-icons-png.flaticon.com/512/1138/1138038.png',
        text: 'Banco'
    },

    {
        name: 'efectivo',
        icon: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
        text: 'Efectivo'
    }


]



export const Otc = [
    { name: '#' },
    { name: 'Codigo' },
    { name: 'Tipo transferencia' },
    { name: 'Estado' },
    { name: 'Fecha' },
    { name: 'Moneda' },
    { name: 'Valor' },

]


export const Orders = [
    { name: '#' },
    { name: 'Codigo' },
    { name: 'Tipo oparación' },
    { name: 'Estado' },
    { name: 'Fecha' },
    { name: 'Cripto' },
    { name: 'Cantidad' },
    { name: 'Valor' },

]
export const Ticket = [
    { name: 'Codigo' },
    { name: 'Comentatario' },
    { name: 'Status' },
    { name: 'Fecha' },

]


export const Country = [
    {
        id: 1,
        name: 'Colombia',
        flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1200px-Flag_of_Colombia.svg.png',
        address: 'Cali Centro Comercial Unicentro. Oficina: 409a',
        citys: [
            {
                id: 1,
                name: 'Bogota',
                idCountry: 1
            },
            {
                id: 2,
                name: 'Cali',
                idCountry: 1
            }
        ]
    },

    {
        id: 2,
        name: 'El Salvador',
        flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/1200px-Flag_of_El_Salvador.svg.png',
        address: 'San Salvador World Trade Center. Local: 105',
        citys: [
            {
                id: 1,
                name: 'City 1',
                idCountry: 1
            },
            {
                id: 2,
                name: 'City 2',
                idCountry: 1
            }
        ],
    },
    {
        id: 3,
        name: 'Panama',
        flat: 'https://static4.depositphotos.com/1008458/359/i/600/depositphotos_3594002-stock-photo-panama-flag.jpg',
        address: 'Ciudad de panamá PH Sunset Strip. Oficina: 313 Corregimiento de san Francisco en la vía Israel',
        citys: [
            {
                id: 1,
                name: 'City 1',
                idCountry: 1
            },
            {
                id: 2,
                name: 'City 2',
                idCountry: 1
            }
        ],
    },


]


// export const City = [

//     {
//         id: 2,
//         name: 'City 2',
//         idCountry: 2
//     }
// ]


export const Items = [
    {
        id: 1,
        item: 'item1'
    },
    {
        id: 2,
        item: 'item2'
    },
    {
        id: 3,
        item: 'item3'
    },
    {
        id: 4,
        item: 'item4'
    }

]

export const Profesion = [
    {
        id: 1,
        name: 'profesion 1'
    },
    {
        id: 2,
        name: 'profesion 2'
    },
    {
        id: 3,
        name: 'profesion 3'
    },
    {
        id: 4,
        name: 'profesion 3'
    },
    {
        id: 4,
        name: 'profesion 3'
    }
]
export const Nacionalidad = [
    {
        id: 1,
        name: 'Colombia'
    },
    {
        id: 2,
        name: 'El salvador'
    },
    {
        id: 3,
        name: 'Panama'
    }
]

export const Currency = [
    {
        id: 1,
        name: 'Bitcoin',
        icon: <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8,13v4H6v2h2h1v2h2v-2h2v2h2v-2.051c1.968-0.249,3.5-1.915,3.5-3.949c0-1.32-0.65-2.484-1.64-3.213 C17.563,11.066,18,10.084,18,9c0-1.858-1.279-3.411-3-3.858V3h-2v2h-2V3H9v2H6v2h2v4V13z M14.5,17H10v-4h4.5c1.103,0,2,0.897,2,2 S15.603,17,14.5,17z M10,7h4c1.103,0,2,0.897,2,2s-0.897,2-2,2h-4V7z"></path></svg>
    },
    {
        id: 2,
        name: 'Bitcoin2',
        icon: <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8,13v4H6v2h2h1v2h2v-2h2v2h2v-2.051c1.968-0.249,3.5-1.915,3.5-3.949c0-1.32-0.65-2.484-1.64-3.213 C17.563,11.066,18,10.084,18,9c0-1.858-1.279-3.411-3-3.858V3h-2v2h-2V3H9v2H6v2h2v4V13z M14.5,17H10v-4h4.5c1.103,0,2,0.897,2,2 S15.603,17,14.5,17z M10,7h4c1.103,0,2,0.897,2,2s-0.897,2-2,2h-4V7z"></path></svg>
    }
]


export const stepPurchase = [
    {
        id: 1,
        text: '1. Haz tu pedido.',
        image: './image/step1P.png'
    },
    {
        id: 2,
        text: '2. Luego haces la transferencia.',
        image: './image/step2P.png',
        marginLeft: 'step',
        marginTop: 7
    },
    {
        id: 3,
        text: '3. Y recibes tus criptos.',
        image: './image/step3P.png',
        marginTop: 7
    },
]


export const stepSale = [
    {
        id: 1,
        text: '1. Haz tu pedido.',
        image: './image/step1P.png'
    },
    {
        id: 2,
        text: '2. Envía las criptos acordadas.',
        image: './image/step2S.png',
        marginLeft: '80px',
        marginTop: '28px'
    },
    {
        id: 3,
        text: '3. Y recibes tu transferencia o dinero en efectivo.',
        image: './image/step3S.png',
        marginTop: '28px'
    },
]


export const services = [
    {
        text: 'Compra o venta rápida y segura',
        imagen: './image/service1.png'
    },
    {
        text: 'Experiencia de más de 6 años en el mercado Cripto',
        imagen: './image/service2.png'
    },
    {
        text: 'Seguridad en tus transacciones',
        imagen: './image/service3.png'
    }
]

export const payMethod = [

    {
        text: 'pse',
        image: './image/pse.png'
    },
    {
        text: 'visa',
        image: './image/visa.png'
    },
    {
        text: 'mastercard',
        image: './image/mastercard.png'
    },
    {
        text: 'qr',
        image: './image/qr.png'
    },
    {
        text: 'wompi',
        image: './image/wampi.png'
    },
    {
        text: 'nequi',
        image: './image/nequi.png'
    },

]


export const testimony = [
    {
        id: 1,
        name: 'Andrea Carolina Pérez',
        flat: './image/colombia.png',
        image: './image/3.png',
        title: 'Testimonio',
        testimony: 'Cada transacción que realizamos con Bitcomer siempre nos da tranquilidad, realmente nos ha facilitado el proceso de compra de bitcoin, siempre se han caracterizado por su responsabilidad y seriedad.'
    },
    {
        id: 2,
        name: 'Emanuel Francisco Diaz',
        flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/200px-Flag_of_Panama.svg.png',
        image: './image/testimonio1.png',
        title: 'Testimonio',
        testimony: 'Nos encanta la rapidez del proceso de compra y venta de Usdt, amamos la eficiencia y lo fácil que es usar su APP en cada proceso.'
    },
    {
        id: 3,
        name: 'Francisco Javier Olave',
        flat: './image/colombia.png',
        image: './image/10.png',
        title: 'Testimonio',
        testimony: 'Una palabra para describir Bitcomer es SEGURIDAD, nunca hemos tenido ningún inconveniente al realizar operaciones en todos los años de utilizar sus servicios. '
    },
    {
        id: 3,
        name: 'Valentina Doria Mercado',
        flat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/250px-Flag_of_El_Salvador.svg.png',
        image: './image/7.png',
        title: 'Testimonio',
        testimony: 'Recomendamos al 100% a Bitcomer nos gusta la manera profesional con la que nos atienden y a la vez nos ayudan con la necesidad que tenga, siempre cumplen y su respuesta es al instante. '
    },
    // {
    //     id: 1,
    //     name: 'Andrés Rodriguez',
    //     flat: '',
    //     image: '',
    //     title: 'Lorem ipsum dolor sit amet',
    //     testimony: 'consectetur adipiscing elit. Donec fermentum velit magna, sit amet vehicula eros hendrerit pulvinar.'
    // }
]



export const businesTestimonial = [
    {
        id: 1,
        // name: 'Andrés Rodriguez',
        flat: './image/colombia.png',
        image: './image/5.png',
        title: 'OCEAN CAPITAL SA.',
        testimony: 'Como empresa tenemos que reconocer que nuestro único proveedor de Usdtc es Bitcomer, cada día muestra su seriedad y transparencia en cada transacción que realizamos. '
    },
    {
        id: 2,
        // name: 'Andrés Rodriguez',
        flat: './image/colombia.png',
        image: './image/9.png',
        title: 'HORUS SAS.',
        testimony: 'Fácil, ágil y sin complicaciones así es el proceso de compra y venta de criptomonedas con Bitcomer.'
    },
    {
        id: 2,
        // name: 'Andrés Rodriguez',
        flat: './image/colombia.png',
        image: './image/8.png',
        title: 'BLOCKSISTEM SA.',
        testimony: 'Personal competente y de calidad humana, tenemos relaciones comerciales satisfactorias con Bitcomer por mas de 4 años y solo nos queda decir gracias por ser y estar cada vez que los necesitamos.  '
    },
    {
        id: 2,
        // name: 'Andrés Rodriguez',
        flat: './image/colombia.png',
        image: './image/1.png',
        title: 'TAKCOMER SAS.',
        testimony: 'Durante mucho tiempo buscamos un proveedor de Usdt que nos brindara un mejor precio y servicio, sin altos costos de intermediación hasta que conocimos a Bitcomer con ellos pudimos comprobar que es el MEJOR en todo lo que hace. '
    },
]


export const currencys = [
    {
        id: 1,
        name: 'Ether',
        price: 6618000,
        hour: "24H",
        vHour: "+0.3%",
        day: "7D",
        vDay: "+19.2 %",
        hporcent: "positive",
        dporcent: "positive"
    },
    {
        id: 2,
        name: 'USD Coin',
        price: 4200,
        hour: "24H",
        vHour: "2 %",
        day: "7D",
        vDay: "+1,6 %"
    },
    {
        id: 3,
        name: 'Utecoin',
        price: 233099,
        hour: "24H",
        vHour: "2.7 %",
        day: "7D",
        vDay: "+1.3%"
    },
    {
        id: 4,
        name: 'Ether',
        price: 6618000,
        hour: "24H",
        vHour: "+0.3%",
        day: "7D",
        vDay: "+19.2 %",
        dporcent: "positive"
    },
    {
        id: 5,
        name: 'Bitcoin',
        price: 579880,
        hour: "24H",
        vHour: "+9,8 %",
        day: "7D",
        vDay: "+25,1 %",
        hporcent: "positive",
        dporcent: "positive"
    },
    {
        id: 6,
        name: 'Ehter/Bitcoin',
        price: '0,06936309',
        hour: "24H",
        vHour: "+1,2 %",
        day: "7D",
        vDay: "+8,2 %",
        hporcent: "positive",
        dporcent: "positive"
    },
]

//contacts

export const whatsApp = '(+57) 314 6607430'
export const email = 'soporte@bitcomer.com'
export const messageWhatsapp  = 'https://wa.me/?text=Inscr%C3%ADbete+a+Hi+Beauty+con+mi+c%C3%B3digo%3A+${314 6607430}+y+g%C3%A1nate+un+producto+completamente+gratis%2C+en+tu+primera+cajita.%0D%0A%0D%0Awww.hibeauty.com.co+'


export const address = [
    {
        flat: '',
        address: 'Cali Centro Comercial Unicentro. Oficina: 409a'
    },
    {
        flat: '',
        address: 'San Salvador World Trade Center. Local: 105'
    },
    {
        flat: '',
        address: 'Ciudad de panamá PH Sunset Strip. Oficina: 313 Corregimiento de san Francisco en la vía Israel'
    }
]