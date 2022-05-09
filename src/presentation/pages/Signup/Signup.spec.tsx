import React from 'react'
import { render, RenderResult } from "@testing-library/react"
import Signup from "./Signup"
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Helper } from '@/presentation/test'


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

describe('SignUp component', () => {
  it('Should start with inital state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo Obrigatório'
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
