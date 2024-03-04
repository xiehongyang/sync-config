import QuestionInputConf, {QuestionInputPropsType} from "../QuestionComponents/QuestionInput";
import QuestionTitleConf, {QuestionTitlePropsType} from "../QuestionComponents/QuestionTitle";
import {FC} from "react";


export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;


export type ComponentConfType = {
    title: string
    type: string
    Component: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
}

export const componentConfList: ComponentConfType[] = [QuestionTitleConf, QuestionInputConf];

export function getComponentConfByType(type: string) {
    return componentConfList.find(c => c.type === type)
}