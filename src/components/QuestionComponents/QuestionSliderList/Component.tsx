import React, {FC} from "react";
import {Typography, Input} from "antd";
import sliderList from './slider-list.png';
import {QuestionSliderListDefaultProps, QuestionSliderListPropsType} from "../QuestionSliderList";

const {Title} = Typography;

const QuestionSliderList: FC<QuestionSliderListPropsType> = (props: QuestionSliderListPropsType) => {
    const {name} = {...QuestionSliderListDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={sliderList} alt="Slider List"/>
        </div>
    )
}

export default QuestionSliderList;