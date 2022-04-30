import { FieldValidation } from "@/validation/protocols/field-validation"
import { FieldValidationSpy } from "../test/mock-field-validation"
import { ValidationComposite } from "./validation-composite"
import faker from 'faker'

type SutTypes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const field = faker.database.column()
        const { sut, fieldValidationsSpy } = makeSut(field)
        const errorMessage = faker.random.words()
        fieldValidationsSpy[0].error = new Error(errorMessage)
        const error = sut.validate(field, 'any_value')
        expect(error).toBe(errorMessage)
    })

    test('Should return the first error', () => {
      const field = faker.database.column()

      const { sut, fieldValidationsSpy } = makeSut(field)

      const errorMessage1 = faker.random.words() 
      fieldValidationsSpy[0].error = new Error(errorMessage1)
      fieldValidationsSpy[1].error = new Error(faker.random.words())

      const error = sut.validate(field, 'any_value')
      expect(error).toBe(errorMessage1)
    })

    test('Should not return error if has not error on any validator', () => {
      const field = faker.database.column()
      const { sut } = makeSut(field)
      const error = sut.validate(field, faker.random.word())
      expect(error).toBeFalsy()
    })
})