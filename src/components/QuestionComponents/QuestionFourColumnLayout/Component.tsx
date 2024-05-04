import React, {FC} from "react";
import {Typography} from "antd";
import fourColumn from './4-column.png';
import {QuestionFourColumnDefaultProps, QuestionFourColumnPropsType} from "../QuestionFourColumnLayout";
const {Title} = Typography;

const QuestionFourColumn: FC<QuestionFourColumnPropsType> = (props:QuestionFourColumnPropsType) => {
    const {name} = {...QuestionFourColumnDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={fourColumn} alt="4 Columns Layout"/>
        </div>
    )
}

export default QuestionFourColumn;