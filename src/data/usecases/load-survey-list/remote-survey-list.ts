import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http"
import { UnexpectedError } from "@/domain/errors"

export class RemoteSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}
  async loadAll(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success:
        break
      default:
        throw new UnexpectedError()
    }
  }
}