import React, { useEffect } from 'react'
import { myRound } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import DetailGiro from './DetailGiro';

const OrderGiro = ({ setRes, onBack }) => {

  const copy = () => {
    var content = document.getElementById('wallet');
    content.select();
    document.execCommand('copy');
  }




  useEffect(() => {
    window.location.href = '#giroId'
  })



  return (
    <div id='giroId' className="text-center flex flex-col justify-center  items-center lg:w-detailGiro w-full m-auto  w-window py-6  lg:px-3">

      <a onClick={onBack} className='text-grey lg:ml-0 ml-6 w-full lg:w-containerCard text-start cursor-pointer underline mt- flex items-center'>{Icons.back} Atrás</a>

      <div className=" w-full overflow-hidden  py-6 rounded-lg space-y-4 border p-1 lg:p-4 items-center justify-center flex flex-col">

        <p className={

          ` 
        ${setRes?.status === 'completado' ? 'text-menu' :
            setRes?.status === 'pendiente' ? 'text-yellow-400' :
              setRes?.status === 'declinada' ? 'text-red-400' :
                setRes?.status === 'pagado' ? 'text-green-600' :
                  setRes?.status === 'aprobada' ? 'text-green-400' :
                    ''
          }
       text-4xl`

        }> {
            setRes?.status === 'pendiente' ? Icons.warningCircle :
              setRes?.status === 'completado' ? Icons.checkCircle :
                setRes?.status === 'declinada' ? Icons.error :
                  setRes?.status === 'pagado' ? Icons.checkCircle :
                    setRes?.status === 'aprobada' ? Icons.checkCircle :
                      ''
          }
        </p>
        <h1 className={`mt-2   font-semibold text-xl
          ${setRes?.status === 'completado' ? 'text-menu' :
            setRes?.status === 'pendiente' ? 'text-yellow-400' :
              setRes?.status === 'declinada' ? 'text-red-400' :
                setRes?.status === 'pagado' ? 'text-green-600' :
                  setRes?.status === 'aprobada' ? 'text-green-400' :
                    ''
          }
        
          
        `}>Giro {setRes?.status === 'aprobada' ? 'aprobado' :
            setRes?.status === 'completado' ? 'completada' :
              setRes?.status === 'declinada' ? 'rechazada' :
                setRes?.status === 'pendiente' ? 'pendiente' :
                  setRes?.status === 'pagado' ? 'pagado' :
                    ''


          } </h1>
        <hr className="mt-4 bg-grey w-full m-auto" />
        <div>
          <p className="text-grey text-sm text-start">Debes enviar <span className="font-semibold">
            {setRes?.quantity} {setRes?.purchase?.crypto?.cryptoId?.code || myRound(setRes?.crypto?.quantity, 5)} </span> a la siguiente Wallet y enviar el comprobante de la transferencia por <span className="font-semibold">CHAT.</span></p>
        </div>
        <div className="w-full text-start overflow-auto">
          <p className="text-grey font-semibold text-sm text-ellipsis ">Wallet para enviar criptomonedas:</p>
          <p className="text-grey-light font-light text-sm  flex items-center space-x-2">
            <input className='w-5/6 outline-none bg-transparent' readonly='readonly' id='wallet' value={setRes?.purchase?.crypto?.cryptoId?.wallet?.crypto || setRes?.crypto?.cryptoId?.wallet?.crypto} />
            <span onClick={() => copy()} className='cursor-pointer hover:text-menu text-lg'>{Icons.copy}</span></p>

        </div>

        <div className=" w-full flex flex-col justify-center items-center">
          <img
            src={setRes?.purchase?.crypto?.cryptoId?.wallet?.qr || setRes?.crypto?.cryptoId?.wallet?.qr}
            className="w-40"
          />
          <p className="text-xs font-semibold text-grey text-center w-48">Con este código QR podrás enviar criptomonedas</p>
        </div>
        <div className="border-dotted px-4 text-md border border-menu text-menu rounded-lg w-full h-14 flex items-center justify-center mt-4">
          <p className="font-light">En 15 minutos, podrán reclamar el giro </p>
        </div>

        <div className="mt-4 w-full flex justify-center pt-4">
          <DetailGiro
            res={setRes}
          />
        </div>

      </div>

    </div>
  )
}

export default OrderGiro