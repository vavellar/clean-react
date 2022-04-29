import { FieldValidation } from "@/validation/protocols/field-validation"
import { FieldValidationSpy } from "../test/mock-field-validation"
import { ValidationComposite } from "./validation-composite"
import faker from 'faker'

type SutTypes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const { sut, fieldValidationsSpy } = makeSut()
        const errorMessage = faker.random.words()
        fieldValidationsSpy[0].error = new Error(errorMessage)
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe(errorMessage)
    })

    test('Should return the first error', () => {
      const { sut, fieldValidationsSpy } = makeSut()

      const errorMessage1 = faker.random.words() 
      fieldValidationsSpy[0].error = new Error(errorMessage1)
      fieldValidationsSpy[1].error = new Error(faker.random.words())

      const error = sut.validate('any_field', 'any_value')
      expect(error).toBe(errorMessage1)
    })
})