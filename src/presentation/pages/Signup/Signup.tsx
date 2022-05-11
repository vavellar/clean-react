import React, { useEffect, useState } from 'react'
import Styles from './Signup-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Link, useNavigate } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation?: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken
}: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errorMessage: '',
    passwordError: '',
    nameError: '',
    emailError: '',
    passwordConfirmationError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      )
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (
        state.isLoading ||
        state.nameError ||
        state.emailError ||
        state.passwordError ||
        state.passwordConfirmationError
      )
        return
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      navigate('/')
    } catch (error) {
      setState({ ...state, isLoading: false, errorMessage: error.message })
    }
  }

  const { emailError, nameError, passwordConfirmationError, passwordError } =
    state
  const buttonIsDisabled =
    !!emailError ||
    !!nameError ||
    !!passwordConfirmationError ||
    !!passwordError

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          action=""
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
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
            disabled={buttonIsDisabled}
          >
            Criar conta
          </button>
          <Link className={Styles.link} to="/login" data-testid="login-link">
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
