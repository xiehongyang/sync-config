import React, {FC} from "react";
import {Typography} from "antd";
import sliderItem from './slider-item.png';
import {QuestionSliderItemDefaultProps, QuestionSliderItemPropsType} from "../QuestionSliderItem";

const {Title} = Typography;

const QuestionSliderItem: FC<QuestionSliderItemPropsType> = (props: QuestionSliderItemPropsType) => {
    const {name} = {...QuestionSliderItemDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={sliderItem} alt="Slider Item"/>
        </div>
    )
}

export default QuestionSliderItem;