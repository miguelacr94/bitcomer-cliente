import React, { useContext, useState } from 'react'
import { Context } from '../../provider/user/context';
import ConverFormPublic from './ConverFormPublic';
import ConverFormToCurrency from './ConverFormToCurrency';

const Converter = ({ tab }) => {

    const {convert, setConvert} = useContext(Context);

    return (
        <div className='mt-6'>
            <span className='text-gray-600 text-xs font-semibold'>Presionando click sobre el botón azul de fechas podrá invertir la conversion de monedas  </span>
            <div>
                {convert === 'toCurrency' ?

                    < ConverFormToCurrency
                        tab={tab}
                        onSelectConvert={() => setConvert('toCrypto')}
                    />
                    :
                    <ConverFormPublic
                        tab={tab}
                        onSelectConvert={() => setConvert('toCurrency')}
                    />

                }

            </div>

        </div>

    )
}

export default Converter