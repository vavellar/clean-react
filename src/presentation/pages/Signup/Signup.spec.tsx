import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react"
import Signup from "./Signup"
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
  Helper,
  ValidationStub,
  AddAccountSpy,
} from '@/presentation/test'
import faker from 'faker'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup']})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Signup validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const submitButton = screen.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

describe('SignUp component', () => {
  it('Should start with inital state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
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

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  it('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('Should the submit button be able if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  it('Should show spinner on submit', () => {
    makeSut()
    simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('Should call AddAccount with correct values', () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('Should call AddAccount only once', () => {
    const { addAccountSpy } = makeSut()
    simulateValidSubmit()
    simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    Helper.populateField('email')
    fireEvent.submit(screen.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

    // it('Should call SaveAccessToken on success and navigate to main page', async () => {
    //   const { addAccountSpy, updateCurrentAccount } = makeSut()
    //   simulateValidSubmit(sut)
    //   updateCurrentAccount.save(addAccountSpy.account)
    //   await waitFor(() => sut.getByTestId('form'))
    //   expect(updateCurrentAccount.account).toBe(
    //     addAccountSpy.account
    //   )
    //   expect(history.location.pathname).toBe('/')
    // })

    it('Should go to login page', async () => {
      makeSut()
      const loginLink = screen.getByTestId('login-link')
      fireEvent.click(loginLink)
      expect(history.location.pathname).toBe('/login')
    })

})
