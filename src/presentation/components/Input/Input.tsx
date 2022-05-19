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
  testID
}) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()
  const { emailError, passwordError, nameError, passwordConfirmationError } = state
  const error = state[`${inputName}Error`]

  const selectCorrectTextError = (): string => {
    const options = {
      'email': emailError,
      'password': passwordError,
      'name': nameError,
      'passwordConfirmation': passwordConfirmationError
    }
    return options[inputName]
  }


  // const getStatus = (): string => {
  //   return state[`${inputName}Error`] ? '🔴' : '🟢'
  // }

  // const getTitle = (): string => {
  //   return state[`${inputName}Error`] ? selectCorrectTextError() : 'Tudo certo'
  // }

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
