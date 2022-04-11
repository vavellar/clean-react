// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpPostClient } from 'data/protocols/http/http-post-client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthenticationParams } from 'domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
