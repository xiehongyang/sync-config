


export type QuestionThreeColumnPropsType = {
    name?: string
    category?: number
    onChange?: (newProps: QuestionThreeColumnPropsType) => void
}


export const QuestionThreeColumnDefaultProps: QuestionThreeColumnPropsType = {
    name: '3 columns layout',
    category: 4
}