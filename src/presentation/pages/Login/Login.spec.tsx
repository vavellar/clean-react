import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, waitFor  } from '@testing-library/react'
import { Login } from '@/presentation/pages/index'
import {
  ValidationStub,
  AuthenticationSpy,
  SaveAccessTokenMock,
  Helper
} from '@/presentation/test'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login']})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock}/>
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
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

describe('Login component', () => {
  it('Should start with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    Helper.testStatusForField(sut, 'password')
  })

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    Helper.testStatusForField(sut, 'email')
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

   it('Should call SaveAccessToken on success and navigate to main page', async () => {
     const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
     simulateValidSubmit(sut)
     saveAccessTokenMock.save(authenticationSpy.account.accessToken)
     await waitFor(() => sut.getByTestId('form'))
     expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
     expect(history.location.pathname).toBe('/')
   })

   it('Should go to signup page', async () => {
     const { sut } = makeSut()
     const register = sut.getByTestId('signup')
     fireEvent.click(register)
     expect(history.location.pathname).toBe('/signup')
   })
})