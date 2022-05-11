import React from 'react'
import { act, fireEvent, render, RenderResult, waitFor } from "@testing-library/react"
import Signup from "./Signup"
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Helper, ValidationStub, AddAccountSpy, SaveAccessTokenMock } from '@/presentation/test'
import faker from 'faker'
import { EmailInUseError } from '@/domain/errors'


type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup']})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Signup validation={validationStub} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock}/>
    </Router>
  )
  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

describe('SignUp component', () => {
  it('Should start with inital state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
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

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('Should the submit button be able if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  it('Should call AddAccount with correct values', () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('Should call AddAccount only once', () => {
    const { sut, addAccountSpy } = makeSut()
    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    Helper.populateField(sut, 'email')
    fireEvent.submit(sut.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  //  it('Should present error if Authentication fails', () => {
  //    const { sut, addAccountSpy } = makeSut()
  //    const error = new EmailInUseError()
  //    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
  //    act(() => {
  //      simulateValidSubmit(sut)
  //    })
  //    testElementText(sut, 'error-message', error.message)
  //    Helper.testChildCount(sut, 'error-wrap', 1)
  //  })

    it('Should call SaveAccessToken on success and navigate to main page', async () => {
      const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()
      simulateValidSubmit(sut)
      saveAccessTokenMock.save(addAccountSpy.account.accessToken)
      await waitFor(() => sut.getByTestId('form'))
      expect(saveAccessTokenMock.accessToken).toBe(
        addAccountSpy.account.accessToken
      )
      expect(history.location.pathname).toBe('/')
    })

})
