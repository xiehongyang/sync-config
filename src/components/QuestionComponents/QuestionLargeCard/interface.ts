


export type QuestionLargeCardPropsType = {
    name?: string
    category?: number
    imageBorder?: number
    onChange?: (newProps: QuestionLargeCardPropsType) => void
}


export const QuestionLargeCardDefaultProps: QuestionLargeCardPropsType = {
    name: 'This is large card',
    category: 4,
    imageBorder: 5
}