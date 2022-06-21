import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages/index'
import { ApiContext } from '@/presentation/contexts'
import {
  ValidationStub,
  AuthenticationSpy,
  Helper
} from '@/presentation/test'
import faker from 'faker'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login']})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const submitButton = screen.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

describe('Login component', () => {
  it('Should start with inital state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('Should the submit button be able if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('Should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('Should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  //  it('Should call SaveAccessToken on success and navigate to main page', async () => {
  //    const { authenticationSpy, updateCurrentAccount } = makeSut()
  //    simulateValidSubmit(sut)
  //    updateCurrentAccount.save(updateCurrentAccount.account)
  //    await waitFor(() => sut.getByTestId('form'))
  //    expect(updateCurrentAccount).toEqual(
  //      authenticationSpy.account
  //    )
  //    expect(history.location.pathname).toBe('/')
  //  })

   it('Should go to signup page', async () => {
     makeSut()
     const register = screen.getByTestId('signup')
     fireEvent.click(register)
     expect(history.location.pathname).toBe('/signup')
   })
})