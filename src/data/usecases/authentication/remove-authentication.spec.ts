import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authetication'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL ', async () => {
    const httpPostClientSpy = new HttpPostClientSpy()
    const url = 'any_url'
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
