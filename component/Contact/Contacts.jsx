import React from 'react'
import { email, messageWhatsapp, whatsApp } from '../../utils/data'
import { Icons } from '../../utils/icons'

const Contacts = () => {
    return (

        <div className='space-y-3'>
            <a href='https://api.whatsapp.com/send/?phone=573146607430&text=Hola%2C+quiero+saber+m%C3%A1s+sobre+Bitcomer&type=phone_number&app_absent=0' target='_blank' className='flex space-x-2 items-center'>
                <i>{Icons.whatsapp}</i>
                <p>{whatsApp}</p>
            </a>
            <span className='flex space-x-2 items-center'>
                <i>{Icons.email}</i>
                <p>{email}</p>
            </span>
        </div>
    )
}

export default Contacts
