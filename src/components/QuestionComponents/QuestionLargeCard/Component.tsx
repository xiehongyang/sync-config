import React, {FC} from "react";
import {Typography, Input} from "antd";
import largeCard from './large-card.png';
import {QuestionLargeCardDefaultProps, QuestionLargeCardPropsType} from "../QuestionLargeCard";


const {Title} = Typography;

const QuestionLargeCard: FC<QuestionLargeCardPropsType> = (props: QuestionLargeCardPropsType) => {
    const {name} = {...QuestionLargeCardDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={largeCard} alt="Large Card"/>
        </div>
    )
}

export default QuestionLargeCard;