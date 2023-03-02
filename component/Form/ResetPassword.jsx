import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { resetPassword } from '../../provider/user/actions';
import InputAlt from '../Ui/InputAlt';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toastTypes } from '../../utils/helpers';
import { useToasts } from "react-toast-notifications";
import { Icons } from '../../utils/icons';
import InputPublic from '../Ui/InputPublic';

const schema = yup.object({

    email: yup.string().required('Email es requerido.').matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, ingresa una direcccion de email válida."),


});


const ResetPassword = ({onClose}) => {

    const { addToast } = useToasts();

    const [form, setForm] = useState('');
    const [load, setLoad] = useState(false);

    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) });



    const onResetPassword = async (e) => {

        setLoad(true);
        const data = await resetPassword(e.email);
        if (data) {
            addToast('Envio exitoso, revise su correo electrónico',
                { appearance: toastTypes.SUCCESS, transitionDuration: 2000 });
            setLoad(false);
            onClose();
        } else {
            addToast('Error al momento de enviar',
                { appearance: toastTypes.ERROR, transitionDuration: 2000 });
                setLoad(false);
                onClose();
            setLoad(false);
        }


    }



    return (
        <div className="p-2 flex flex-col items-center md:w-80 text-center text-md m-uto">
            <h1 className="text-center font-bold text-black">Recuperación de contraseña</h1>
            <p className="text-sm mt-4">Por favor escribir un email registrado en nuestras bases de datos</p>
            <form className="w-80 p-4" onSubmit={handleSubmit(onResetPassword)} >
                <div className=" flex flex-col justify-center items-center ">

                    <InputPublic
                        label="Ingresa tu correo electrónico"
                        colorLabel="text-black"
                        id='email'
                        type="email"
                        name='email'
                        placeholder="ingresa tu correo electrónico"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className=" bg-loginInput
                        outline-none text-sm mt-2 text-register bg-input
                        placeholder:text-grey-grey placeholder:text-md font-semibold text-black border border-grey-line"
                        register={register}
                        defaultValue={(form && form.email) || ''}
                        value={(form && form.email) || ''}
                        control={control}
                        // hint={
                        //     errors.email?.type === "required" || errors.email?.message
                        //         ? errors.email?.message
                        //         : ""
                        // }
                        // errors={
                        //     errors.email?.type === "required" || errors.email?.message
                        //         ? true
                        //         : false
                        // }
                    />
                </div>

                <div className="flex justify-center items-center mt-4">
                    <button
                        disabled={load}
                        className="text-white bg-menu rounded-lg px-4 h-10 w-24 flex justify-center items-center disabled:opacity-75" type="submit" >
                        {load ? <p className="animate-spin h-4 w-4  flex justify-center items-center text-white">{Icons.Load}</p> : 'Enviar'}

                    </button>
                </div>

            </form>


        </div>
    )
}

export default ResetPassword