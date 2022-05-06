import React from "react"
import { makeLoginValidation } from "./login-validation-factory"
import {
  makeRemoteAuthentication,
  makeLocalSaveAccessToken
} from '@/main/factories/usecases'
import { Login } from '@/presentation/pages'

export const makeLogin: React.FC = () => {
    return (
      <Login
        authentication={makeRemoteAuthentication()}
        validation={makeLoginValidation()}
        saveAccessToken={makeLocalSaveAccessToken()}
      />
    )
}