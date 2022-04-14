import { HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http"
import axios from 'axios'

// design pattern adapter, adpting two differents interfaces, our system is not axios dependent
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpPostReponse = await axios.post(params.url, params.body)
    return {
        statusCode: httpPostReponse.status,
        body: httpPostReponse.data
    }
  }
}