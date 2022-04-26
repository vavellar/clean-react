import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, waitFor  } from '@testing-library/react'
import Login from './Login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import faker from 'faker'
import 'jest-localstorage-mock'
import { InvalidCredentialsError } from '@/domain/erros'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login']})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
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
  beforeEach(() => {
    localStorage.clear()
  })
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

  it('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  //  it('Should present error if Authentication fails', async () => {
  //    const { sut, authenticationSpy } = makeSut()
  //    const error = new InvalidCredentialsError()
  //    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
  //    simulateValidSubmit(sut)
  //    const errorWrap = sut.getByTestId('error-wrap')
  //    await waitFor(() => errorWrap)
  //    const errorMessage = sut.getByTestId('error-message')
  //    expect(errorMessage.textContent).toBe(error.message)
  //    expect(errorWrap.childElementCount).toBe(1)
  //  })

   it('Should add accessToken to localStorage on success and navigate to main page', async () => {
     const { sut, authenticationSpy } = makeSut()
     simulateValidSubmit(sut)
     await waitFor(() => sut.getByTestId('form'))
    //  expect(localStorage.setItem).toHaveBeenCalledWith(
    //    'accessToken',
    //    authenticationSpy.account.accessToken
    //   )
      expect(history.location.pathname).toBe('/')
   })

   it('Should go to signup page', async () => {
     const { sut } = makeSut()
     const register = sut.getByTestId('signup')
     fireEvent.click(register)
     expect(history.location.pathname).toBe('/signup')
   })
})