import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Input from './Input'
import FormContext from '@/presentation/contexts/form/FormContext'

const makeSut = (): RenderResult => {
    const props = {
        inputType: 'password',
        inputName: 'field',
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
        const sut = makeSut()
        const input = sut.getByTestId('field') as HTMLInputElement
        expect(input.readOnly).toBe(true)
    });

    test('Should not be readOnly if element is focused', () => {
      const sut = makeSut()
      const input = sut.getByTestId('field') as HTMLInputElement
      fireEvent.focus(input)
      expect(input.readOnly).toBe(false)
    })
});