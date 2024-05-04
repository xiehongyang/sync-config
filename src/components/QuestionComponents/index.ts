import QuestionLogoConf, {QuestionLogoPropsType} from "../QuestionComponents/QuestionLogo";
import QuestionHeaderTextConf, {QuestionHeaderTextPropsType} from "../QuestionComponents/QuestionHeaderText";
import QuestionLargeCardConf, {QuestionLargeCardPropsType} from "../QuestionComponents/QuestionLargeCard";
import QuestionSliderListConf, {QuestionSliderListPropsType} from "../QuestionComponents/QuestionSliderList";
import QuestionSliderItemConf, {QuestionSliderItemPropsType} from "../QuestionComponents/QuestionSliderItem";
import QuestionTwoColumnConf, {QuestionTwoColumnPropsType} from "../QuestionComponents/QuestionTwoColumnLayout";
import QuestionThreeColumnConf, {QuestionThreeColumnPropsType} from "../QuestionComponents/QuestionThreeColumnLayout";
import QuestionFourColumnConf, {QuestionFourColumnPropsType} from "../QuestionComponents/QuestionFourColumnLayout";
import QuestionStagColumnConf, {QuestionStagPropsType} from "../QuestionComponents/QuestionStagLayout";
import {FC} from "react";



export type ComponentPropsType =
    & QuestionLogoPropsType
    & QuestionHeaderTextPropsType
    & QuestionLargeCardPropsType
    & QuestionSliderListPropsType
    & QuestionSliderItemPropsType
    & QuestionTwoColumnPropsType
    & QuestionThreeColumnPropsType
    & QuestionFourColumnPropsType
    & QuestionStagPropsType
    ;


export type ComponentConfType = {
    title?: string
    type: string
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
}

export const componentConfList: ComponentConfType[] =
    [
        QuestionLogoConf,
        QuestionHeaderTextConf,
        QuestionLargeCardConf,
        QuestionSliderListConf,
        QuestionSliderItemConf,
        QuestionTwoColumnConf,
        QuestionThreeColumnConf,
        QuestionFourColumnConf,
        QuestionStagColumnConf
    ];

export function getComponentConfByType(type: string) {
    return componentConfList.find(c => c.type === type)
}