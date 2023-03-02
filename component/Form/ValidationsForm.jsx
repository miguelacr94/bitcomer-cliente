import React, { useState } from 'react'
import Button from '../Ui/Button'
import Input from '../Ui/Input'
import Select from '../Ui/Select'
import { Items, Profesion, Country, Nacionalidad } from '../../utils/data'

const ValidationsForm = () => {

    const [form, setForm] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-grey-fondoForm containerEnabled"
        >
            <Select
                id='nacionality'
                placeholder='Nacionalidad'
                className='opacity-60'
                items={Nacionalidad?.map((i) => i.name)}
                onChange={(e) => setForm({ ...form, nacionality: e })}
                value={form && form.nacionality}

            />
            <Select
                id='country'
                placeholder='País de Residencia'
                className='opacity-60'
                items={Country?.map((i) => i.name)}
                onChange={(e) => setForm({ ...form, country: e })}
                value={form && form.country}
            />
            <Input
                id='city'
                placeholder='Ciudad de Residencia'
                className='opacity-60'
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                value={form && form.city}
            />
            <Input
                id='departament'
                placeholder='Departamento de Residencia'
                className='opacity-60'
                onChange={(e) => setForm({ ...form, departament: e.target.value })}
                value={form && form.departament}
            />
            <Input
                id='number'
                placeholder='Numero de teléfono'
                className='opacity-60'
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                value={form && form.number}
            />
            <Select
                id='profession'
                placeholder='Profesión u Oficio'
                className='opacity-60'
                items={Profesion?.map((i) => i.name)}
                sTop={true}
                onChange={(e) => setForm({ ...form, profession: e })}
                value={form && form.profession}
            />
            <Button

                type='submit'
                text='Solicitar verificación'
                className='px-4 py-1 bg-menu mt-2 float-right'
            />
        </form>
    )
}

export default ValidationsForm