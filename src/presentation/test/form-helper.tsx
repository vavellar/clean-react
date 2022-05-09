import { fireEvent, RenderResult } from "@testing-library/react"
import faker from "faker"

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
) => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (sut: RenderResult,fieldName: string,value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, {
    target: { value: value }
  })
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const field = sut.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || 'Tudo certo')
  expect(field.textContent).toBe(validationError ? '🔴' : '🟢')
}
