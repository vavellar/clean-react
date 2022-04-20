import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/Spinner/Spinner'
import Logo from '@/presentation/components/Logo/Logo'

const Login: React.FC = () => {
    return (
      <div className={Styles.login}>
        <header className={Styles.header}>
            <Logo/>
            <h1>4Dev - Enquetes para Programadores</h1>
        </header>
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
        <footer className={Styles.footer} />
      </div>
    )
}

export default Login