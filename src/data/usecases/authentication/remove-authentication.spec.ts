// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authetication'

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL ', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string
      async post (url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }
    const httpPostClientSpy = new HttpPostClientSpy()
    const url = 'any_url'
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
