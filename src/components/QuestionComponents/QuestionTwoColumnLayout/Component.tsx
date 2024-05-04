import React, {FC} from "react";
import {Typography} from "antd";
import twoColumn from './2-column.png';
import {QuestionTwoColumnDefaultProps, QuestionTwoColumnPropsType} from "../QuestionTwoColumnLayout";
const {Title} = Typography;

const QuestionTwoColumn: FC<QuestionTwoColumnPropsType> = (props:QuestionTwoColumnPropsType) => {
    const {name} = {...QuestionTwoColumnDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={twoColumn} alt="2 Columns Layout"/>
        </div>
    )
}

export default QuestionTwoColumn;