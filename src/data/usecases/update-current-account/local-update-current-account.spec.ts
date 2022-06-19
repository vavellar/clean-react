import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'
import { LocalUpdateCurrentAccount } from "./local-update-current-account"

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalUpdateCurrentAccount(setStorageMock)
    return {
      sut,
      setStorageMock
    }
}

describe('LocalUpdateCurrentAccount', () => {
    test('Should call SetStorage with correct value ', async () => {
        const { sut, setStorageMock } = makeSut()
        const account = {
          accessToken: faker.datatype.uuid(),
          name: faker.name.findName()
        }
        await sut.save(account)
        expect(setStorageMock.key).toBe('currentAccount')
        expect(setStorageMock.value).toEqual(JSON.stringify(account))
    });

    test('Should throw if SetStorage throws', async () => {
      const { sut, setStorageMock } = makeSut()
      jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error()})
      const promise = sut.save({
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      })
      await expect(promise).rejects.toThrow(new Error())
    })

    test('Should throw if accessToken is false', async () => {
      const { sut } = makeSut()
      const promise = sut.save(undefined)
      await expect(promise).rejects.toThrow(new UnexpectedError())
    })
});