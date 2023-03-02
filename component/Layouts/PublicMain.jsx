/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import UserContext, { Context } from "../../provider/user/context";
import Footer from "../Footer";
import PublicNav from "../Home/PublicNav";
import MenuMobile from "../Menu/MenuMobile";
import ButtonWhatsApp from "../Ui/ButtonWhatsApp";

export default function PublicMain({ children }) {
    const { user, setUser } = useContext(Context);
    const { statusUser, setStatusUser } = useContext(Context);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!user) {
            setStatusUser('');
        }
    }, [user]);



    return (
        <>{!user ?
            <>
                <MenuMobile
                    showMenu={showMenu}
                    setShowMenu={(e) => setShowMenu(e)}
                />
                <div className="w-full">
                    <PublicNav
                        showMenu={() => setShowMenu(!showMenu)}
                        showButton={showMenu}

                    />
                    {children}
                    <ButtonWhatsApp />
                    <Footer />
                </div>

            </>
            : ''
        }
        </>
    );
}
