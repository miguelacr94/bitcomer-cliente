import React, { useContext, useState } from 'react'
import { updateUser } from '../../provider/user/actions';
import { Context } from '../../provider/user/context';
import ProfileForm from '../Form/ProfileForm'

const ProfileUpdate = () => {

    const { user, setUser } = useContext(Context);
    const { country, setCountry } = useContext(Context);
    const [image, setImage] = useState()



    const handleImageClick = () => {
        document.querySelector('#image-profile').click();
    }

    const handleChangeImage = (data) => {
        if (data) {
            const file = data.target.files[0];
            if (file) {
                 
                setImage({ ...image, image: file })

            }
        }
    }


    return (
        <div className="w-3/6 border border-grey-bTab2  bg-grey-fondoTab px-8 mr-2 pb-4">
            <h2 className="font-semibold text-sm mt-6">Editar tu perfil</h2>
            <hr className="w-full bg-grey-line mt-4 " />
            <div className="px-5 mt-7">
                <div className="flex justify-start items-center">
                    <div className="w-14 h-14 rounded-full bg-white mr-2 flex justify-center items-center  border-2 overflow-hidden">
                        <img
                            src={image?.image?.name ? URL.createObjectURL(image?.image) : `${user?.photo}?time=${Date.now()}`}
                            className="w-full h-full"
                        />
                        <i className="bg-positive w-2 h-2 rounded-full absolute ml-10 mt-10"></i>
                    </div>
                    <input
                        type="file"
                        id="image-profile"
                        style={{ display: "none" }}
                        name="file"
                        onChange={handleChangeImage}

                    />

                    <a onClick={handleImageClick} className="text-terminos ml-1 underline text-black ">Cambiar foto</a>
                </div>

                <div className="mt-8 ">
                    <ProfileForm
                        user={user}
                        setUser={(e) => setUser(e)}
                        pais={country}
                        image={image}
                    />
                </div>




            </div>

        </div>
    )
}

export default ProfileUpdate