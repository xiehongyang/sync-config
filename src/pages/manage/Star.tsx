import React, {FC} from "react";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {useTitle} from 'ahooks'
import styles from './common.module.scss'
import {Typography, Spin, Empty} from 'antd'
import ListSearch from '../../components/ListSearch';
import QuestionCard from "../../components/QuestionCard";
import ListPage from "../../components/ListPage";
const {Title} = Typography
const Star: FC = () => {
    useTitle('Star Config')

    const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
    const { list = [], total = 0 } = data

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>Star Config</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="No data" />}
                {list.length > 0 &&
                    list.map((q: any) => {
                        const { _id } = q
                        return <QuestionCard key={_id} {...q} />
                    })}
            </div>
            <div className={styles.footer}>
                <ListPage total={total} />
            </div>
        </>
    )
}

export default Star;