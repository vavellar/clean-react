import { HttpPostClientSpy } from "@/data/test"
import { AccountModel } from "@/domain/models"
import { AddAccount, AddAccountParams } from "@/domain/usecases"

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy<
      AddAccountParams,
      AccountModel
    >
  ) {}
  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return
  }
}
