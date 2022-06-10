import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, waitFor  } from '@testing-library/react'
import { Login } from '@/presentation/pages/index'
import {
  ValidationStub,
  AuthenticationSpy,
  UpdateCurrentAccountMock,
  Helper
} from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  updateCurrentAccount: UpdateCurrentAccountMock
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login']})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const updateCurrentAccount = new UpdateCurrentAccountMock()
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccount}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    updateCurrentAccount
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
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
    Helper.populateField(sut,'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('Should the submit button be able if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
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
    Helper.populateField(sut, 'email')
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

  //  it('Should call SaveAccessToken on success and navigate to main page', async () => {
  //    const { sut, authenticationSpy, updateCurrentAccount } = makeSut()
  //    simulateValidSubmit(sut)
  //    updateCurrentAccount.save(updateCurrentAccount.account)
  //    await waitFor(() => sut.getByTestId('form'))
  //    expect(updateCurrentAccount).toEqual(
  //      authenticationSpy.account
  //    )
  //    expect(history.location.pathname).toBe('/')
  //  })

   it('Should go to signup page', async () => {
     const { sut } = makeSut()
     const register = sut.getByTestId('signup')
     fireEvent.click(register)
     expect(history.location.pathname).toBe('/signup')
   })
})