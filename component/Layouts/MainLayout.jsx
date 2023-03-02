/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { Context } from "../../provider/user/context";
import NavBar from "../NavBar";
import Menu from "../Menu/Menu";
import { Routes } from "../../utils/routes";
import Bar from "../Bar";
import Cookies from "../../utils/cookies";
import { getData, logout } from "../../provider/user/actions";
import { Icons } from "../../utils/icons";
import Chat from "../Chats/Chat";
import ButtonWhatsApp from "../Ui/ButtonWhatsApp";


export default function MainLayout({ children }) {
  const { user, setUser } = useContext(Context);
  const { statusUser, setStatusUser } = useContext(Context);
  const router = useRouter();
  const [response, setResponse] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { valueCurrency, setValueCurrency } = useContext(Context);
  const { valueCrypto, setValueCrypto } = useContext(Context);

  const loadUser = async () => {
    const token = Cookies.read("ssid");
    if (!token) {
      return Router.push(Routes.login);
    }
    if (token || !user) {
      const a = await getData();
      if (!a) {
        return Router.push(Routes.login);
      } else {
        setUser(a);
        setStatusUser(a?.userVerification?.account?.status);

      }

    }
  };



  useEffect(() => {
    loadUser();
  }, []);


  const { setQuantityCalcule } = useContext(Context);
  const { setUserPurchase } = useContext(Context);

  const onLogout = () => {
    logout()
    router.push(Routes.index);
    setUserPurchase('');
    setUser('');
    setStatusUser('');
    setQuantityCalcule('');
    setValueCurrency('');
    setValueCrypto('');

  }


  return (
    <>
      {user ?

        <>
          <Bar />
          <div className="lg:ml-bar w-full lg:min-w-ventana overflow-x-hidden relative ">
            < NavBar
              showMenu={() => setShowMenu(!showMenu)}
              showButton={showMenu}
            />
            <div className={`${!showMenu ? '-mr-menu' : 'mr-0'} bg-menu block lg:hidden  w-full  h-screen lg:h-80 fixed z-30 right-0  transition-left duration-500 ease-in-out shadow-xl`}>
              {/*  */}
              <div className="w-full flex flex-col justify-center items-center mt-16 ">

                <Menu />
              </div>
              <div className="h-12 mt-12 flex justify-center items-end  fixed w-full bottom-0">
                {/* <p className="text-white">Bitcomer 2022 </p>
                <p className="text-white ml-1 mb-0.5">{Icons.Copy}</p> */}
                <button onClick={() => onLogout()} className="flex w-full h-12 justify-center font-semibold items-center space-x-4 bg-darkBlue text-white text-md lg:text-sm  ">
                  <img src="./image/logout.svg " alt="description of image" />
                  <p >Cerrar sesión</p>
                </button>
              </div>
            </div>

            <div className="lg:mt-0 w-full bg-grey-testimonial relative">
              {statusUser && statusUser === 'verified' ?
                <div className="w-full bg-green-200 text-grey-light h-10 opacity-75 flex justify-center items-center space-x-2">
                  <h1 className="text-sm lg:text-md font-semibold">Tu cuenta ya ha sido verificada </h1>
                  <p className="text-green-500 text-3xl " >{Icons.checkCircle}</p>
                </div>
                : ''
              }
              {children}
              <Chat />

              <div className="w-full fixed bottom-0 lg:h-8 h-12  bg-grey-fondoEnable flex justify-center items-center">
                <p className="text-sm px-4 text-grey font-semibold">Todas sus transacciones son cifradas y 100% seguras</p>
              </div>
            </div>

          </div >
          <ButtonWhatsApp />
        </>

        : <>...</>
      }
    </>


  );
}
