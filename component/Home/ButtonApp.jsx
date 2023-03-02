import React from 'react'

const ButtonApp = () => {
    return (
        <div className="flex space-x-4 mt-8">

            <div className="lg:w-40 lg:h-12 w-36 h-10  rounded-lg bg-black text-white flex justify-center items-center " >
                <div className="w-full h-full cursor-pointer">
                    <img
                        src="./image/google-play.png"
                        className="w-full h-full"
                    />
                </div>

            </div>

            <div className="lg:w-40 lg:h-12 w-36 h-10  rounded-lg bg-black text-white flex justify-center items-center " >
                <div className="w-full h-full cursor-pointer">
                    <img
                        src="./image/app-store.png"
                        className="w-full h-full"
                    />
                </div>

            </div>
        </div>
    )
}

export default ButtonApp