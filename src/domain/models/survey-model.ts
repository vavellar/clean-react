export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswers[]
  date: Date
  didAnswer: boolean
}

export type SurveyAnswers = {
  image?: string
  answer: string
}