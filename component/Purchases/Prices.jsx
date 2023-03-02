import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { getAllPriceCurrency } from '../../provider/api/currency.queries';
import { Context } from '../../provider/user/context';
import Card from '../Currencys/Card'

const Prices = () => {
    const [prices, setPrices] = useState();
    const { countrySelect, setCountrySelect } = useContext(Context)

    const getPrices = async (currency, idCountry) => {

        const res = await getAllPriceCurrency(currency, idCountry);
        if (res) {
            setPrices(res?.data);
        }
        else {
          
        }
    }
    useEffect(() => {
        getPrices(countrySelect?.currency, countrySelect?._id);
    }, [setPrices, setCountrySelect, countrySelect]);


    return (
        <div className='w-full mt-8 '>
            <div className='bg-menu w-full h-12 rounded-lg text-white flex justify-start items-center text-start px-12'>
                <span>Precios de Bitcomer hoy</span>
            </div>
            <div className='mt-8 flex md:flex-row md:space-x-4 space-x-0 md:space-y-0 space-y-4 flex-col justify-center items-center'>
                {prices && prices?.map((p, i) => {
                    return (
                        <Card
                            key={i}
                            price={p}
                        />
                    )
                })

                }
            </div>




        </div>
    )
}

export default Prices
