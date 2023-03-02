import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import Input from '../Ui/Input';
import { useState } from 'react';
import { toastTypes, viewFormData } from '../../utils/helpers';
import { updateUser } from '../../provider/user/actions';
import { useToasts } from 'react-toast-notifications';
import { useContext } from 'react';
import { Context } from '../../provider/user/context';
import { useEffect } from 'react';


const schema = yup.object({
    wallet: yup.string().required("Wallet es requerida.")
});

const WalletForm = () => {

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });

    const { user, setUser } = useContext(Context);
    const [load, setLoad] = useState(false);
    const [image, setImage] = useState(null);
    const { addToast } = useToasts();

    const onSendWallet = async (data) => {
        const payload = new FormData();
        payload.append('wallet', data?.wallet);
        payload.append("photo", image);
        payload.append('qr', 'yo soy el patron');

        const res = await updateUser(payload);
        if (res) {
            setUser(res?.data);
            addToast('Actualización exitosa',
                { appearance: toastTypes.SUCCESS });
        } else {
            addToast('Error al actualizar dato',
                { appearance: toastTypes.ERROR });
        }

    }

    const handleChangeImage = async (data) => {

        if (data) {
            const file = data.target.files[0];
            if (file) {
                setImage(file);
            }
        }
    }





    return (
        <div className='md:w-4/6 w-full flex flex-col justify-center items-center'>

            <div className="w-24 h-24 outline-none rounded-sm bg-white lg:mr-2 flex justify-center items-center  border-2 overflow-hidden cursor-pointer ">


                <img
                    src={image ? URL.createObjectURL(image) : `${user?.qrImage}?time=${Date.now()}`}
                    className="w-full h-full cursor-pointer outline-none "
                />

                <input
                    type="file"
                    id="image-profile"
                    name="file"
                    className=" w-24 h-24 absolute opacity-0 cursor-pointer outline-none"
                    onChange={handleChangeImage}

                />
            </div>


            <form className='w-full flex flex-col items-start' onSubmit={handleSubmit(onSendWallet)}>
                <Input
                    id='wallet'
                    name='wallet'
                    placeholder="Wallet TRC20"
                    type='text'
                    className="bg-white"
                    // formatChars={letter}
                    defaultValue={user?.wallet}
                    control={control}
                    register={register}
                    hint={
                        errors.wallet?.type === "required" || errors.wallet?.message
                            ? errors.wallet?.message
                            : ""
                    }
                    errors={
                        errors.wallet?.type === "required" || errors.wallet?.message
                            ? true
                            : false
                    }

                />
                <button
                    type='submit'
                    disabled={load}
                    className="bg-menu px-10 text-xs m-auto outline-none lg:float-right mt-6 h-10 rounded-full text-white w-36 
                    flex justify-center items-center disabled:opacity-75">
                    {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Guardar'}
                </button>



            </form>

        </div>
    )
}

export default WalletForm
