import 'jest-localstorage-mock'
import faker from 'faker'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('Should call localStorage with correct values', () => {
        const sut = makeSut()
        const key = faker.database.column()
        const value = faker.random.word()
        sut.set(key, value)
        expect(localStorage.setItem).toHaveBeenLastCalledWith(key, value)
    });
});