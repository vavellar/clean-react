import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker'
import { LocalSaveAccessToken } from "./local-save-access-token"

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalSaveAccessToken(setStorageMock)
    return {
      sut,
      setStorageMock
    }
}

describe('LocalSaveAccessToken', () => {
    test('Should call SetStorage with correct value ', async () => {
        const { sut, setStorageMock } = makeSut()
        const acessToken = faker.datatype.uuid()
        await sut.save(acessToken)
        expect(setStorageMock.key).toBe('accessToken')
        expect(setStorageMock.value).toBe(acessToken)
    });

    test('Should throw if SetStorage throws', async () => {
      const { sut, setStorageMock } = makeSut()
      jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
      const promise =  sut.save(faker.datatype.uuid())
      await expect(promise).rejects.toThrow(new Error())
    })

    test('Should throw if accessToken is false', async () => {
      const { sut } = makeSut()
      const promise = sut.save(undefined)
      await expect(promise).rejects.toThrow(new UnexpectedError())
    })
});