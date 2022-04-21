import React, { useState } from 'react'
import Styles from './Login-styles.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/formContext'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [ state ] = useState < StateProps>({
    isLoading: false,
    errorMessage: ''
  })
    return (
      <div className={Styles.login}>
        <LoginHeader />
        <FormContext.Provider value={state}>
          <form action="" className={Styles.form}>
            <h2>Login</h2>
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
            <button data-testid="submit" type="submit" className={Styles.submit} disabled>
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