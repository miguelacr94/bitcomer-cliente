import React from 'react'
import { useState } from 'react'
import { getReferred } from '../../../provider/api/user.queries'

const useUser = () => {

    const [loadReferred, setLoadReferred] = useState(false);

    const getMyReferred = async () => {
        console.log('dsds')
        setLoadReferred(true);
        const res = await getReferred();
        if (res) {
            console.log(res);
            setLoadReferred(false);
        } else {

        }

    }


    return { getMyReferred, loadReferred };
}

export default useUser