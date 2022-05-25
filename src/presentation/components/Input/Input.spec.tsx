import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input from './Input'
import FormContext from '@/presentation/contexts/form/FormContext'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
    const props = {
      inputType: 'fieldName',
      inputName: fieldName,
      placeHolder: 'Digite sua senha',
      testID: 'password'
    }
    return render(
      <FormContext.Provider value={{ state: {}}}>
        <Input {...props} />
      </FormContext.Provider>
    )
}

describe('Input - Component', () => {
    test('Should begin with readonly', () => {
        const field = faker.database.column()
        const sut = makeSut(field)
        const input = sut.getByTestId(field) as HTMLInputElement
        expect(input.readOnly).toBe(true)
    });

    test('Should not be readOnly if element is focused', () => {
      const field = faker.database.column()
      const sut = makeSut(field)
      const input = sut.getByTestId(field) as HTMLInputElement
      fireEvent.focus(input)
      expect(input.readOnly).toBe(false)
    })

     test('Should focus input on label click', () => {
       const field = faker.database.column()
       const sut = makeSut(field)
       const input = sut.getByTestId(field)
       const label = sut.getByTestId(`${field}-label`)
       fireEvent.click(label)
       expect(document.activeElement).toBe(input)
     })
});