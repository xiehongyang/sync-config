import React, {FC, useEffect, useState} from "react";
import {Space, Tabs} from "antd";
import {FileTextOutlined, SettingOutlined} from '@ant-design/icons'
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import PageSetting from "../Edit/PageSetting";


enum TAB_KEYS {
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting'
}

const RightPanel: FC = () => {

    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
    const {selectedId} = useGetComponentInfo();

    useEffect(() => {
        if (selectedId) {
            setActiveKey(TAB_KEYS.PROP_KEY);
        } else {
            setActiveKey(TAB_KEYS.SETTING_KEY);
        }
    }, [selectedId]);

    const tabsItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <Space>
                    <FileTextOutlined/>
                    Attribute
                </Space>
            ),
            children: <div>'Todo...'</div>
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <Space>
                    <SettingOutlined/>
                    Page Setting
                </Space>
            ),
            children: <PageSetting/>
        }
    ]
    return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
}
export default RightPanel;