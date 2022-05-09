import React from 'react'
import { render, RenderResult } from "@testing-library/react"
import Signup from "./Signup"
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'


type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/login']})


const makeSut = (): SutTypes => {
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Signup/>
    </Router>
  )
  return {
    sut,
  }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
    const element = sut.getByTestId(fieldName)
    expect(element.childElementCount).toBe(count)
}

const testButtoIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean) => {
    const button =sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const field = sut.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || 'Tudo certo')
  expect(field.textContent).toBe(validationError ? '🔴' : '🟢')
}


describe('SignUp component', () => {
  it('Should start with inital state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo Obrigatório'
    testChildCount(sut, 'error-wrap', 0)
    testButtoIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
