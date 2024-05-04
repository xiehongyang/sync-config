


export type QuestionSliderListPropsType = {
    name?: string
    category?: number
    imageBorder?: number
    onChange?: (newProps: QuestionSliderListPropsType) => void
}


export const QuestionSliderListDefaultProps: QuestionSliderListPropsType = {
    name: 'Slider List',
    category: 4,
    imageBorder: 5
}