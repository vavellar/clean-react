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

describe('Login component', () => {

    it('Should start with inital state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const errorWrap = sut.getByTestId('error-wrap')
        expect(errorWrap.childElementCount).toBe(0)
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(true)
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')
        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe(validationError)
        expect(passwordStatus.textContent).toBe('🔴')
    })


    it('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, { target: { value: faker.internet.email()} })
        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe(validationError)
        expect(emailStatus.textContent).toBe('🔴')
    })

     it('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
       const { sut } = makeSut({ validationError })
       const passwordInput = sut.getByTestId('password')
       fireEvent.input(passwordInput, {
         target: { value: faker.internet.email() }
       })
       const passwordStatus = sut.getByTestId('password-status')
       expect(passwordStatus.title).toBe(validationError)
       expect(passwordStatus.textContent).toBe('🔴')
     })

     it('Should show valid password state if Validation succeeds', () => {
       const { sut } = makeSut()
       const passwordInput = sut.getByTestId('password')
       fireEvent.input(passwordInput, {
         target: { value: faker.internet.email() }
       })
       const passwordStatus = sut.getByTestId('password-status')
       expect(passwordStatus.title).toBe('Tudo certo')
       expect(passwordStatus.textContent).toBe('🟢')
     })

     it('Should show valid email state if Validation succeeds', () => {
       const { sut } = makeSut()
       const emailInput = sut.getByTestId('email')
       fireEvent.input(emailInput, {
         target: { value: faker.internet.email() }
       })
       const emailStatus = sut.getByTestId('email-status')
       expect(emailStatus.title).toBe('Tudo certo')
       expect(emailStatus.textContent).toBe('🟢')
     })

     it('Should the submit button be able if form is valid', () => {
        const { sut } = makeSut()
        const passwordInput = sut.getByTestId('password')
        fireEvent.input(passwordInput, {
            target: { value: faker.internet.password() }
        })
        const emailInput = sut.getByTestId('email')
        fireEvent.input(emailInput, {
            target: { value: faker.internet.email() }
        })
        const submitButton = sut.getByTestId('submit') as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
     })

     it('Should show spinner on submit', () => {
       const { sut } = makeSut()
       const passwordInput = sut.getByTestId('password')
       fireEvent.input(passwordInput, {
         target: { value: faker.internet.password() }
       })
       const emailInput = sut.getByTestId('email')
       fireEvent.input(emailInput, {
         target: { value: faker.internet.email() }
       })
       const submitButton = sut.getByTestId('submit') as HTMLButtonElement
       fireEvent.click(submitButton)
       const spinner = sut.getByTestId('spinner')
       expect(spinner).toBeTruthy()
     })

     it('Should call Authentication with correct values', () => {
       const { sut, authenticationSpy } = makeSut()
       const passwordInput = sut.getByTestId('password')
       const email = faker.internet.email()
       const password = faker.internet.password()
       fireEvent.input(passwordInput, {
         target: { value: password }
       })
       const emailInput = sut.getByTestId('email')
       fireEvent.input(emailInput, {
         target: { value: email }
       })
       const submitButton = sut.getByTestId('submit') as HTMLButtonElement
       fireEvent.click(submitButton)
       expect(authenticationSpy.params).toEqual({
        email,
        password
       })
     })
})