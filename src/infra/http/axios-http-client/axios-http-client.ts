import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http"
import axios, { AxiosResponse } from 'axios'

// design pattern adapter, adpting two differents interfaces, our system is not axios dependent
export class AxiosHttpClient implements HttpPostClient, HttpGetClient {

  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse
    try {
      axiosResponse = await axios.get(params.url)
    } catch(error) {
      axiosResponse = error.response
    }
    
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}