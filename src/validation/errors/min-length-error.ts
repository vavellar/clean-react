export class MinLegthValidationError extends Error {
  constructor() {
    super('Quantidade de caracteres insuficiente')
    this.name = 'MinLegthValidationError'
  }
}
