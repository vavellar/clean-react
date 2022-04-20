import React from 'react'
import Styles from './Input-styles.scss'

type InputProps ={
  inputType: string
  inputName: string
  placeHolder: string
}

const Input: React.FC<InputProps> = ({ inputType, inputName, placeHolder }) => {

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void=> {
    event.target.readOnly =false 
  }
  return (
    <div className={Styles.inputWrap}>
      <input
        readOnly
        onFocus={enableInput}
        type={inputType}
        name={inputName}
        id=""
        placeholder={placeHolder}
      />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Input
