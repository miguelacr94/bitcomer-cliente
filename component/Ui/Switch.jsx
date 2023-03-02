import React from 'react'
import Switch from "react-switch";

const SwitchUi = ({ label, id, name, onChange, checked, colorLabel, className, mt }) => {
    return (
        <label className={`flex justify-start flex-col ${mt}`}>
            <span className={`text-md font-semibold ${colorLabel}`}>{label}</span>

            <Switch
                checked={checked}
                onChange={onChange}
                onColor="#5768F3"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className={`react-switch ${className}`}
                id={id}
            />
        </label>
    )
}

export default SwitchUi