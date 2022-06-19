import React from 'react'
import { makeSignupValidation } from './signup-validation-factory'
import {
  makeRemoteAddAccount,
  makeLocalUpdateCurrentAccount
} from '@/main/factories/usecases'
import { Signup } from '@/presentation/pages'

export const MakeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
