import React, {FC} from "react";
import {QuestionHeaderTextDefaultProps, QuestionHeaderTextPropsType} from "./interface";
import {Flex, Input, Typography} from "antd";
import {SearchOutlined} from '@ant-design/icons'

const {Title} = Typography;

const QuestionHeaderText: FC<QuestionHeaderTextPropsType> = (props: QuestionHeaderTextPropsType) => {
    const {title, showSearch, fontSize, padding} = {...QuestionHeaderTextDefaultProps, ...props};
    return <div style={{padding}}>
        <Flex justify={"space-between"} align={"center"}>
            <Title style={{
                fontSize: fontSize,
            }}>
                {title}
            </Title>
            {showSearch && <SearchOutlined/>}
        </Flex>
    </div>

}

export default QuestionHeaderText;