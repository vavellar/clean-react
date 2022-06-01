import { HttpGetClientSpy } from "@/data/test"
import { RemoteSurveyList } from "./remote-survey-list"
import faker from "faker"

describe('RemoteLoadSurveyList', () => {
    test('Should call HttpGetClient with correct url', async () => {
        const url = faker.internet.url()
        const httpGetClientSpy = new HttpGetClientSpy()
        const sut = new RemoteSurveyList(url, httpGetClientSpy)
        await sut.loadAll()
        expect(httpGetClientSpy.url).toBe(url)
    });
});