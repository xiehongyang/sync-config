import React, {FC} from 'react'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'
import {Button, Space, Divider, message, Spin} from 'antd'
import {PlusOutlined, BarsOutlined} from '@ant-design/icons'
import {useRequest} from 'ahooks'
// import {createQuestionService} from '../services/question'
import styles from './ManageLayout.module.scss'
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";

const ManageLayout: FC = () => {
    const {waitingUserData} = useLoadUserData();
    useNavPage(waitingUserData);
    const nav = useNavigate()
    const {pathname} = useLocation()

    // const [loading, setLoading] = useState(false)
    // async function handleCreateClick() {
    //   setLoading(true)
    //   const data = await createQuestionService()
    //   const { id } = data || {}
    //   if (id) {
    //     nav(`/question/edit/${id}`)
    //     message.success('创建成功')
    //   }
    //   setLoading(false)
    // }

    // const {
    //     loading,
    //     // error,
    //     run: handleCreateClick,
    // } = useRequest(createQuestionService, {
    //     manual: true,
    //     onSuccess(result) {
    //         nav(`/question/edit/${result.id}`)
    //         message.success('创建成功')
    //     },
    // })

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
                            // onClick={handleCreateClick}
                            // disabled={loading}
                        >
                            Create Config Page
                        </Button>
                        <Divider style={{borderTop: 'transparent'}}/>
                        <Button
                            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
                            size="large"
                            icon={<BarsOutlined/>}
                            onClick={() => nav('/manage/list')}
                        >
                            My Config pages
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
