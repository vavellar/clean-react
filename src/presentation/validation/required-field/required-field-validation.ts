import { FieldValidation } from "@/presentation/validation/protocols/field-validation"
import { RequiredFieldError } from '@/presentation/validation/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error {
    return new RequiredFieldError()
  }
}