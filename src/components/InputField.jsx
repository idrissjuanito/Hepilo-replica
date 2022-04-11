import { useContext, useEffect, useRef, useState } from 'react'
import capitalize from '../utils'
import { formContext } from './Form'

export default function InputField({ name, type, data }) {
  const { formData, setFormData, edit } = useContext(formContext)
  const [value, setValue] = useState('')
  useEffect(() => {
    if (edit && formData.id) {
      setValue(formData?.[name])
    }
  }, [])

  useEffect(() => {
    if (value && value !== '') {
      value?.length < 2 && type !== 'number'
        ? console.log({ name } + ' is too short')
        : setFormData({ ...formData, [name]: value })
    }
  }, [value])

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const swithType = (fieldType) => {
    switch (fieldType) {
      default:
        return <TextField name={name} onChange={handleInput} value={value} />
      case 'select':
        return (
          <SelectField
            name={name}
            onChange={handleInput}
            data={data}
            value={value}
            setValue={setValue}
          />
        )
      case 'number':
        return <NumberField name={name} onChange={handleInput} value={value} />
    }
  }
  return (
    <>
      <fieldset className="px-4 relative rounded-md border cursor-pointer hover:border-2 border-lime-50 m-2 my-8">
        <legend className="px-1 py-0 text-xs leading-none m-0">
          {capitalize(name)}
        </legend>
        {swithType(type)}
      </fieldset>
    </>
  )
}

function TextField({ name, onChange, value }) {
  return (
    <>
      <input
        onChange={onChange}
        className=" bg-transparent py-3 w-full cursor-pointer outline-none border-none"
        type="text"
        name={name}
        id="Name"
        placeholder={capitalize(name)}
        value={value}
      />
      <small className="absolute right-0 -bottom-6">8/16</small>
    </>
  )
}

function SelectField({ name, onChange, data, value, setValue }) {
  const selectRef = useRef(null)
  const options = data?.map((opt) => (
    <option key={opt} value={capitalize(opt)}>
      {capitalize(opt)}
    </option>
  ))
  useEffect(() => {
    value === '' && setValue(selectRef.current.value)
  }, [])
  return (
    <select
      ref={selectRef}
      onChange={onChange}
      name={name}
      id={name}
      value={value}
      className="w-full bg-transparent py-3 cursor-pointer outline-none border-none"
    >
      {options}
    </select>
  )
}

function NumberField({ name, onChange, value }) {
  return (
    <div className="flex items-center py-3">
      <small className="text-lg">{name.includes('price') && 'FCFA'}</small>
      <input
        onChange={onChange}
        className=" bg-transparent px-2 w-full cursor-pointer outline-none border-none"
        type="number"
        name={name}
        id="Name"
        placeholder={capitalize(name)}
        value={value}
      />
    </div>
  )
}
