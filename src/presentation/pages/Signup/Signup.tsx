import React from 'react'
import Styles from './Signup-styles.scss'
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/FormContext'
import { Link } from 'react-router-dom'

const Signup: React.FC= () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <FormContext.Provider value={{ state: {} }}>
        <form action="" className={Styles.form}>
          <h2>Criar conta</h2>
          <Input
            inputType="text"
            inputName="name"
            placeHolder="Digite seu nome"
          />
          <Input
            inputType="email"
            inputName="email"
            placeHolder="Digite seu e-mail"
          />
          <Input
            inputType="password"
            inputName="password"
            placeHolder="Digite sua senha"
          />
          <Input
            inputType="password"
            inputName="passwordConfirmation"
            placeHolder="Confirme sua senha"
          />
          <button data-testid="submit" className={Styles.submit}>
            Entrar
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
