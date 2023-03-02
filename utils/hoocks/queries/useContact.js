import React, { useState } from 'react'
import { getCountryRegister } from '../../../provider/api/home.queries'

const useContact = () => {

    const [country, setCountry] = useState(null);

    const getDataCountry = async () => {
        const res = await getCountryRegister();
        if (res) {
            setCountry(res?.data);
        }
    }

    return { getDataCountry, country }

}

export default useContact
