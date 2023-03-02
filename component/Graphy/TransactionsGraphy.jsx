import React from 'react'
import { Line, Chart } from 'react-chartjs-2';
import { Icons } from '../../utils/icons';
import { options } from '../../utils/__data';
import { Chart as ChartJS } from 'chart.js/auto'
// import { data } from '../../utils/__data';

const TransactionsGraphy = ({ data }) => {
 
    return (
        <div className="p-4 rounded-2xl shadow-lg  border w-full">

            <div className="flex flex-col ">
                <div className="w-full flex">
                    <div className="px-4 w-3/6">
                        <h2 className="font-black text-xl  text-textFilter ">Resumen de tus transacciones</h2>

                    </div>
                    {/* <div className="w-3/6">
                        <div className="w-28 rounded-full bg-filter text-textFilter py-2 px-4 flex space-x-1 float-right">
                            <p className="text-xs font-semibold">Julio 2022</p>
                            <p>{Icons.DownArrow}</p>
                        </div>
                    </div> */}
                </div>


                <div className="flex items-center w-full text-black px-4 mt-4">

                    {/* <div className="mt-2 flex flex-col w-2/6 space-y-1 ">
                        <p className="text-xs  text-dataTable">Total de transacciones</p>
                        <p className="font-bold text-sm">15,236</p>
                        <p className="text-terminos font-semibold text-textDetail">89.5% of 20.000 Total</p>

                    </div> */}
                    {/* <div className="h-8 w-2 bg-grey"></div> */}

                    {/* <div className=" mt-2 w-2/6 space-y-1">
                        <p className="text-xs  text-dataTable">Total de transacciones</p>
                        <p className="font-bold text-sm">$753,098</p>
                        <p className="text-terminos  font-semibold text-textDetail">10.5% of 20.000 Total</p>

                    </div> */}
                    <div className="w-3/6 lg:w-2/6  flex items-end justify-end flex-col space-y-1">
                        
                        <div className="flex  justify-end w-full">
                            {data?.datasets.map((item, i) => {
                                return (
                                    <div key={i} className="flex justify-center items-center m-1 justify-center space-x-2">


                                        <p className="text-terminos font-semibold text-black w-10 ">{item?.label}</p>
                                        <p
                                            style={{ backgroundColor: `${item?.borderColor}` }}
                                            className="w-6 h-1 rounded-md mt-0 ml-1"></p>
                                    </div>

                                )
                            })}
                        </div>

                    </div>


                </div>


            </div>




            <div className=" flex items-end ">
                {
                    data &&
                    <Line options={options} data={data && data} />
                }



            </div>

            {/* <canvas id="myChart"></canvas> */}
        </div >
    )
}

export default TransactionsGraphy