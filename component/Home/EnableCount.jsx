import React, { useContext } from 'react'
import { Context } from '../../provider/user/context'
import { Icons } from '../../utils/icons'
import MainLayout from '../Layouts/MainLayout'
import Button from '../Ui/Button'

const EnableCount = ({ state }) => {

    const { user, setUser } = useContext(Context);
    const { statusUser, setStatusUser } = useContext(Context);

    return (

        <div className=" bg-grey-fondoEnable w-full p-4 text-grey-light   lg:rounded-3xl flex items-center justify-center flex-col">
            <h2 className="font-bold mt-4">
                {state === 'pending' ? 'Revision en progreso!' :
                    state === 'revision' ? 'Cuenta en revision!' :
                        state === 'reviewNeeded' ? 'Cuenta en revision manual!' :
                            state === 'rejected' ? 'Cuenta rechazada!' :
                                state === 'verified' ? 'Cuenta verificada!' :
                                    state === 'waiting' ? 'Habilita tu cuenta!' :
                                        'Habilita tu cuenta!'
                }
            </h2>

            <div className="mt-2">

                {
                    state === 'pending' ? <p className="text-4xl text-yellow-400">{Icons.warningCircle}</p> :
                        state === 'reviewNeeded' ? <p className="text-4xl text-yellow-400">{Icons.warning}</p> :
                            state === 'review' ? <p className="text-4xl text-yellow-400" >{Icons.warning}</p> :
                                state === 'rejected' ? <p className="text-4xl text-red-400">{Icons.error}</p> :
                                    <p className="text-4xl text-yellow-400">{Icons.warningCircle}</p>
                }
            </div>

            <div className="text-center mt-4 text-center px-10 w-full ">
                {
                    state === 'pending' ?
                        <p className="text-sm">{`Tu cuenta no esta habilitada para comprar y vender criptomonedas,completa tu verificación básica para habilitarla.`} </p> :

                        state === 'reviewNeeded' ?
                            <p className="text-sm">{`Tu cuenta esta en revision, aun no esta lista para comprar y vender criptomonedas, espera la revision.`} </p> :

                            state === 'review' ?
                                <p className="text-sm">{`Tu cuenta esta en revision manual, aun no esta lista para comprar y vender criptomonedas, espera la revision manual.`} </p> :

                                state === 'rejected' ?
                                    <p className="text-sm">{`Tu cuenta fue rechazada, no podras comprar y vender criptomonedas.`} </p> :

                                    <p className="text-sm">{`Tu cuenta no esta habilitada para comprar y vender criptomonedas,completa tu verificación básica para habilitarla.`} </p>
                }
            </div>

            {/* <p className="text-sm">
                {`Tu cuenta ${state === 'pending' ? 'no' : ''} esta habilitada para comprar y vender criptomonedas,completa tu verificación básica para habilitarla.`} </p>
            {state === 'pending' ?
                <Button
                    text='Completar'
                    className="bg-button mt-4 px-10 py-1"
                />
                : ''
            } */}
        </div>

    )
}

export default EnableCount