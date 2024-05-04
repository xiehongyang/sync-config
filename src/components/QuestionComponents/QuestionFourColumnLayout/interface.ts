


export type QuestionFourColumnPropsType = {
    name?: string
    category?: number
    onChange?: (newProps: QuestionFourColumnPropsType) => void
}


export const QuestionFourColumnDefaultProps: QuestionFourColumnPropsType = {
    name: '4 columns layout',
    category: 4
}