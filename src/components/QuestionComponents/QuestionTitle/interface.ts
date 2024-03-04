


export type QuestionTitlePropsType = {
    text?: string
    level?: 1 | 2 | 3 | 4 | 5
    isCenter?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
    text: 'a line of title',
    level: 1,
    isCenter: false
}