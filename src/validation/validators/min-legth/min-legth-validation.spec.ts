import { MinLegthValidationError } from "@/validation/errors"
import { MinLegthValidation } from "./min-legth-validation"
import faker from 'faker'

const makeSut = (field: string): MinLegthValidation =>
  new MinLegthValidation(field, 5)

describe('MinLengthValidation', () => {
    test('Should return error if length is less than 5', () => {
      const field = faker.database.column()
      const sut = makeSut(field)
      const error = sut.validate({ [field]: faker.random.alphaNumeric(4)})
      expect(error).toEqual(new MinLegthValidationError())
    });

    test('Should return falsy if length is bigger than 5', () => {
      const field = faker.database.column()
      const sut = makeSut(field)
      const error = sut.validate({ [field]: faker.random.alphaNumeric(5)})
      expect(error).toBeFalsy()
    })

    test('Should return falsy if field does not exists in schema', () => {
      const sut = makeSut(faker.database.column())
      const error = sut.validate({
        [faker.database.column()]: faker.random.alphaNumeric(5)
      })
      expect(error).toBeFalsy()
    })
});