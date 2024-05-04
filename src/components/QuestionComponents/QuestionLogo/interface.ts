


export type QuestionLogoPropsType = {
    showMenu?: boolean
    showLogo?: boolean
    showSearch?: boolean
    image?: string
    onChange?: (newProps: QuestionLogoPropsType) => void
    disabled?: boolean
}

export const QuestionLogoDefaultProps: QuestionLogoPropsType = {
    showMenu: true,
    showLogo: true,
    showSearch: true,
    image: "assets/images/uow_logo.png",
}