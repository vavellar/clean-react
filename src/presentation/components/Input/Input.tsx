import React, { useContext } from 'react'
import Styles from './Input-styles.scss'
import FormContext from '@/presentation/contexts/form/formContext'

type InputProps ={
  inputType: string
  inputName: string
  placeHolder: string
  testID: string
}

const Input: React.FC<InputProps> = ({
  inputType,
  inputName,
  placeHolder,
  testID
}) => {
  const { emailError, passwordError} = useContext(FormContext)

  const selectCorrectTextError = (): string => {
    const options = {
      'email': emailError,
      'password': passwordError
    }
    return options[inputName]
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return selectCorrectTextError()
  }

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        readOnly
        onFocus={enableInput}
        type={inputType}
        name={inputName}
        placeholder={placeHolder}
      />
      <span data-testid={testID} title={getTitle()} className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
