// TO DO -> REFACTOR THIS COMPONENT

import React, { useContext, useRef } from 'react'
import Styles from './Input-styles.scss'
import FormContext from '@/presentation/contexts/form/FormContext'

type InputProps ={
  inputType: string
  inputName: string
  placeHolder: string
  testID?: string
}

const Input: React.FC<InputProps> = ({
  inputType,
  inputName,
  placeHolder,
}) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${inputName}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${inputName}-wrap`}
    >
      <input
        ref={inputRef}
        onChange={handleChange}
        data-testid={inputName}
        readOnly
        title={error}
        onFocus={enableInput}
        type={inputType}
        name={inputName}
        placeholder=" "
      />
      <label
        data-testid={`${inputName}-label`}
        title={error}
        onClick={() => {
          inputRef.current.focus()
        }}
      >
        {placeHolder}
      </label>
    </div>
  )
}

export default Input
