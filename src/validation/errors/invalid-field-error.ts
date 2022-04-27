export class InvalidFieldError extends Error {
  constructor(fieldLabel: string) {
    super(`O campo ${fieldLabel} é inválido`)
    this.name = 'InvalidFieldError'
  }
}