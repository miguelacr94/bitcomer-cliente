import React, { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../../provider/user/context'
import useExternalPurchase from '../../../utils/hoocks/useExternalPurchase'
import { Icons } from '../../../utils/icons'
import PurchasePublicForm from '../../Form/PurchasePublicForm2'
import PayMethod from '../../Negociations/PayMethod'

const Tab = () => {

    const [tab, setTab] = useState('purchase');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const { purchaseExternal } = useExternalPurchase();
    const { userPurchase } = useContext(Context);
    const { valueCurrency } = useContext(Context);
    const { valueCrypto, setValueCrypto } = useContext(Context);
    const { networks } = useContext(Context);

    const onSendPurchase = () => {

        const data = {
            purchaseType: tab,
            paymentMethod: paymentMethod
        }

        purchaseExternal(data);

    }


    return (
        <div className='w-full pt-12 '>
            <div className='grid grid-cols-2 max-w-[300px] m-auto h-12'>
                <div onClick={() => setTab('purchase')} className={`${tab == 'purchase' ? 'border-b-2 border-menu' : ''}
                 flex space-x-1 items-center cursor-pointer text-black`}>
                    <i>{Icons.purchase}</i>
                    <span>Comprar</span>
                </div>
                <div onClick={() => setTab('sale')} className={`${tab == 'sale' ? 'border-b-2 border-menu' : ''}
                 flex space-x-1 items-center cursor-pointer text-black`}>
                    <i>{Icons.sale}</i>
                    <span>Vender</span>
                </div>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 max-w-[1000px] m-auto bg-[#FAFAFA] mt-2'>
                <div className='p-4'>
                    <PurchasePublicForm
                        tab={tab}
                    />
                </div>
                <div>
                    
                    
                    <PayMethod
                        payMethod={(e) => setPaymentMethod(e)}
                        disabled={tab === 'sale'}
                        tab={tab}
                    />
                    {tab === 'purchase' &&
                        <button
                            disabled={
                                !userPurchase?.wallet ||
                                !userPurchase.currency?._id ||
                                !networks ||
                                !valueCurrency ||
                                !valueCrypto ||
                                !paymentMethod
                            }
                            onClick={() => onSendPurchase()}
                            className='bg-[#3075DE] disabled:bg-[#7093c7] text-white p-3 px-8 rounded-md mt-2'>
                            Comprar ahora
                        </button>
                    }

                    {tab === 'sale' &&
                        <button
                            disabled={
                                !userPurchase.currency?._id ||
                                !userPurchase?.userName ||
                                !userPurchase?.number ||
                                !userPurchase?.bank ||
                                !userPurchase?.nit ||
                                !valueCurrency ||
                                !valueCrypto ||
                                !paymentMethod
                            }
                            onClick={() => onSendPurchase()}
                            className='bg-[#3075DE] disabled:bg-[#7093c7] text-white p-3 px-8 rounded-md mt-2'>
                            Vender ahora
                        </button>
                    }

                </div>
            </div>
            <div className='w-full flex justify-center items-center'>
                <span className='mt-6 text-lg  text-center'>En 15 minutos, recibirás tus BTC </span>

            </div>
        </div >
    )
}

export default Tab
