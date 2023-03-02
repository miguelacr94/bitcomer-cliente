import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../provider/user/context'

const Avatar = () => {

    const { user } = useContext(Context);
    const [stateUser, setStateUser] = useState(null)

    const { statusUser } = useContext(Context);
    useEffect(() => {

        setStateUser(user?.userVerification?.account?.status);

    },[setStateUser, user])



    return (
        <div href={'/configuration'} id="aviso" className="w-5/6 h-14  z-10 rounded-sm flex justify-start items-center p-1 px-2 pointer-events-none">
            <div className="w-12 h-12 rounded-full  mr-2 flex justify-center items-center overflow-hidden pointer-events-none">
                <img
                    disabled={true}
                    src={user?.photo ? `${user?.photo}?time=${Date.now()}` : ''}
                    className="w-full h-full pointer-events-none"

                />
                <i className={
                    `${statusUser === 'pending' ? 'bg-orange-400' :
                        statusUser === 'verified' ? 'bg-green-500' :
                            statusUser === 'rejected' ? 'bg-red-500' :
                                statusUser === 'reviewNeeded' ? 'bg-yellow-400' :
                                    statusUser === 'waiting' ? 'bg-orange-400'
                                        : ''}
                     w-2 h-2 rounded-full absolute ml-10 mt-10`}></i>
            </div>
            <div className="text-white flex flex-col pointer-events-none">
                <p className="text-sm text-white font-semibold pointer-events-none">{user?.fullName}</p>
                {/* <span className="text-xs text-start font-mono pointer-events-none">Usuario</span> */}
            </div>
        </div >
    )
}

export default Avatar