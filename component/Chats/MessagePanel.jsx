import React, { useContext, useEffect } from 'react'
import moment from 'moment';
import Modal from 'react-responsive-modal';
import { useState } from 'react';
import ViewMessage from './ViewMessage';
import { Context } from '../../provider/user/context';


const MessagePanel = ({ message, setView }) => {

    const { setOpenChat } = useContext(Context);
    const { user } = useContext(Context);

    useEffect(() => {
        var objDiv = document.getElementById("divu");
        objDiv.scrollTop = objDiv.scrollHeight;
    })


    const openMessage = (e) => {

        if (e.contentType === 2) {
            setView(e);
            setOpenChat(false);
        }

    }


    return (
        <>
            < div id='divu' className="w-full h-full   overflow-auto  justify-end  pb-6  ">
                {
                    message && message.map((m, i) => {
                        return (


                            <div key={i} className={`w-full flex flex-col min-h-12   overflow-hidden mt-3 ${m?.send === 1 ?
                                'justify-end items-end pl-4' : 'pr-4 justify-start items-start '}`}>
                                <div className={` w-full ${m.send == 1 ? 'flex flex-row-reverse ' : 'flex '}`} >
                                    <img
                                        src={m.send == 1 ? user?.photo : user?.photo}
                                        className="w-6 h-6 mx-2"
                                    />
                                    <p onClick={() => openMessage(m)} className={` text-sm shadow-lg 
                                 ${m?.send === 2 ? 'bg-white text-menu admin   ' :
                                            ' -ml-1 bg-menu border border-menu text-white client flex justify-center'} 
                                max-w-full  pt-2 mt-2 pb-2 px-6 overflow-hidden `}>
                                        {m?.contentType === 1 ? m?.content :
                                            m.contentType === 2 ?
                                                <img
                                                    src={m?.content}
                                                    className="w-32 h-30"
                                                />
                                                : ''
                                        }

                                    </p>
                                </div>
                                <a className="text-grey-light text-terminos font-light px-2">{moment(m?.createdAt).format('L')}</a>



                            </div>




                        )
                    })

                }



            </div>
        </>

    )
}

export default MessagePanel

