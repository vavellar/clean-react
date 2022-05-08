export enum HttpStatusCode {
  unauthorized = 401,
  badRequest = 400,
  noContent = 204,
  success = 200,
  serverError =  500,
  notFound = 404,
  forbidden = 403
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}