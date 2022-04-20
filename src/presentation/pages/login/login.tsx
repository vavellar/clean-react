import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'
import LoginHeader from '@/presentation/components/LoginHeader/LoginHeader'
import Footer from '@/presentation/components/Footer/Footer'
import Input from '@/presentation/components/Input/Input'
import FormStatus from '@/presentation/components/FormStatus/FormStatus'

const Login: React.FC = () => {
    return (
      <div className={Styles.login}>
        <LoginHeader />
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
          <button type="submit" className={Styles.submit}>
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
        <Footer />
      </div>
    )
}

export default Login