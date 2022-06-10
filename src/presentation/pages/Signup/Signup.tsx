import React, { useEffect, useState } from 'react'
import Styles from './Signup-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton
} from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Link, useNavigate } from 'react-router-dom'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, UpdateCurrentAccount } from '@/domain/usecases'

type Props = {
  validation?: Validation
  addAccount: AddAccount
  updateCurrentAccount: UpdateCurrentAccount
}

const Signup: React.FC<Props> = ({
  validation,
  addAccount,
  updateCurrentAccount
}: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    )
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState({ ...state, isLoading: true })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await updateCurrentAccount.save(account)
      navigate('/')
    } catch (error) {
      setState({ ...state, isLoading: false, errorMessage: error.message })
    }
  }

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
          <SubmitButton label="Criar conta"/>
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
