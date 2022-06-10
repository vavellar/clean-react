import React from "react"
import { makeLoginValidation } from "./login-validation-factory"
import {
  makeRemoteAuthentication,
  makeLocalUpdateCurrentAccount
} from '@/main/factories/usecases'
import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
    return (
      <Login
        authentication={makeRemoteAuthentication()}
        validation={makeLoginValidation()}
        updateCurrentAccount={makeLocalUpdateCurrentAccount()}
      />
    )
}