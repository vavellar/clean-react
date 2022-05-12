import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(input: object): Error {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return (!input[this.field] || emailRegex.test(input[this.field]))
      ? null
      : new InvalidFieldError('Email')
  }
}