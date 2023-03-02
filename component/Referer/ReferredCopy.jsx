import React, { useContext, useState } from 'react'
import { useToasts } from 'react-toast-notifications';
import { Context } from '../../provider/user/context';
import { dominio } from '../../utils/config';
import { toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';


const ReferredCopy = () => {

    const { user} = useContext(Context);
    const [copy, setCopy] = useState(false);
    const { addToast } = useToasts();

    const copiarAlPortapapeles = (id_elemento) => {
        setCopy(false);
        var aux = document.createElement("input");
        aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        addToast('Código copiado',
            { appearance: toastTypes.SUCCESS });
        setCopy(true);
    }



    return (
        <div className="bg-menu text-white  md:px-0 opacity-95  
                            w-full h-12 rounded-lg  items-center mt-[17px] flex flex-col  justify-center space-x-12 md:px-8">
            <button
                onClick={() => copiarAlPortapapeles('refererCode')}

                className="flex flex-col items-center justify-center px-8 py-2 space-x-1 text-sm font-light  duration-300 
            transform md:scale-105 rounded-md active:scale-95 "
            >
                <span className='flex items-center space-x-3'><p>Código referido:</p> <p>{!copy ? Icons.copy : Icons.check}</p></span>{" "}

                <span id='refererCode' className='invisible absolute'>{dominio + 'register?code=' + user?.code}</span>
            </button>

        </div>
    )
}

export default ReferredCopy
