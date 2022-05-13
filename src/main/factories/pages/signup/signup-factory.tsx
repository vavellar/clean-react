import React from 'react'
import { makeSignupValidation } from './signup-validation-factory'
import {
  makeRemoteAddAccount,
  makeLocalSaveAccessToken
} from '@/main/factories/usecases'
import { Signup } from '@/presentation/pages'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
