import React from 'react'
import { stepSale } from '../../utils/data'

const SaleIndication = () => {
    return (
        <div className="flex flex-col justify-center items-center py-14 minScreen">
            {stepSale && stepSale.map((s, i) => {
                return (
                    <div
                        style={{ marginTop: s.marginTop }}
                        key={i}
                        className={`flex flex-col lg:flex-row 
                        lg:w-step w-72 lg:h-step h-48 shadow-xl 
                        rounded-xl bg-white items-center justify-center ${s.id === 2 ? 'lg:ml-20' : ''}
                     
                        `}>
                        <div className="w-3/6 flex justify-center">
                            <img
                                src={s.image}
                                className="lg:h-24 lg:w-24 w-20 h-20"
                            />
                        </div>
                        <div className="lg:w-3/6 w-72 text-center lg:text-start px-4 lg:pr-8 mt-6 lg:mt-0 ">
                            <p className="font-semibold text-grey-bitcomer"> {s.text}</p>
                        </div>
                    </div>
                )
            })


            }
        </div>
    )
}

export default SaleIndication