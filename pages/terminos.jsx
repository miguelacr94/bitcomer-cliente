import React, { useContext } from 'react'
import PublicMain from '../component/Layouts/PublicMain'
import Colombia from '../component/Terminos/Colombia'
import Panama from '../component/Terminos/Panama'
import Salvador from '../component/Terminos/Salvador'
import { Context } from '../provider/user/context'

const Terminos = () => {
    const { countrySelect, setCountrySelect } = useContext(Context);
    return (
        <PublicMain>
            <div className='w-full mt-12'>
                {countrySelect?.name === 'Colombia' &&
                    <Colombia />
                }
                {countrySelect?.name === 'El Salvador' &&
                    <Salvador />
                }
                {countrySelect?.name === 'Panama' &&
                    < Panama />
                }

            </div>


        </PublicMain>
    )
}

export default Terminos