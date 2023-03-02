import React, { useState, createRef, useEffect, useContext } from 'react'
import { updateUser } from '../../provider/user/actions';
import { Context } from '../../provider/user/context';
import { toastTypes, viewFormData } from '../../utils/helpers';
import DropZone from '../Ui/dropZone';
import { useToasts } from "react-toast-notifications";

const ImgProfile = ({ photo }) => {


    const [image, setImage] = useState();
    const { user, setUser } = useContext(Context);
    const { addToast } = useToasts();
    const [setLoad] = useState(false);



    const handleImageClick = () => {
        document.querySelector('#image-profile').click();
    }

    const handleChangeImage = async (data) => {

        if (data) {
            const file = data.target.files[0];
            if (file) {

                setImage({ ...image, image: file });

                const payload = new FormData();
                payload.append("photo", file);
                viewFormData(payload);
                const res = await updateUser(payload);
                if (res) {
                    setUser(res?.data);
                    addToast('Foto Actualizada con exito',
                        { appearance: toastTypes.SUCCESS });
                    setImage('');
                } else {
                    addToast('Error al actualizar foto',
                        { appearance: toastTypes.SUCCESS });
                }

            }
        }
    }


    return (
        <>

            <div className="w-24 h-24 outline-none rounded-full bg-white lg:mr-2 flex justify-center items-center  border-2 overflow-hidden cursor-pointer ">


                <img
                    src={image?.image?.name ? URL.createObjectURL(image?.image) : `${user?.photo}?time=${Date.now()}`}
                    className="w-full h-full cursor-pointer outline-none"
                />

                <i className="bg-positive w-2 h-2 rounded-full absolute ml-16  mt-16 outline-none"></i>
                <input
                    type="file"
                    id="image-profile"
                    name="file"
                    className="bg-grey w-24 h-24 absolute opacity-0 cursor-pointer outline-none"
                    onChange={handleChangeImage}

                />
            </div>
        </>
    )
}

export default ImgProfile