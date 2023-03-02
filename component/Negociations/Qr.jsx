import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../provider/user/context';
import Purchase from './Purchase';
import Sale from './Sale';


const Qr = ({ res, onClose }) => {

  //global states
  const { countrySelect } = useContext(Context);
  const { currency } = useContext(Context);

  //local states
  const [office, setOffice] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    setAccount(countrySelect?.accounts);
    setOffice(countrySelect?.offices);
  }, [countrySelect, setAccount]);




  return (
    <>

      {res && res.purchaseType === 'compra' ?
        <Purchase
          res={res}
          currency={currency}
          countrySelect={countrySelect}
        />
        :

        <Sale
          res={res}
          currency={currency}
          countrySelect={countrySelect}
          oficine={office}
        />
      }
      < div className="w-full pr-4 flex justify-end">
        <button
          onClick={() => onClose()}
          className="bg-menu h-12 text-white px-4 rounded-lg">Volver al inicio</button>
      </div>
    </>

  )
}

export default Qr