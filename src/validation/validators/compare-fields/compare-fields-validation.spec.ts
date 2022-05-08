import { InvalidFieldError } from "@/validation/errors"
import faker from 'faker'
import { CompareFieldsValidation } from "./compare-fields-validation"

const makeSut = (field: string, valueToCompare: string) =>
  new CompareFieldsValidation(field, valueToCompare)

describe('CompareFieldsValidation', () => {
     test('Should return error if compare is invalid', () => {
       const field = faker.database.column()
       const sut = makeSut(field, faker.random.word())
       const error = sut.validate(faker.random.word())
       expect(error).toEqual(new InvalidFieldError(field))
     })

     test('Should return falsy if compare is valid', () => {
       const field = faker.database.column()
       const valueToCompare = faker.random.word()
       const sut = makeSut(field, valueToCompare)
       const error = sut.validate(valueToCompare)
       expect(error).toBeFalsy()
     })
});