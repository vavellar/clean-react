import React, { useContext } from 'react'
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
  const { emailError, passwordError } = state

  const selectCorrectTextError = (): string => {
    const options = {
      'email': emailError,
      'password': passwordError
    }
    return options[inputName]
  }


  const getStatus = (): string => {
    return inputName === 'email'
      ? emailError
        ? '🔴'
        : '🟢'
      : passwordError
      ? '🔴'
      : '🟢'
  }

  const getTitle = (): string => {
    return emailError || passwordError ? selectCorrectTextError() : 'Tudo certo'
  }

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
    <div className={Styles.inputWrap}>
      <input
        onChange={handleChange}
        data-testid={inputName}
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
