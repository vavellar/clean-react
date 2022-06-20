import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './PrivateRoute'
import faker from 'faker'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (accessToken = null ): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router location={history.location} navigator={history}>
        <PrivateRoute accessToken={accessToken}/>
      </Router>
    )
    return { history }
}

describe('PrivateRoute - Component', () => {
  test('Should redirect to /login if token is empty', () => {
      const { history } = makeSut()
      expect(history.location.pathname).toBe('/login')
  })
})
