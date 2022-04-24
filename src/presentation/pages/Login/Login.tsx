import React, { useState, useEffect } from 'react'
import Styles from './Login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'


type Props = {
  validation?: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [ state, setState ] = useState({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    emailError: '',
    passwordError: 'Campo obrigatório'
  })

  useEffect(() => {
    if(validation) {
      setState({
        ...state,
        emailError: validation.validate('email', state.email)
      })
    }
  }, [state.email])

  useEffect(() => {
    if(validation) {
      setState({
        ...state,
        passwordError: validation.validate('password', state.password)
      })
    }
  }, [state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>
          <Input
            testID="email-status"
            inputType="email"
            inputName="email"
            placeHolder="Digite seu e-mail"
          />
          <Input
            testID="password-status"
            inputType="password"
            inputName="password"
            placeHolder="Digite sua senha"
          />
          <button
            data-testid="submit"
            type="submit"
            className={Styles.submit}
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login