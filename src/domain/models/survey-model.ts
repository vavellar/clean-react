export type SurveyModel = {
    id: string
    question: string
    ansewers: [{
        image?: string
        answer: string
    }]
    date: Date
    didAnswer: boolean
}