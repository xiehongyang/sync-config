import {FC, useState} from "react";
import {useRequest, useTitle} from 'ahooks'
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message} from 'antd'
import styles from './common.module.scss'
import ListSearch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";
import {deleteQuestionsService, updateQuestionService} from "../../services/question";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {convertDateTime} from "../../utils/convert-datetime";

const {Title} = Typography
const {confirm} = Modal
const Trash: FC = () => {
    useTitle('Trash page')

    const {data = {}, loading, refresh} = useLoadQuestionListData({isDelete: true})
    const {list = [], total = 0} = data

    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const tableColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
    ];

    const {run: recover} = useRequest(
        async () => {
            for await (const id of selectedIds) {
                await updateQuestionService(id, {isDelete: false})
            }
        },
        {
            manual: true,
            debounceWait: 500,
            onSuccess() {
                message.success('recover successful');
                refresh();
                setSelectedIds([]);
            },
        }
    )

    const {run: deleteQuestion} = useRequest(
        async () => await deleteQuestionsService(selectedIds),
        {
            manual: true,
            onSuccess() {
                message.success('delete successful')
                refresh()
                setSelectedIds([])
            },
        }
    )

    function del() {
        confirm({
            title: 'Are you sure you want to permanently delete this questionnaire?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Once deleted, it cannot be recovered.',
            onOk: deleteQuestion,
        })
    }


    const TableElem = (
        <>
            <div style={{marginBottom: '16px'}}>
                <Space>
                    <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
                        Recover
                    </Button>
                    <Button danger disabled={selectedIds.length === 0} onClick={del}>
                        Delete Permanently
                    </Button>
                </Space>
            </div>
            <div style={{border: '1px solid #e8e8e8'}}>
                <Table
                    dataSource={list.map((item: any) => ({...item, createdAt: convertDateTime(item.createdAt)}))}
                    columns={tableColumns}
                    pagination={false}
                    rowKey={q => q.uuid}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: selectedRowKeys => {
                            setSelectedIds(selectedRowKeys as string[])
                        },
                    }}
                />
            </div>
        </>
    )

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>Trash</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{textAlign: 'center'}}>
                        <Spin/>
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="No Data"/>}
                {list.length > 0 && TableElem}
            </div>
            <div className={styles.footer}>
                <ListPage total={total}/>
            </div>
        </>
    )
}

export default Trash;