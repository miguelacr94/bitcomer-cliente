import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../provider/user/context';
import { Icons } from '../../utils/icons';
import { getMessageMe } from '../../provider/api/user.queries';
import useSocketIO from '../../utils/hoocks/useSocketIO';
import PanelChat from './PanelChat';
import Modal from 'react-responsive-modal';
import ViewMessage from './ViewMessage';
import { capitalizer } from '../../utils/helpers';


const Chat = () => {
    const { openChat, setOpenChat } = useContext(Context);
    const [message, setMessage] = useState(null);
    const [chatInfo, setChatInfo] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [view, setView] = useState(-1);


    // const { chatSocket, setSocketChat } = useContext(Context);
    const { chat } = useSocketIO();



    const getMessage = async () => {
        const res = await getMessageMe();
        if (res) {

            setMessage(res?.data?.messages?.docs.reverse());
            setChatInfo(res?.data?.chatInfo);
        }
    }

    useEffect(() => {
        getMessage();
    }, [setMessage, chat]);


    useEffect(() => {
        if (chat) {
            message?.push(chat);
            setView(view + 1);
        }

    }, [chat]);



    const newMessage = (data) => {
        if (data) {
            const obj = [...message];
            obj.push(data);
            // setUserList(obj);
            setMessage(obj);

        }
    };


    return (

        // <a href="#" class="btn-flotante">Llamada a la acción</a>





        <div className={` btn-flotante overflow-auto border shadow-xl
            
            ${openChat ? 'rounded-xl overflow-hidden h-chatH lg:min-w-chat sm:w-chat   w-full  bg-white' : ' rounded-full w-16 h-16 '}
            
            `} >


            {/* {
                <p className='h-8 w-8 rounded-full bg-white text-black -mt-4'>1</p>
            } */}

            {openChat ?
                <div className="w-full h-14 bg-menu text-white flex shadow-2xl">
                    <div className="w-1/6"></div>
                    <div className="w-4/6 text-center font-semibold flex items-center justify-center space-x-2">
                        <h1>{chatInfo && capitalizer(chatInfo?.admin?.fullName)}</h1>
                        <div className="w-11 h-11 rounded-full">
                            <img
                                src={chatInfo?.admin?.photo}
                            />
                        </div>
                    </div>
                    <div className="w-1/6 flex justify-end items-center px-4">
                        <div onClick={() => setOpenChat()} className="text-white text-3xl cursor-pointer">
                            {Icons.minimized}
                        </div>
                    </div>
                </div>
                :

                <p onClick={() => setOpenChat(true)} className="text-white text-2xl w-full h-full flex justify-center items-center bg-menu ">
                    {Icons.Chat}
                </p>
            }

            {openChat &&
                <>

                    <PanelChat
                        chat={message}
                        resp={(e) => newMessage(e)}
                        setView={(e) => setShowModal(e)}
                    />

                </>
            }

            <Modal
                open={showModal}
                onClose={() => setShowModal('')}
                center
            >
                <ViewMessage
                    view={showModal}
                    onClose={() => setShowModal('')}
                />
            </Modal>




        </div>
    )
}

export default Chat