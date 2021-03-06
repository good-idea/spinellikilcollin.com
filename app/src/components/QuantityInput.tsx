import * as React from 'react'
import { UseCounterValues } from '../utils/hooks'
import { $PropertyType } from 'utility-types'
import { Input } from './Forms'

interface Props {
  quantity: $PropertyType<UseCounterValues, 'count'>
  setQuantity: $PropertyType<UseCounterValues, 'setCount'>
}

export const QuantityInput = (props: Props) => {
  const [tempInput, setTempInput] = React.useState<string | void>(undefined)
  const { quantity, setQuantity } = props

  const handleInputChange = (e: any) => {
    const { value } = e.target
    if (value === '' || value === '-') {
      setTempInput(value)
    } else if (/\d+/.test(value)) {
      setTempInput(undefined)
      setQuantity(e.target.value)
    }
  }

  const handleBlur = () => {
    setTempInput(undefined)
  }

  const value = tempInput !== undefined ? tempInput : quantity

  return <Input type="text" onChange={handleInputChange} value={value || ''} />
}
