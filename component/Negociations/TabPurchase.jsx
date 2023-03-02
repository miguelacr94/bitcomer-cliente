import React, { useState, useEffect, useContext } from 'react'
import { getCrypto } from '../../provider/api/currency.queries';
import { Context } from '../../provider/user/context';
import { currencyFormat, myRound } from '../../utils/helpers';
import PurchaseForm from '../Form/PurchaseForm';

const TabPurchase = ({ amount, payload, wallet, tab, criptoMoney }) => {

    //state
    const [Crypto, setCrypto] = useState([]);
    const [resOtc, setResOtc] = useState(null);


    //context
    const { userPurchase, setUserPurchase } = useContext(Context);
    const { quantityCalcule, } = useContext(Context);
    const { countrySelect } = useContext(Context);
    const { valueCrypto } = useContext(Context);



    const getCurrency = async () => { // trae listado general de monedas
        const res = await getCrypto();
        if (res) {
            setCrypto(res?.data);
        }

    }


    useEffect(() => {
        if (!userPurchase?.currency) {
            getCryptoList();
        }
    }, [userPurchase, setUserPurchase]);


    useEffect(() => {
        getCurrency();
    }, [setCrypto])


    const getCryptoList = () => { // trae lista de criptomonedas y asigna a el select de currency el valor inicial de bitcoin
        const cryto = Crypto.find((c) => c.code === 'BTC');
        setUserPurchase({ ...userPurchase, currency: cryto })
    }



    return (
        <div className=" w-full lg:mr-6  rounded-sm lg:pb-12  ">

            <div className="py-4 shadow-lg  rounded-3xl overflow-hidden border flex justify-center flex-col items-center">
                {/* {tab === 1 ? */}

                {tab !== 'saleOtc' ?
                    <PurchaseForm
                        typeTrasaction={tab}
                        amount={(e) => amount(e)}
                        data={(e) => payload(e)}
                        wallet={(e) => wallet(e)}
                        tab={tab}
                        cryptoMoney={(e) => criptoMoney(e)}
                        respTab={() => setTab('sale')}

                    />
                    :
                    ''
                }



                {tab !== 'saleOtc' &&
                    <>
                        <hr className="w-11/12 bg-grey-btab h-line mt-6 m-auto " />
                        <div className="flex flex-col justify-center items-center  mt-4 ">
                            <p className="text-grey-pruchase font-semibold text-sm">Estas {tab === 'purchase' ? 'Comprando' : 'Vendiendo'}</p>
                            <span className="font-bold font-bold text-black text-md mt-2">{quantityCalcule ? myRound(valueCrypto) : 0} {userPurchase && userPurchase?.currency?.name}</span>
                        </div>
                    </>
                }
            </div>
            {tab === 'purchase' ?
                < div className="w-full flex items-center justify-center mt-6">
                    <div className="border-dotted border border-menu text-menu rounded-full w-5/6 h-10 flex items-center justify-center">
                        <p className="font-bold">En 15 minutos, <span className="font-normal">Recibirás tus {userPurchase && userPurchase?.currency?.code}</span> </p>
                    </div>
                </div>
                : tab === 'purchase' ?
                    < div className="w-full flex items-center justify-center mt-6">
                        <div className="border-dotted border border-menu text-menu rounded-full w-11/12 px-4 text-center flex items-center justify-center">
                            <p className="font-bold">En 15 minutos, <span className="font-normal">Recibirás tus {currencyFormat(userPurchase?.value)} {countrySelect?.currency}</span> </p>
                        </div>
                    </div>
                    : ''
            }


        </div >
    )
}

export default TabPurchase