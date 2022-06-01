import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http"
import axios, { AxiosResponse } from 'axios'

// design pattern adapter, adpting two differents interfaces, our system is not axios dependent
export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}