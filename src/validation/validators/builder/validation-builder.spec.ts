import {
  RequiredFieldValidation,
  EmailValidation,
  MinLegthValidation,
  CompareFieldsValidation
} from '@/validation/validators'
import { ValidationBuilder as sut } from "./validation-builder"
import faker from 'faker'

describe('ValidationBuilder', () => {
    test('Should return RequiredFieldValidation ', () => {
        const field = faker.database.column()
        const validations = sut.field(field).required().build()
        expect(validations).toEqual([new RequiredFieldValidation(field)])
    });

    test('Should return EmailValidation ', () => {
      const field = faker.database.column()

      const validations = sut.field(field).email().build()
      expect(validations).toEqual([new EmailValidation(field)])
    })

    test('Should return CompareFieldsValidation ', () => {
      const field = faker.database.column()
      const fieldToCompare = faker.database.column()
      const validations = sut.field(field).sameAs(fieldToCompare).build()
      expect(validations).toEqual([
        new CompareFieldsValidation(field, fieldToCompare)
      ])
    })

    test('Should return MinLengthValidation ', () => {
      const field = faker.database.column()
      const length = faker.datatype.number()
      const validations = sut.field(field).min(length).build()
      expect(validations).toEqual([new MinLegthValidation(field, length)])
    })

    test('Should return a list of validations ', () => {
      const field = faker.database.column()
      const validations = sut.field(field).required().min(5).email().build()
      expect(validations).toEqual([
          new RequiredFieldValidation(field),
          new MinLegthValidation(field, 5),
          new EmailValidation(field)
        ])
    })
});