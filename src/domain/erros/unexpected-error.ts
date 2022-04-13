export class UnexpectedError extends Error {
  constructor() {
    super('Erro inesperado, tente novamente')
    this.name = 'UnexpectedError'
  }
}
