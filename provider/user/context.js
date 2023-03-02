import { createContext, useEffect, useState } from "react";
import useIsMounted from "../../utils/hoocks/useIsMounted";
import useSocketIO from "../../utils/hoocks/useSocketIO";
import { getCurrency } from "../api/currency.queries";
import { getCountry } from "../api/home.queries";
// import io from 'socket.io-client';

export const Context = createContext(null);


const inicialDate = {
    fullName: 'Harold Ortiz',
    nacionality: 'Colombia',
    country: 'Colombia',
    city: 'Bogota',
    address: 'Dg 9',
    phone: 3130000000,
    image: './image/admin.png'
}


// const socket = io("https://socket.loca.lt");

export default function UserContext({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [country, setCountry] = useState(null);
    const [currency, setCurrency] = useState([]);
    const [countrySelect, setCountrySelect] = useState(null);
    const [statusUser, setStatusUser] = useState(null);
    // const [chatSocket, setSocketChat] = useState(null);
    const isMounted = useIsMounted();
    const { isConnected, connectUser, stateUser } = useSocketIO();
    const [userPurchase, setUserPurchase] = useState();
    const [formOtc, setFormOtc] = useState(null);
    const [loadCalculator, setLoadCalculator] = useState(false);
    const [quantityCalcule, setQuantityCalcule] = useState(null);
    const [networks, setNetworks] = useState(null);
    const [openChat, setOpenChat] = useState(false);
    const [quantityCalculeOtc, setQuantityCalculeOtc] = useState(null);
    const [copy, setCopy] = useState(null);
    const [formGiro, setFormGiro] = useState(null);
    const [quantityCalculeGiro, setQuantityCalculeGiro] = useState(null);
    const [convert, setConvert] = useState('toCurrency');

    //convert
    const [commission, setCommission] = useState(null);
    const [valueCurrency, setValueCurrency] = useState(null);
    const [valueCrypto, setValueCrypto] = useState(null);





    useEffect(() => {
        if (!isMounted) return null;
    }, [isMounted]);


    useEffect(() => {
        setLoading(false);
        getCountries();

    }, []);

    useEffect(() => {
        connectUser(user?._id);

    }, [setUser, user])

    useEffect(() => {
        if (stateUser) {
            setStatusUser(stateUser);
        }
    }, [statusUser, setStatusUser, stateUser])

    useEffect(() => {

        if (country) {

            if (localStorage.getItem('country')) {
                const local = JSON.parse(localStorage.getItem('country') || [])
                setCountrySelect(country.find((c) => c.name === local.name));
            } else {
                setCountrySelect(country.find((c) => c.name === 'Colombia'))

            }

        }
    }, [setCountry, country]);



    useEffect(() => {
        if (localStorage.getItem('purchase')) {
            const purchase = JSON.parse(localStorage.getItem('purchase') || []);
            if (purchase) {
                setUserPurchase(purchase || '');

            }
        }
    }, [setUserPurchase]);

    useEffect(() => {
        if (localStorage.getItem('purchase')) {
            const purchase = JSON.parse(localStorage.getItem('purchase') || []);
            if (purchase) {

                setNetworks(purchase?.network || '');

            }
        }
    }, [setNetworks]);




    useEffect(() => {
        if (countrySelect) {
            getCurrencyData(countrySelect);
        }
    }, [countrySelect, setCountrySelect])


    const getCurrencyData = async (e) => {

        if (e) {
            const data = await getCurrency(e?.currency);
            setCurrency([data?.data]);
        }
    }



    const getCountries = async () => {
        const data = await getCountry();
        setCountry(data?.data);
    }






    return (

        <Context.Provider value={
            {
                user, setUser,
                country, setCountry,
                currency, setCurrency,
                countrySelect, setCountrySelect,
                statusUser, setStatusUser,
                userPurchase, setUserPurchase,
                quantityCalcule, setQuantityCalcule,
                loadCalculator, setLoadCalculator,
                networks, setNetworks,
                openChat, setOpenChat,
                formOtc, setFormOtc,
                quantityCalculeOtc, setQuantityCalculeOtc,
                copy, setCopy,
                formGiro, setFormGiro,
                quantityCalculeGiro, setQuantityCalculeGiro,


                commission, setCommission,
                valueCurrency, setValueCurrency,
                valueCrypto, setValueCrypto,
                convert, setConvert

            }
        }>
            {
                loading
                    ? <span>...</span>
                    : children
            }

        </Context.Provider>
    )



}


