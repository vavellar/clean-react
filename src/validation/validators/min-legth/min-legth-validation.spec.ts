import { MinLegthValidationError } from "@/validation/errors"
import { MinLegthValidation } from "./min-legth-validation"

describe('MinLengthValidation', () => {
    test('Should return error if length is less than 5', () => {
        const sut = new MinLegthValidation('email', 5)
        const error = sut.validate('123')
        expect(error).toEqual(new MinLegthValidationError())
    });

    test('Should return falsy if length is bigger than 5', () => {
      const sut = new MinLegthValidation('email', 5)
      const error = sut.validate('12345')
      expect(error).toBeFalsy()
    })
});