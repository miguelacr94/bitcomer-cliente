import React from 'react'
import { useState } from 'react';
import { viewFormData } from '../../utils/helpers'
import { sendMessage } from '../../provider/user/actions';
import { Icons } from '../../utils/icons'

const SendPanel = ({ resp }) => {

    const [fileSelected, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const sendMessageUser = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        if (fileSelected?.name) {
            payload.append("send", 1);
            payload.append("image", fileSelected)

        } else {
            payload.append("content", message);
            payload.append("contentType", 1);
            payload.append("send", 1);
        }
        viewFormData(payload);

        const res = await sendMessage(payload);
        if (res) {
            resp(res.data);
            setMessage('');
            return document.getElementById("message").focus();

            // chatUser.push(res.data);

        }
    }

    return (
        <div className="w-full flex h-12 px-1 items-center">




            <input
                className="w-11/12 h-11 placeholder:text-grey-light ml-2 text-black"
                placeholder="Escriba mensaje"
                id='message'
                value={message && message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <p className="cursor-pointer">{Icons.clip}</p>
            <button onClick={sendMessageUser} className="bg-menu text-white w-24 h-10  rounded-lg float-right mr-10 mb-0.5">Enviar</button>

        </div>
    )
}

export default SendPanel
