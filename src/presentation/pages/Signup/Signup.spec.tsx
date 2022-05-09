import React from 'react'
import { fireEvent, render, RenderResult } from "@testing-library/react"
import Signup from "./Signup"
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Helper, ValidationStub } from '@/presentation/test'
import faker from 'faker'
import { ValidationComposite } from '@/validation/validators'


type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login']})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Signup validation={validationStub} />
    </Router>
  )
  return {
    sut,
  }
}

describe('SignUp component', () => {
  it('Should start with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

   it('Should show name error if Validation fails', () => {
     const validationError = faker.random.words()
     const { sut } = makeSut({ validationError })
     Helper.populateField(sut, 'name')
     Helper.testStatusForField(sut, 'name', validationError)
   })

   it('Should show email error if Validation fails', () => {
     const validationError = faker.random.words()
     const { sut } = makeSut({ validationError })
     Helper.populateField(sut, 'email')
     Helper.testStatusForField(sut, 'email', validationError)
   })
})
