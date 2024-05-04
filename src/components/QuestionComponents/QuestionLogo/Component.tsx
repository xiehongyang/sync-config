import React, {FC} from "react";
import {QuestionLogoDefaultProps, QuestionLogoPropsType} from "./interface";
import {Space, Skeleton, Flex} from "antd";
import {MenuOutlined, SearchOutlined, EyeInvisibleOutlined} from '@ant-design/icons'
import styles from './Component.module.scss';

const QuestionLogo: FC<QuestionLogoPropsType> = (props: QuestionLogoPropsType) => {
    const {showMenu = true, showLogo = true, showSearch = true} = {...QuestionLogoDefaultProps, ...props};
    return (<Flex justify={"space-between"} align={"center"}>
        {showMenu ? <MenuOutlined/> : <span className={styles['not-visible']}><EyeInvisibleOutlined/></span>}
        {showLogo ? <Skeleton.Image style={{width: 100}}/> : <span className={styles['not-visible']}><EyeInvisibleOutlined/></span>}
        {showSearch ? <SearchOutlined/> : <span className={styles['not-visible']}><EyeInvisibleOutlined/></span>}
    </Flex>);
}

export default QuestionLogo;