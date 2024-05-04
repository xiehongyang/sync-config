


export type QuestionStagPropsType = {
    name?: string
    category?: number
    onChange?: (newProps: QuestionStagPropsType) => void
}


export const QuestionStagDefaultProps: QuestionStagPropsType = {
    name: 'staggered layout',
    category: 4
}