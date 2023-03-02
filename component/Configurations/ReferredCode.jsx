import React from 'react'
import { useContext } from 'react';
import { Context } from '../../provider/user/context';
import { dominio } from '../../utils/config';
import { Icons } from '../../utils/icons';
import { CardReferredTotal } from '../Referer/CardReferredTotal';

const ReferredCode = () => {

    const { user } = useContext(Context);

    const copiarAlPortapapeles = (id_elemento) => {
        var aux = document.createElement("input");

        aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
        document.body.appendChild(aux);
        console.log(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        addToast('Código copiado',
            { appearance: toastTypes.SUCCESS });
    }


    return (

        <div className="bg-menu text-white  md:px-0 opacity-95  
    w-full h-12 rounded-lg  items-center mt-[17px] flex flex-col  justify-center space-x-12 md:px-8">
            <button
                onClick={() => copiarAlPortapapeles('refererCode')}

                className="flex flex-col items-center justify-center px-8 py-2 space-x-1 text-sm font-light  duration-300 
transform md:scale-105 rounded-md active:scale-95 "
            >
                <div className='flex space-x-4'>
                    <span className='flex items-center space-x-1'>Código referido  {Icons.copy}</span>
                    <CardReferredTotal />
                </div>


                <span id='refererCode' className='invisible absolute'>{dominio + 'register?code=' + user?.code}</span>
            </button>

        </div>
    )
}

export default ReferredCode
