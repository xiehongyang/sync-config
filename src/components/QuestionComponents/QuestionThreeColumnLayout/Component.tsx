import React, {FC} from "react";
import {Typography} from "antd";
import threeColumn from './3-column.png';
import {QuestionThreeColumnDefaultProps, QuestionThreeColumnPropsType} from "../QuestionThreeColumnLayout";
const {Title} = Typography;

const QuestionThreeColumn: FC<QuestionThreeColumnPropsType> = (props:QuestionThreeColumnPropsType) => {
    const {name} = {...QuestionThreeColumnDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={threeColumn} alt="3 Columns Layout"/>
        </div>
    )
}

export default QuestionThreeColumn;