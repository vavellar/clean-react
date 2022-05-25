const baseUrl = Cypress.config().baseUrl

export const testInputStatus = (field: string, error?: string): void => {
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(`${field}-wrap`).should(
    'have.attr',
    'data-status',
    error ? 'invalid' : 'valid'
  )
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
}

export const testErrorMessage = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('error-message').should('contain.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path): void => {
  cy.url().should('equal', `${baseUrl}${path}`)
}
