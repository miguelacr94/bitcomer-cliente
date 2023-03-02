import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getReferredTotal } from '../../provider/api/user.queries'

export const CardReferredTotal = () => {
    const [total, setTotal] = useState();

    const getTotal = async () => {
        const res = await getReferredTotal();
        if (res) {

            setTotal(res?.data);
        } else {
            setTotal(0);
        }
    }

    useEffect(() => {
        getTotal();
    }, [setTotal]);

    return (
        <div className=' flex  items-center justify-center h-full space-x-1'>
            <span className='text-white font-semibold'>Total: ${total > 0 ? total : 0} USD</span>
        </div>
    )
}
