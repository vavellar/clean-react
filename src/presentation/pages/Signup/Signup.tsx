import React, { useEffect, useState } from 'react'
import Styles from './Signup-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Link } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation?: Validation
}

const Signup: React.FC<Props> = ({ validation}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    errorMessage: '',
    passwordError: 'Campo obrigatório',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório'
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
    })
  }, [state.name])
  
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form action="" className={Styles.form}>
          <h2>Criar conta</h2>
          <Input
            inputType="text"
            inputName="name"
            placeHolder="Digite seu nome"
            testID="name-status"
          />
          <Input
            inputType="email"
            inputName="email"
            placeHolder="Digite seu e-mail"
            testID="email-status"
          />
          <Input
            inputType="password"
            inputName="password"
            placeHolder="Digite sua senha"
            testID="password-status"
          />
          <Input
            inputType="password"
            inputName="passwordConfirmation"
            placeHolder="Confirme sua senha"
            testID="passwordConfirmation-status"
          />
          <button
            data-testid="submit"
            className={Styles.submit}
            disabled={true}
          >
            Criar conta
          </button>
          <Link className={Styles.link} to="/login">
            Voltar para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Signup
