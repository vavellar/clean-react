import React, { useState, useEffect } from 'react'
import Styles from './Login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/formContext'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'


type Props = {
  validation?: Validation
  authentication?: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [ state, setState ] = useState({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    emailError: '',
    passwordError: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const { isLoading, passwordError, emailError } = state
    try {
      if (isLoading || passwordError || emailError) return
      setState({...state, isLoading: true})
      await authentication.auth({
        email: state.email,
        password: state.password
      })
    } catch(error){
      setState({...state, isLoading: false, errorMessage: error.message})
    }
  }

  useEffect(() => {
    if (validation) {
      setState({
        ...state,
        emailError: validation.validate('email', state.email),
        passwordError: validation.validate('password', state.password)
      })
    }
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form action="" className={Styles.form} onSubmit={handleSubmit} data-testid="form">
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
            disabled={!!state.emailError || !!state.passwordError}
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