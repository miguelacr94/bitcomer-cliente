import React from 'react'
import Information from '../component/Contact/Information'
import Offices from '../component/Contact/Offices'
import ContactForm from '../component/Form/ContactForm'
import PublicMain from '../component/Layouts/PublicMain'

const contact = () => {
    return (
        <PublicMain>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full mt-20 md:w-11/12'>
                <Information />
                <ContactForm />
            </div>
            <Offices />
        </PublicMain>

    )
}

export default contact