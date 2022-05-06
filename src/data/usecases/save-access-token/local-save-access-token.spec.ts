import { SetStorageMock } from '@/data/test/mock-storage'
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
});