import React, { useState } from 'react'
import { Icons } from '../../utils/icons';

const Check = ({ text }) => {

    const [active, setActive] = useState(false);

    return (
        <div className="flex space-x-2">
            <div
                onClick={() => setActive(!active)}
                className="w-4 h-4 border border-grey-line rounded-sm">
                {active ? <p className="text-green-400 text-sm">{Icons.check}</p> : ''}
            </div>
            <p className="text-grey-light text-terminos">{text}</p>
        </div>
    )
}

export default Check