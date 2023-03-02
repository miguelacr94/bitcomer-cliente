import React, { useContext, useEffect, useState } from 'react'
import Validations from '../component/Form/Validations'

import MainLayout from '../component/Layouts/MainLayout'
import EnableCount from '../component/UserPanel/EnabledCount'
import { Context } from '../provider/user/context'

const Verifications = () => {

  const { user } = useContext(Context);
  const [stateUser, setStateUser] = useState(null)


  useEffect(() => {

    setStateUser(user?.userVerification?.account?.status);

  })

  return (
    <MainLayout >
      <div className="overflow-auto mt-12 containerEnabled">
        <EnableCount
          state={stateUser}
        />

        {stateUser === 'pending' ?
          <div className="pl-14 containerEnabled">
            <div className="w-11/12 float-left  px-4 my-4 text-sm text-blackText">
              <p className="w-5/6 text-xs">Obten el nivel de verificacion y podrás comprar tus primeras criptomonedas. Podras abonar y retirar hasta el equivalente de 1.000 USD en tu moneda local.</p>

              <p className="mt-2 w-5/6 text-xs">Una vez aprobada tu verificacion básica, prodrás optar a la verificación avanzada y así operar sin limites</p>
            </div>

            <Validations />

          </div>
          : ''
        }
      </div>
    </MainLayout >
  )
}

export default Verifications