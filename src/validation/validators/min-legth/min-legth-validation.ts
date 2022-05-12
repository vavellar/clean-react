import { MinLegthValidationError } from "@/validation/errors"
import { FieldValidation } from "@/validation/protocols/field-validation"

export class MinLegthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}
  validate(input: object): Error {
    return input[this.field]?.length < this.minLength ? new MinLegthValidationError() : null 
  }
}