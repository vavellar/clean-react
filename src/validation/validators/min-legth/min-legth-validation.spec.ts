import { MinLegthValidationError } from "@/validation/errors"
import { MinLegthValidation } from "./min-legth-validation"
import faker from 'faker'

const makeSut = (): MinLegthValidation => new MinLegthValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
    test('Should return error if length is less than 5', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.alphaNumeric(4))
        expect(error).toEqual(new MinLegthValidationError())
    });

    test('Should return falsy if length is bigger than 5', () => {
      const sut = makeSut()
      const error = sut.validate(faker.random.alphaNumeric(5))
      expect(error).toBeFalsy()
    })
});