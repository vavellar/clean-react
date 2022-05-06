import React, { useState, useEffect } from 'react'
import Styles from './Login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'


type Props = {
  validation?: Validation
  authentication?: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken
}: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    emailError: '',
    passwordError: ''
  })

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.passwordError || state.emailError) return
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      console.log(error.message)
      setState({ ...state, isLoading: false, errorMessage: error.message })
    }
  }

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          action=""
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
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
          <Link className={Styles.link} data-testid="signup" to="/signup">
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login