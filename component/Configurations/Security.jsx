import React from 'react'
import Button from '../Ui/Button'

const Security = () => {
    return (
        <div className="w-3/6 border border-grey-bTab  bg-grey-fondoTab p-4 ml-2">
            <h2 className="text-sm font-semibold">Seguridad y privacidad</h2>
            <hr className="w-full bg-grey-line mt-4" />

            <div className="flex flex-col w-48">
                <Button
                    text='Cambiar contraseña'
                    className="bg-menu px-8 mt-6"
                />
                <Button
                    text='Desactivar cuenta'
                    className="bg-redButton px-8 mt-2"
                />
            </div>


        </div>
    )
}

export default Security