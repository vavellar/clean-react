import { FieldValidation } from "@/validation/protocols/field-validation"
import { FieldValidationSpy } from "../test/mock-field-validation"
import { ValidationComposite } from "./validation-composite"

const generateFieldValidation = () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    return { 
        fieldValidationSpy, 
        fieldValidationSpy2
    }
}

const makeSut = (validators: FieldValidation[]) => new ValidationComposite(validators)

describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const { fieldValidationSpy, fieldValidationSpy2 } =
          generateFieldValidation()
        fieldValidationSpy2.error = new Error('any_message')
        const sut = makeSut([fieldValidationSpy, fieldValidationSpy2])
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe('any_message')
    })

    test('Should return the first error', () => {
      const { fieldValidationSpy, fieldValidationSpy2 } =
        generateFieldValidation()
      fieldValidationSpy.error = new Error('first_error_message')
      fieldValidationSpy2.error = new Error('second_error_message')
      const sut = makeSut([fieldValidationSpy, fieldValidationSpy2])

      const error = sut.validate('any_field', 'any_value')
      expect(error).toBe('first_error_message')
    })
})