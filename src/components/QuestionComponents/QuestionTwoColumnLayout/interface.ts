


export type QuestionTwoColumnPropsType = {
    name?: string
    category?: number
    onChange?: (newProps: QuestionTwoColumnPropsType) => void
}


export const QuestionTwoColumnDefaultProps: QuestionTwoColumnPropsType = {
    name: '2 columns layout',
    category: 4
}