


export type QuestionSliderItemPropsType = {
    name?: string
    category?: number
    imageBorder?: number
    onChange?: (newProps: QuestionSliderItemPropsType) => void
}


export const QuestionSliderItemDefaultProps: QuestionSliderItemPropsType = {
    name: 'this is slider item',
    category: 4,
    imageBorder: 5
}