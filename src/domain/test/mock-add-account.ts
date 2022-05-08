import faker from "faker"
import { AddAccountParams } from "../usecases"

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
