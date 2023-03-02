import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../provider/user/context';
import { Pay } from '../../utils/data'
import { Icons } from '../../utils/icons'

const PayMethod = ({ payMethod, className, disabled, setSelectPay, payInitial, tab }) => {

    const [paySelect, setPaySelect] = useState(payInitial || null);
    const { countrySelect } = useContext(Context)

    const payMethodSelect = (e) => {

        if (disabled) {

        } else {
            payMethod(e.name);
            setPaySelect(e.name);
        }


    }


    useEffect(() => {
        setPaySelect(setSelectPay);
    }, [setSelectPay]);

    useEffect(() => {
        setPaySelect(payInitial);
        payMethod(payInitial);

    }, [payInitial]);

    const nula = () => {

    }


    return (
        <div className={`${className ? className : 'mt-6'}`}>
            <h2 className="lg:text-start text-center  font-semibold text-sm text-menu">Métodos de pago</h2>

            <div className=" w-full mt-6 pb-4">
                {
                    Pay.map((pay, index) => {
                        if (countrySelect?.name === 'Panama') {
                            if (pay.name === 'banco' || pay.name === 'efectivo') {

                                return (
                                    <button key={index}
                                        onClick={() => payMethodSelect(pay)}
                                        disabled={disabled}
                                        className={`flex w-full   mt-2 
                                         ${disabled ? 'cursor-not-allowed' : ' cursor-pointer'}
                                          disabled:opacity-75 rounded-lg h-12 border items-center
                                          ${paySelect && paySelect === pay.name ? 'border-menu bg-paySelect' : 'bg-white'}  `}

                                    >


                                        <div className="w-11/12 flex justify-start items-center overflow-hidden px-4 space-x-2 ">

                                            <img
                                                src={pay.icon}
                                                className={
                                                    pay.name === 'credit' ? 'w-14 h-8' :
                                                        pay.name === 'pse' ? '-ml-2 w-14 h-11' :
                                                            pay.name === 'banco' ? 'w-8 h-8' :
                                                                pay.name === 'efectivo' ? 'w-8 h-8' :
                                                                    ''

                                                }
                                            />
                                            <img
                                                src={pay.icon2}
                                                className={pay.icon2 ? 'block w-10 h-10' : 'hidden'}
                                            />
                                            <img
                                                src={pay.icon3}
                                                className={pay.icon2 ? 'block w-14 h-10' : 'hidden rounded-lg'}
                                            />
                                            <p className={`${pay.name === 'credit' ? 'hidden ' : 'block'} text-sm font-semibold text-grey `}>{pay.text}</p>
                                        </div>


                                        <p className="w-1/12 flex justify-center items-center text-grey  float-right text-xs">{Icons.RigthArrow}</p>
                                    </button>
                                )
                            }
                        }
                        if (countrySelect?.name === 'Colombia') {
                            if (pay.name !== 'efectivo') {
                                return (
                                    <button key={index}
                                        onClick={() => payMethodSelect(pay)}
                                        disabled={disabled}
                                        className={`flex w-full  mt-2  ${disabled ?
                                            'opacity-75 cursor-not-allowed' : ' cursor-pointer'} 
                                            disabled:opacity-75 rounded-lg h-12 border items-center
                                            ${paySelect && paySelect === pay.name ? 'border-menu bg-paySelect' : 'bg-white '}  `}

                                    >

                                        <div className="w-11/12 flex justify-start items-center overflow-hidden px-4 space-x-2 ">
                                            <div className='w-16 '>
                                                <img
                                                    src={pay.icon}
                                                    className={
                                                        pay.name === 'credit' ? 'w-14 h-8' :
                                                            pay.name === 'pse' ? '-ml-2 w-14 h-11' :
                                                                pay.name === 'banco' ? 'w-8 h-8' :
                                                                    ''

                                                    }
                                                />
                                            </div>
                                            <img
                                                src={pay.icon2}
                                                className={pay.icon2 ? 'block w-10 h-10' : 'hidden'}
                                            />

                                            <img
                                                src={pay.icon3}
                                                className={pay.icon2 ? 'block w-14 h-10  ml-2' : 'hidden rounded-lg'}
                                            />

                                            <p className={`${pay.name === 'credit' ? 'hidden ' : 'block'} text-sm font-semibold text-grey `}>{pay.text}</p>
                                        </div>

                                        <p className="w-1/12  flex justify-center items-center text-grey  float-right text-xs">{Icons.RigthArrow}</p>
                                    </button>
                                )
                            }
                        }

                        if (countrySelect?.name === 'El Salvador') {
                            if (pay.name === 'efectivo') {
                                return (
                                    <button key={index}
                                        onClick={ () => payMethodSelect(pay)}
                                        disabled={disabled}
                                        className={`flex w-full  mt-2  
                                        ${disabled ? 'opacity-75 cursor-not-allowed' : ' cursor-pointer'}
                                         disabled:opacity-75 rounded-lg h-12 border items-center
                                          ${paySelect && paySelect === pay.name ? 'border-menu bg-paySelect ' : ' bg-white'}  `}

                                    >

                                        <div className="w-11/12 flex justify-start items-center overflow-hidden px-4 space-x-2 ">

                                            <img
                                                src={pay.icon}
                                                className={
                                                    pay.name === 'credit' ? 'w-14 h-8' :
                                                        pay.name === 'pse' ? '-ml-2 w-14 h-11' :
                                                            pay.name === 'banco' ? 'w-8 h-8' :
                                                                pay.name === 'efectivo' ? 'w-8 h-8' :
                                                                    ''

                                                }
                                            />

                                            <p className={`${pay.name === 'credit' ? 'hidden ' : 'block'} text-sm font-semibold text-grey `}>{pay.text}</p>
                                        </div>

                                        <p className="w-1/12 flex justify-center items-center text-grey  float-right text-xs">{Icons.RigthArrow}</p>
                                    </button>
                                )
                            }
                        }



                    }

                        // }
                    )
                }
            </div>
            {tab === 'purchase' ?
                < span className='text-gray-600 text-sm mt-4 font-semibold'>Debe seleccionar un método de compra y completar los campos antes continuar</span>
                :
                < span className='text-gray-600 text-sm mt-4 font-semibold'>
                    En el proceso de venta no se requiere elegir ningún método
                </span>

            }
        </div >
    )
}

export default PayMethod