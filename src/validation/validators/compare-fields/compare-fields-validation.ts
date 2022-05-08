import { InvalidFieldError } from "@/validation/errors"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field, private readonly valueToCompare: string) {}
  validate(value: string): Error {
    return new InvalidFieldError(this.field)
  }
}
