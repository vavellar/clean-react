import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'
import LoginHeader from '@/presentation/components/LoginHeader/LoginHeader'
import Footer from '@/presentation/components/Footer/Footer'

const Login: React.FC = () => {
    return (
      <div className={Styles.login}>
        <LoginHeader/>
        <form action="" className={Styles.form}>
          <h2>Login</h2>
          <div className={Styles.inputWrap}>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Digite seu email"
            />
            <span className={Styles.status}>🔴</span>
          </div>
          <div className={Styles.inputWrap}>
            <input
              type="password"
              name="password"
              id=""
              placeholder="Digite sua senha"
            />
            <span className={Styles.status}>🔴</span>
          </div>
          <button type="submit" className={Styles.submit}>Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <div className={Styles.errorWrap}>
              <Spinner/>
              <span className={Styles.error}>Erro</span>
          </div>
        </form>
        <Footer/>
      </div>
    )
}

export default Login