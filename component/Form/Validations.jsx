import React, { useContext, useEffect, useState } from 'react'
import { Icons } from '../../utils/icons'
import Button from '../Ui/Button'
import ValidationsForm from './ValidationsForm'
import Script from 'next/script'
import { Context } from '../../provider/user/context'
import { CompanyValidator } from '../../provider/api/user.queries'

const Validations = ({ typeUser, dataUser }) => {



  const { user, setUser } = useContext(Context);
  const [stateUser, setStateUser] = useState(null)
  const data = JSON.stringify({ id: user?.id })
  const [load, setLoad] = useState(false);
  const [form, setForm] = useState(null);


  useEffect(() => {

    setStateUser(user?.userVerification?.account?.status);

  })


  const validateCompany = async () => {

    const payload = {
      nit: form?.nit,
    }

    setLoad(true);
    const res = await CompanyValidator(payload);
    if (res) {

      setLoad(true)

    }
  }





  return (
    <div className="w-full text-blackText flex flex-col justify-start lg:containerEnabled ">

      <div className="w-full border boder-grey-bVerification float-right flex lg:flex-row flex-col justify-start items-center lg:h-32 p-2 rounded-xl lg:rounded-full px-10">
        <div className="rounded-full w-10 h-10 border border-grey-bCircle bg-menu flex justify-center items-center text-white font-semibold">
          1
        </div>
        <div className="ml-6 text-grey-light text-center lg:text-start mt-4 lg:mt-0">
          <h3 className="font-bold text-sm">Validación de identidad</h3>
          {user?.typeUser !== 'empresa' ?
            <p className="lg:text-xs text-sm">Ten a mano tu cédula de identidad y haz clic en el botón a continuación </p>
            : <p className="lg:text-xs text-sm">Ten a mano el Nit de tu empresa y haz clic en el botón a continuación </p>
          }
        </div>
        <div className="flex justify-center items-center ml-8">
          <div className="flex justify-center items-center ">

            {/* <p className="m-2 text-grey-light">{Icons.Verification}</p> */}

            {/* <Button
              text='Verificame'
              className="px-6 bg-blue-400 py-1"
            /> */}
            <div className=" w- h-16 overflow-hidden lg:ml-16 mt-6 lg:mt-0">
              {user?.typeUser !== 'empresa' ?
                <mati-button
                  clientid="62daa9996fe9c5001c8755ab"
                  flowId="62daa999385a35001ca03be1"
                  metadata={data}
                  style={{ width: "200px", heigth: "10px", fontSize: "10px" }}
                />
                :

                < div className="flex items-center justify-end ">
                  <div>
                    <label className="text-grey-light font-semibold ml-2 text-sm">Validar empresa</label>
                    <input
                      type="text"
                      className="border border-grey-line rounded-full h-8 placeholder:pl-2 placeholder:text-sm p-2"
                      placeholder="Ingresar Nit"
                      value={form?.nit}
                      onChange={(e) => setForm({ ...form, nit: e.target.value })}
                    />
                  </div>
                  <button className="h-8 bg-menu px-4 rounded-full mt-6 text-white text-sm"
                    onClick={() => validateCompany()}
                  >Validar</button>
                </div>

              }
            </div>

          </div>
        </div>
      </div>

      {/* <div className="w-9/12 border boder-grey-bVerification float-right  justify-start items-center  p-2 mt-4">
        <div className="flex">
          <div className="rounded-full w-8 h-8 border border-grey-bCircle bg-grey-fondoEnable flex justify-center items-center text-grey-light">
            2
          </div>

          <div className="ml-2 text-grey-light">
            <h3 className="font-bold text-sm">Validación de identidad</h3>
            <p className="text-xs">Ten a mano tu cédula de identidad y haz clic en el botón a continuación</p>
          </div>

        </div>


        <div className="w-9/12 px-2 mt-4 py-1 mb-16 ">
          <ValidationsForm />
        </div>


      </div> */}


    </div >
  )
}

export default Validations