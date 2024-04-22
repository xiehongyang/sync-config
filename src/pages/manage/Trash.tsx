import {FC, useState} from "react";
import {useTitle} from 'ahooks'
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message} from 'antd'
import styles from './common.module.scss'
import ListSearch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";

const {Title} = Typography
const {confirm} = Modal
const Trash: FC = () => {
    useTitle('Trash page')

    const {data = {}, loading} = useLoadQuestionListData({isDelete: true})
    const {list = [], total = 0} = data

    // 记录选中的 id
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const tableColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            // key: 'title', // 循环列的 key ，它会默认取 dataIndex 的值
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
    ]

    // 可以把 JSX 片段定义为一个变量
    const TableElem = (
        <>
            <div style={{marginBottom: '16px'}}>
                <Space>
                    <Button type="primary" disabled={selectedIds.length === 0}>
                        Recover
                    </Button>
                    <Button danger disabled={selectedIds.length === 0}>
                        Delete Permanently
                    </Button>
                </Space>
            </div>
            <div style={{border: '1px solid #e8e8e8'}}>
                <Table
                    dataSource={list}
                    columns={tableColumns}
                    pagination={false}
                    rowKey={q => q._id}
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