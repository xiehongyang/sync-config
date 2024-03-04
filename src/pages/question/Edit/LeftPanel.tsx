import React, {FC} from "react";
import {Space, Tabs} from "antd";
import ComponentLib from './ComponentLib';
import Layers from "./Layers";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'

const LeftPanel: FC = () => {
    const tabsItems = [
        {
            key: 'componentLib',
            label: (
                <Space>
                    <AppstoreOutlined />
                    Component Lib
                </Space>
            ),
            children: <ComponentLib/>
        },
        {
            key: 'layers',
            label: (
                <Space>
                    <BarsOutlined />
                    layers
                </Space>
            ),
            children: <Layers />
        }
    ]
    return <Tabs defaultActiveKey="componentLib" items={tabsItems}></Tabs>
}
export default LeftPanel;