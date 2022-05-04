import { SetStorageSpy } from '@/data/test/mock-storage'
import faker from 'faker'
import { LocalSaveAccessToken } from "./local-save-access-token"



describe('LocalSaveAccessToken', () => {
    test('Should call SetStorage with correct value ', async () => {
        const setStorageSpy = new SetStorageSpy()
        const sut = new LocalSaveAccessToken(setStorageSpy)
        const acessToken = faker.datatype.uuid()
        await sut.save(acessToken)
        expect(setStorageSpy.key).toBe('accessToken')
        expect(setStorageSpy.value).toBe(acessToken)
    });
});