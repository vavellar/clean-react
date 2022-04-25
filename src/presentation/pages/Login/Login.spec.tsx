import React from 'react'
import { render, RenderResult, fireEvent,  } from '@testing-library/react'
import Login from './Login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}


const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return {
    sut,
    authenticationSpy
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const populateEmailField = (sut: RenderResult,email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, {
    target: { value: email }
  })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {
    target: { value: password }
  })
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const field = sut.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || 'Tudo certo')
  expect(field.textContent).toBe(validationError ? '🔴' : '🟢')
}



describe('Login component', () => {

    it('Should start with inital state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        simulateStatusForField(sut, 'email', validationError)
        simulateStatusForField(sut, 'password', validationError)
    })


    it('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        simulateStatusForField(sut, 'email', validationError)
    })

     it('Should show password error if Validation fails', () => {
       const validationError = faker.random.words()
       const { sut } = makeSut({ validationError })
       populatePasswordField(sut)
       simulateStatusForField(sut, 'password', validationError)
     })

     it('Should show valid password state if Validation succeeds', () => {
       const { sut } = makeSut()
       populatePasswordField(sut)
       simulateStatusForField(sut, 'password')
     })

     it('Should show valid email state if Validation succeeds', () => {
       const { sut } = makeSut()
       populateEmailField(sut)
       simulateStatusForField(sut, 'email')
     })

     it('Should the submit button be able if form is valid', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
     })

     it('Should show spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
     })

     it('Should call Authentication with correct values', () => {
      const { sut, authenticationSpy } = makeSut()
      const email = faker.internet.email()
      const password = faker.internet.password()
      simulateValidSubmit(sut, email, password)
      expect(authenticationSpy.params).toEqual({
        email,
        password
       })
     })
})