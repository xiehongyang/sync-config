import React, {FC, useState} from 'react'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'
import {Button, Space, Divider, message, Spin} from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import {useRequest} from 'ahooks'
// import {createQuestionService} from '../services/question'
import styles from './ManageLayout.module.scss'
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import {createQuestionService} from "../services/question";

const ManageLayout: FC = () => {
    const {waitingUserData} = useLoadUserData();
    useNavPage(waitingUserData);
    const nav = useNavigate()
    const {pathname} = useLocation()
    const {
        loading,
        // error,
        run: handleCreateClick,
    } = useRequest(createQuestionService, {
        manual: true,
        onSuccess(result) {
            nav(`/question/edit/${result}`)
            message.success('Create Success');
        },
    })

    function handleCreatePost() {
        nav(`/post-to-wp`);
    }

    return (
        waitingUserData ? (
            <div style={{textAlign: 'center', marginTop: '60px'}}>
                <Spin/>
            </div>
        ) : (
            <div className={styles.container}>
                <div className={styles.left}>
                    <Space direction="vertical">
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined/>}
                            onClick={handleCreateClick}
                            disabled={loading}
                        >
                            Create Config
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            icon={<PlusOutlined/>}
                            onClick={handleCreatePost}
                            disabled={loading}
                        >
                            Create Post
                        </Button>
                        <Divider style={{borderTop: 'transparent'}}/>
                        <Button
                            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
                            size="large"
                            icon={<BarsOutlined/>}
                            onClick={() => nav('/manage/list')}
                        >
                            My Config
                        </Button>
                        <Button
                            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
                            size="large"
                            icon={<StarOutlined />}
                            onClick={() => nav('/manage/star')}
                        >
                            Star Config
                        </Button>
                        <Button
                            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
                            size="large"
                            icon={<DeleteOutlined />}
                            onClick={() => nav('/manage/trash')}
                        >
                            Trash
                        </Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    <Outlet/>
                </div>
            </div>
        )
    )
}

export default ManageLayout
