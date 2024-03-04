import {Button, Input, Modal, Space, Typography} from "antd";
import React, {ChangeEvent, FC, useState} from "react";
import styles from './EditHeader.module.scss';
import {LeftOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {EditOutlined, CloudUploadOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {changePageTitle} from "../../../store/PageInfoReducer";
import EditToolbar from "../../../pages/question/Edit/EditToolbar";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {getComponentConfByType} from "../../../components/QuestionComponents";

const {Title} = Typography;

const TitleElem: FC = () => {
    const {title} = useGetPageInfo();
    const dispatch = useDispatch();
    const [editState, setEditState] = useState(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value;
        if (!newTitle) return;
        dispatch(changePageTitle(newTitle))
    }

    if (editState) {
        return (
            <Input value={title}
                   onPressEnter={() => setEditState(false)}
                   onBlur={() => setEditState(false)}
                   onChange={handleChange}
            />
        )
    }

    return <Space>
        <Title>{title}</Title>
        <Button icon={<EditOutlined/>} type="text" onClick={() => setEditState(true)}></Button>
    </Space>
}


const EditHeader: FC = () => {
    const {componentList} = useGetComponentInfo();
    const nav = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function onCheckConfig() {
        setIsModalOpen(true);
    }

    return (
        <>
            <div className={styles['header-wrapper']}>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <Space>
                            <Button type="link" icon={<LeftOutlined/>} onClick={() => nav(-1)}>
                                Back
                            </Button>
                            <TitleElem/>
                        </Space>
                    </div>
                    <div className={styles.main}>
                        <EditToolbar/>
                    </div>
                    <div className={styles.right}>
                        <Space>
                            <Button onClick={onCheckConfig}>Check Config</Button>
                            <Button>Save</Button>
                            <Button type="primary" icon={<CloudUploadOutlined/>}>Upload</Button>
                        </Space>
                    </div>
                </div>
            </div>
            <Modal title="Config Code" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
                <pre className={styles['config-area']}>{JSON.stringify(componentList, null, 2)}</pre>
            </Modal>
        </>
    )
}


export default EditHeader;