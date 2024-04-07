import React, { FC } from 'react'
import { CountryCounts } from './addtrip'

interface IGetNames{
    value: Array<CountryCounts>;
    setValue: (...value: any) => void
}

const Select: FC<IGetNames> = ({value, setValue}) => {
    const handleChange = (e: any) =>{
setValue(e.target.value)
    }
  return (
    <select onChange={handleChange} className=" border rounded-md">
        {value.map((name, index) => {
          return (
            <option key={index} value={name.key}>
              {name.displayValue}
            </option>
          );
        })}
      </select>
  )
}

export default Select