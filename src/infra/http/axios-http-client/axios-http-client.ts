import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http"
import axios, { AxiosResponse } from 'axios'

// design pattern adapter, adpting two differents interfaces, our system is not axios dependent
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
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