import {Button, Input, Modal, Space, Typography} from "antd";
import React, {ChangeEvent, FC, useState} from "react";
import styles from './EditHeader.module.scss';
import {LeftOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {EditOutlined, CloudUploadOutlined, LoadingOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {changePageTitle} from "../../../store/PageInfoReducer";
import EditToolbar from "../../../pages/question/Edit/EditToolbar";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {getComponentConfByType} from "../../../components/QuestionComponents";
import {useDebounceEffect, useRequest} from "ahooks";
import {updateQuestionService} from "../../../services/question";

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


const SaveButton: FC = () => {
    const {id} = useParams();
    const {componentList = []} = useGetComponentInfo();
    const pageInfo = useGetPageInfo();

    const {loading, run: save} = useRequest(async () => {
        if (!id) return;
        const updateObj = {
            title: pageInfo.title,
            description: pageInfo.desc,
            content: componentList
        }
        await updateQuestionService(id, updateObj);
    }, {manual: true});

    useDebounceEffect(() => {
        save();
    }, [componentList, pageInfo], {wait: 1000});

    return <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined/> : null}>Save</Button>
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
                            <SaveButton/>
                            <Button disabled type="primary" icon={<CloudUploadOutlined/>}>Upload</Button>
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