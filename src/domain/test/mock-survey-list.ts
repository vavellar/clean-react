import { SurveyModel } from "../models"
import faker from 'faker'

export const mockSurveyList = (): SurveyModel[] => ([
  {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answers: [
      { image: faker.internet.url(), answer: faker.random.words(4) },
      { image: faker.internet.url(), answer: faker.random.words(4)}
    ],
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent()
  }
])