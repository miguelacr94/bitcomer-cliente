import { useRouter } from 'next/router'
import React, { useState, useContext } from 'react'
import { useEffect } from 'react'
import FormOtc from '../component/Form/FormOtc'
import MainLayout from '../component/Layouts/MainLayout'
import OrderFinish from '../component/Negociations/OrderFinish'
import OrderFinishOtc from '../component/Negociations/OrderFinishOtc'
import TabPurchase from '../component/Negociations/TabPurchase'
import OtcDetails from '../component/Otc/OtcDetails'
import { Context } from '../provider/user/context'
import { Icons } from '../utils/icons'


const Negociations = () => {
  const { userPurchase } = useContext(Context);
  const [amount, setAmount] = useState(0);
  const [payload, setPayload] = useState();
  const [wallet, setWallet] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);
  const [resOtc, setResOtc] = useState(null);
  const { statusUser } = useContext(Context);
 
  const [tab, setTab] = useState('null');
  const router = useRouter();

  const onSetTab = (e) => {
    setTab(e);

  }

  useEffect(() => {
    if (userPurchase?.purchaseType) {
      setTab(userPurchase?.purchaseType);
    }
    else {
      setTab('purchase')
    }
  }, [])



  return (


    <MainLayout >
      {statusUser && statusUser !== 'verified' &&
        <div className='w-full px-4 font-semibold bg-grey-fondoEnable py-2 text-grey'>
          {
            statusUser && statusUser === 'pending' ?
              <p className="text-sm">{`Tu cuenta no esta habilitada para comprar y vender criptomonedas, completa tu verificación básica para habilitarla.`} </p> :

              statusUser && statusUser === 'reviewNeeded' ?
                <p className="text-sm">{`Tu cuenta esta en revision, aun no esta lista para comprar y vender criptomonedas, espera la revision.`} </p> :

                statusUser && statusUser === 'review' ?
                  <p className="text-sm">{`Tu cuenta esta en revision manual, aun no esta lista para comprar y vender criptomonedas, espera la revision manual.`} </p> :

                  statusUser && statusUser === 'rejected' ?
                    <p className="text-sm">{`Tu cuenta fue rechazada, no podrás comprar y vender criptomonedas.`} </p> :

                    <p className="text-sm">{`Tu cuenta no esta habilitada para comprar y vender criptomonedas, completa tu verificación básica para habilitarla.`} </p>
          }
        </div>
      }
      <div className="overflow-auto lg:mt-6 py-2 lg:pl-12  ">
        <h2 className=" font-bold ml-2 text-md text-menu">Compra y venta</h2>
        <div className='w-full flex justify-center'>
          <div className="flex w-full rounded-full border overflow-hidden shadow-sm mt-6 lg:w-tabPurchase">
            <div
              onClick={() => onSetTab('purchase')}
              className={`${tab === 'purchase' ? 'bg-menu text-white' : 'bg-white text-menu'} w-3/6 h-14 cursor-pointer  border-r border-b border-t border-grey-bTap flex justify-center items-center font-semibold text-sm`}>
              <p className={` text-xl mr-1`}>{Icons.cart}</p>  COMPRAR</div>
            <div
              onClick={() => onSetTab('sale')}
              className={`${tab === 'sale' ? 'bg-menu text-white' : 'bg-white text-menu'} cursor-pointer  w-3/6 h-14 border-b border-l border-t border-grey-btab flex justify-center items-center font-semibold text-sm`} >
              <p className={` text-xl mr-1`}>{Icons.cart}</p>VENDER
            </div>
            <div
              onClick={() => onSetTab('saleOtc')}
              className={`${tab === 'saleOtc' ? 'bg-menu text-white' : 'bg-white text-menu'} cursor-pointer  w-3/6 h-14 border-b border-l border-t border-grey-btab flex justify-center items-center font-semibold text-sm`} >
              <p className={` text-xl mr-1`}>{Icons.cart}</p>VENDER OTC
            </div>

          </div>
        </div>

        <div className="lg:w-purchase  w-full  flex lg:flex-row flex-col justify-center items-start mt-10 text-blackText pb-8  ">

          {tab === 'purchase' || tab === 'sale' ?
            <>
              <div className={`w-full ${tab === 'saleOtc' ? 'w-full' : 'lg:w-3/6 '} px-2 `}>

                <TabPurchase
                  amount={(e) => setAmount(e)}
                  payload={(e) => setPayload(e)}
                  purchaseType={(e) => setPuchaseType(e)}
                  wallet={(e) => setWallet(e)}
                  criptoMoney={(e) => setCurrency(e)}
                  error={error}
                  tab={tab}

                />
              </div>

              <div className="w-full lg:w-3/6 px-2">

                <OrderFinish
                  amount={amount}
                  payload={payload}
                  purchaseType={tab}
                  wallet={wallet}
                  criptoMoney={currency}
                  error={(e) => setError(e)}
                  respPurchaseType={() => setPuchaseType('purchase')}
                />

              </div>
            </>
            :

            <>
              {!resOtc ?
                <div className='flex w-full lg:flex-row flex-col '>
                  <div className='w-full lg:w-7/12 px-2'>
                    <FormOtc

                      resp={(e) => setResOtc(e)}

                    />

                  </div>
                  <div className='w-full lg:w-5/12'>
                    <OrderFinishOtc />
                  </div>
                </div>

                :

                <div className='w-full flex justify-center items-center '>
                  <OtcDetails
                    detailOtc={resOtc}
                    onBack={() => setResOtc('')}
                  />
                </div>

              }

              {/* {
                tab === 'giro' &&

                <FormGiro />



              } */}
            </>

          }

          {/* {tab === 'giro' &&

            <FormGiro />

          } */}

        </div>

      </div>
    </MainLayout >
  )
}

export default Negociations