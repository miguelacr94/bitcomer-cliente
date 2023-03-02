import React, { useState } from 'react'
import { Icons } from '../../utils/icons'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
const FilterDate = () => {

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);



    return (
        <div className="w-3/6 flex  justify-start items-center">

            <div className="">
                <div className="flex bg-grey-fFilter justify-start items-center w-filter h-6 rounded-sm">
                    <p className="border-r-2 border-grey-bTab p-1 text-blue-400 text-xs w-6">
                        {Icons.LeftArrow}
                    </p>

                    <div className="w-48 h-8 flex items-center px-2">
                        <p className="text-terminos  text-black">27/07/2022</p>
                        <p className="mx-1">-</p>
                        <p className="text-terminos  text-black">27/07/2022</p>
                        <p className="text-blue-400 text-xs font-bold ml-2">
                            {Icons.DownArrow}
                        </p>
                    </div>

                    <p className="border-l-2 border-grey-bTab p-1 text-blue-400 text-xs">
                        {Icons.RigthArrow}
                    </p>
                    {/* <div className="w-40 h-8 flex items-center">
                        <p className="text-xs">27/07/2022</p>
                        -
                        <p className="text-xs">27/07/2022</p>
                        <p className="text-blue-400 text-xs font-bold w-6 ">
                            {Icons.DownArrow}
                        </p>
                        <p className="border-l-2 p-1 text-blue-400 text-xs">{Icons.RigthArrow}</p>
                    </div> */}

                    {/* <p className="border-r-2 p-1 text-blue-400 text-xs">{Icons.LeftArrow}</p>
                    <input
                        type="text"
                        value="26/07/2022"
                        className="bg-transparent w-16 text-xs text-grey outline-none"
                        
                    />
                    
                    <p>-</p>

                    <input
                        type="text"
                        value="26/07/2022"
                        className="bg-transparent w-16 text-xs text-grey outline-none"
                    /> 
                    <p className="text-blue-400 text-xs font-bold">
                        {Icons.DownArrow}
                    </p> */}



                    {/* <p className="border-l-2 p-1 text-blue-400 text-xs">{Icons.RigthArrow}</p> */}
                </div>

            </div>
            {/* <input
                type="text"
                placeholder="Seach Here"
                className="w-4/6 h-6 border border-grey-bFilter outline-none ml-4 pl-2 rounded-sm placeholder:text-xs placeholder:text-grey-bFilter  bg-white text-black" /> */}


            {/* <DateRangePicker
                onChange={item => setState([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                // locale='es'
                months={2}
                ranges={state}
                direction="horizontal"
            >
                <input type="text"></input>

            </DateRangePicker> */}


        </div>
    )
}

export default FilterDate