import React, {FC} from "react";
import {Typography} from "antd";
import stag from './stag.png';
import {QuestionStagDefaultProps, QuestionStagPropsType} from "../QuestionStagLayout";
const {Title} = Typography;

const QuestionStagColumn: FC<QuestionStagPropsType> = (props:QuestionStagPropsType) => {
    const {name} = {...QuestionStagDefaultProps, ...props};
    return (<div>
            <Title level={5}>{name}</Title>
            <img src={stag} alt="staggered Layout"/>
        </div>
    )
}

export default QuestionStagColumn;