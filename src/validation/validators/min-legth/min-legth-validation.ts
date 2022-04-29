import { MinLegthValidationError } from "@/validation/errors"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class MinLegthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}
  validate(value: string): Error {
    return new MinLegthValidationError()
  }
}