


export type QuestionHeaderTextPropsType = {
    title?: string
    padding?: number
    fontSize?: number
    showSearch?: boolean
    onChange?: (newProps: QuestionHeaderTextPropsType) => void
    disabled?: boolean
}


export const QuestionHeaderTextDefaultProps: QuestionHeaderTextPropsType = {
    title: "998 Capstone",
    padding: 20,
    fontSize: 14,
    showSearch: true
}