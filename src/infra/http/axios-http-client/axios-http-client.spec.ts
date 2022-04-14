import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(mockAxiosResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
})
describe('AxiosHttpClient', () => {
    test('Should call axios with correct body, url and verb', async () => {  
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenLastCalledWith(request.url, request.body)
    })

    test('Should return the correct statusCode and body', async () => {
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
            expect(httpResponse).toEqual({
              statusCode: mockAxiosResult.status,
              body: mockAxiosResult.data
            })
    })
});