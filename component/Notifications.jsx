import React, { useEffect, useState } from 'react'
import { getNotification } from '../provider/api/home.queries';
import moment from 'moment';
moment().format();


const Notifications = () => {


    const [showNotification, setShowNotification] = useState(false);
    const [load, setLoad] = useState(false);
    const [notification, setNotification] = useState(null);


    useEffect(() => {
        document.addEventListener('click', function (event) {
            if (event.target.localName === 'svg') {
            } else if (event?.target?.id !== 'myMenu') {
                setTimeout(() => {
                    setShowNotification(false);
                }, 100);
            }
        });

    });


    const getNotificationUser = async () => {

        setLoad(true);
        const res = await getNotification();
        if (res) {
            setNotification(res?.data?.docs);
            setLoad(false);
        }

    }

    useEffect(() => {
        getNotificationUser();
    }, [showNotification, setShowNotification]);



    const loadAndShowNotifications = () => {
        getNotificationUser();
        setShowNotification(!showNotification)
    }


    return (
        <div className="ralative z-10">
            <div className="flex items-center ">


                <div
                    id="myMenu"
                    onClick={() => loadAndShowNotifications()}
                    className="w-8 h-8 cursor-pointer rounded-xl border border-grey-fondoTab mx-1 flex justify-center items-center text-grey-bNav "
                >
                    <img
                        id="myMenu"
                        src="./icon/notification.svg"
                        className="w-6 h-6"
                    ></img>
                </div>
            </div>

            {showNotification ?
                <div className="bg-white border shadow-lg absolute mt-4 w-64 h-auto max-h-80 -ml-48 rounded-lg flex flex-col items-center py-2 space-y-2 overflow-auto">
                    {notification && notification.length > 0 ? notification.map((n, index) => {
                        return (
                            <div key={index} className="bg-grey-testimonial text-white text-sm w-11/12 rounded-lg border cursor-pointer">
                                <div className="flex flex-col w-full text-black relative py-2 px-2">
                                    <div className="w-5/6 absolute text-end text-xs right-2">{moment(n?.createdAt).format('L')}</div>

                                    <h3 className="font-semibold text-notification">{n?.title}</h3>
                                    <p className="text-grey-light">{n?.content}</p>
                                    <p className="text-grey-light font-semibold">{n?.value}</p>
                                </div>

                            </div>
                        )
                    })
                        :
                        <p className="text-sm text-grey text-center font-semibold">
                            Sin notificación
                        </p>

                    }


                </div>
                :

                ''

            }

        </div>
    )
}

export default Notifications