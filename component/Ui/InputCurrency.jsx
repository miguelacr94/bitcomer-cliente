import React from 'react'
import CurrencyInput from 'react-currency-input-field';

const InputCurrency = ({ id, name, placeholder, decimal, onChange, value }) => {
    return (
        <CurrencyInput
        id="input-example"
        name="input-name"
        placeholder="Please enter a number"
        defaultValue={10}
        decimalsLimit={2}
        onValueChange={(value, name) => console.log(value, name)}
        />
    )
}

export default InputCurrency