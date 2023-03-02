import React, { useContext } from 'react'
import { Context } from '../../provider/user/context';
import { capitalizer, currencyFormat } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import moment from 'moment';
import InforAccount from './InforAccount';

const DetailsOrders = ({ detailOrder }) => {
  const { currency } = useContext(Context);



  const copy = () => {
    var content = document.getElementById('wallet');
    content.select();
    document.execCommand('copy');
  }


  return (
    <div className="w-full  mt-6 pb-6">


      <div className="lg:w-5/6 w-full flex space-x-4 mt-4 justify-center">


        <div className={`${detailOrder?.qr ? 'w-full' : 'lg:w-4/6 w-full'}  border shadow-xl rounded-xl  flex flex-col justify-center items-center p-4 space-y-2 `}>
          <div className={`w-full flex flex-col justify-center text-center items-center  pb-4
      ${detailOrder?.status === 'completado' ? 'text-green-400' :
              detailOrder?.status === 'pendiente' ? 'text-yellow-400' :
                detailOrder?.status === 'declinada' ? 'text-red-400' :
                  ''
            }
      
      `}>
            <p className={` text-4xl`}>
              {
                detailOrder?.status === 'pendiente' ? Icons.warningCircle :
                  detailOrder?.status === 'completado' ? Icons.checkCircle :
                    detailOrder?.status === 'declinada' ? Icons.error :
                      ''
              }

            </p>
            <h1 className="mt-2  font-semibold text-xl"> {detailOrder && capitalizer(detailOrder?.purchaseType)}  {
              detailOrder?.status === 'completado' ? 'completada' :
                detailOrder?.status === 'declinada' ? 'rechazada' :
                  detailOrder?.status === 'pendiente' ? 'pendiente' : ''
            }
              <span> por aprobar</span>
            </h1 >
          </div>
          <div className="w-full bg-grey-bTab h-linePurchase mt-2" />
          <div className={`w-full  flex  flex-col justify-center items-center  space-x-4 pt-4 `}>


            {/* {detailOrder && detailOrder?.qr && 
              <div className="w-3/6 h-64 flex flex-col justify-center items-center pb-4 border ">
                <img
                  src={detailOrder?.qr}
                  className="w-40 h-30"
                />
                <p className="text-sm mt-4 text-menu font-semibold text-center text-40">Debes acercarte con este código QR a cualquiera de nuestras oficinas</p>
              </div>
            } */}

            {detailOrder?.crypto?.cryptoId?.wallet && detailOrder?.purchaseType === 'venta' &&

              <div className='w-full text-start '>
                <h1 className='text-sm font-semibold text-order'>Wallet para enviar criptomonedas:</h1>
                <p className="text-grey-light font-light text-sm  flex items-center space-x-2">
                  <input className='w-80 outline-none bg-transparent' readonly='readonly' id='wallet' value={detailOrder?.crypto?.cryptoId?.wallet?.crypto} />
                  <span onClick={() => copy()} className='cursor-pointer hover:text-menu text-lg'>{Icons.copy}</span></p>

                <div className='flex flex-col justify-center items-center mt-4'>
                  <img
                    src={detailOrder?.crypto?.cryptoId?.wallet?.qr}
                    className="h-36 w-40"
                  />
                  <p className="text-xs font-semibold text-grey text-center w-48">Con este código QR podrás enviar criptomonedas</p>
                </div>
              </div>
            }

            {detailOrder?.country?.account && detailOrder?.purchaseType === 'compra' &&
              <div className='px-2 w-full'>
                <h1 className='text-center font-semibold text-grey-light'>Nuestras Cuentas</h1>
                <InforAccount
                  countrySelect={detailOrder?.country}
                />
              </div>
            }



            <div className={`w-full pr-4 space-y-3 border py-4 mt-4 px-4`}>

              <div>
                <h1 className='text-center text-grey-light'>Detalles de la transacción <span className='font-semibold text-order'>#{detailOrder.code} </span></h1>
              </div>

              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Fecha:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {moment(detailOrder?.createdAt).format('L')}
                </p>
              </div>
              <div className="flex w-full">
                <p className="w-3/6 text-sm font-semibold text-order">
                  Método de pago:
                </p>
                <p className="w-4/6 text-end text-grey-light font-light text-sm">
                  {detailOrder?.paymentMethod}
                </p>
              </div>
              {detailOrder?.purchaseType === 'compra' &&
                < div className="flex w-full">
                  <p className="w-1/6 text-sm font-semibold text-order">
                    Wallet:
                  </p>
                  <p className="w-5/6 text-end text-grey-light font-light text-sm">
                    {detailOrder?.wallet}
                  </p>
                </div>
              }
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Moneda:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm flex justify-end items-center space-x-1">
                  <span>
                    {
                      currency && currency[0]?.map((c, i) => {
                        if (c.symbol === detailOrder?.crypto?.cryptoId?.code) {
                          return (
                            <img
                              src={c.icon}
                              className="h-4 h-4"
                            />
                          )
                        }
                      })
                    }
                  </span>
                  <span>
                    {detailOrder?.crypto?.cryptoId?.code}
                  </span>



                </p>
              </div>
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Cantidad:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {detailOrder?.crypto?.quantity}
                </p>
              </div>
              <div className="flex w-full">
                <p className="w-1/6 text-sm font-semibold text-order">
                  Red:
                </p>
                <p className="w-5/6 text-end text-grey-light font-light text-sm">
                  {detailOrder?.network}
                </p>
              </div>


              {detailOrder?.purchaseType === 'venta' &&
                <>
                  {detailOrder?.account?.bank &&
                    <div className="flex w-full">
                      <p className="w-1/6 text-sm font-semibold text-order">
                        Cuenta:
                      </p>
                      <p className="w-5/6 text-end text-grey-light font-light text-sm">
                        {detailOrder?.account?.bank}
                      </p>
                    </div>
                  }
                  {detailOrder?.account?.typeAccount &&
                    <div className="flex w-full">
                      <p className="w-3/6 text-sm font-semibold text-order">
                        Tipo de cuenta:
                      </p>
                      <p className="w-4/6 text-end text-grey-light font-light text-sm">
                        {detailOrder?.account?.typeAccount}
                      </p>
                    </div>
                  }
                  {detailOrder?.account?.number &&
                    <div className="flex w-full">
                      <p className="w-1/6 text-sm font-semibold text-order">
                        Number:
                      </p>

                      <p className="w-5/6 text-end text-grey-light font-light text-sm">
                        {detailOrder?.account?.number}
                      </p>

                    </div>
                  }
                </>
              }

              <hr className="bg-grey-bTab w-full h-0.5" />

              {/* <div className="flex w-full">
                <p className="w-3/6 text-sm font-semibold text-order">
                  Pago por comision:</p>
                <p className="w-3/6 text-end text-grey-light font-light text-sm">{0}</p>
              </div> */}
              <div className="flex w-full">

                <p className="w-3/6 text-sm font-semibold text-order">
                  Descuento:</p>
                <p className={`w-3/6 text-end text-grey-light font-light text-sm ${detailOrder?.commission > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {detailOrder?.commission}
                </p>
              </div>
              <div className="flex w-full">

                <p className="w-3/6 text-sm font-semibold text-order">
                  Pago total:</p>
                <p className="w-3/6 text-end text-grey-light font-light text-sm">
                  {currencyFormat(detailOrder?.value)} {detailOrder?.currency}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

export default DetailsOrders