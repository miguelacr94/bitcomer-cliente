import React, { useState } from 'react';
import { viewFormData, toastTypes } from '../../utils/helpers';
import { Icons } from '../../utils/icons';
import MessagePanel from './MessagePanel';
import { useToasts } from "react-toast-notifications";
import { sendMessage } from '../../provider/user/actions';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../provider/user/context';

const PanelChat = ({ chat, user, resp, setView }) => {
    const { addToast } = useToasts();

    const [fileSelected, setFile] = useState(null);
    const [message, setMessage] = useState(null);
    const { copy, setCopy } = useContext(Context);



    const handleImageClick = () => {
        document.querySelector('#image-profile').click(); //selecciona input file
    }

    const handleChangefile = (data) => { //cambiar imagen
        if (data) {
            const file = data.target.files[0];
            setFile(file);
        }
    }

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
        setCopy('');

        if (!fileSelected?.name) {
            if (!message) {
                return
            } else {
                const res = await sendMessage(payload);
                if (res) {
                    resp(res.data);
                    setFile('');
                    setMessage('');
                    return document.getElementById("message").focus();

                    // chatUser.push(res.data);
                }
            }
        } else {

            const res = await sendMessage(payload);
            if (res) {
                resp(res.data);
                setFile('');
                setMessage('');
                return document.getElementById("message").focus();

                // chatUser.push(res.data);
            }
        }

    }




    useEffect(() => {

        setTimeout(() => {
            if (!fileSelected?.name) {
                document.getElementById("message").focus();
            }


            if (copy) {
                setMessage(copy);
            }
        }, 500);

    }, [copy]);



    return (
        <div className="w-full h-full ">
            <div className={`w-full ${fileSelected?.name ? 'h-4/6' : 'h-panelMessageMovil  bg-grey-chatSelected '}`}>
                <MessagePanel
                    message={chat}
                    user={user}
                    setView={(e) => setView(e)}
                />
            </div>

            <form autoComplete='off' className='h-14 pb-2'>
                <div className={`${fileSelected?.name ? 'h-36 ' : 'h-12'} w-full px-3 border-t flex  items-center justify-start space-x-2 bg-white mt-1 `}>

                    {fileSelected && fileSelected?.name ?

                        <>
                            <div className="w-11/12 flex justify-center px-4 full space-x-2 items-start  ">
                                <img
                                    src={fileSelected && URL.createObjectURL(fileSelected)}
                                    className="max-w-40 max-h-32"
                                />
                            </div>
                            <button onClick={() => setFile([])} className="w-5 h-5 bg-grey-light flex items-center justify-center rounded-full text-white text-sm">x</button>
                        </>

                        : <input
                            id='message'
                            value={message && message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-11/12 pl-2  rounded-lg  h-10 outline-none bg-white text-sm text-grey"

                        />
                    }
                    <div className='flex h-full items-center space-x-2'>
                        <input
                            type="file"
                            id="image-profile"
                            className='bg-white '
                            style={{ display: "none" }}
                            name="file"
                            accept="image/*"
                            onChange={handleChangefile}

                        />
                        <p className="cursor-pointer text-grey" onClick={handleImageClick}>{Icons.clip}</p>

                        {
                            <button onClick={sendMessageUser} className="bg-menu text-white w-9 h-9  text-xl rounded-full flex justify-center items-center float-right mr-10 mb-0.5">{Icons.send}</button>
                        }


                    </div>

                </div>
            </form>

        </div>
    )
}

export default PanelChat