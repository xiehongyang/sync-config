import React, {FC, useEffect, useState} from 'react'
import {Typography, Spin, Empty} from 'antd'
import {useTitle, useDebounceFn, useRequest} from 'ahooks'
import {useSearchParams} from 'react-router-dom'
import styles from './common.module.scss'

const {Title} = Typography

const List: FC = () => {
    useTitle('Sync Config - My Sync page')

    const [list, setList] = useState([])


    // useEffect(() => {
    //     const { run, loading } = useRequest(
    //         async () => {
    //             const data = await getQuestionListService();
    //             return data
    //         },
    //         {
    //             manual: true,
    //             onSuccess(result) {
    //                 // const { list: l = [], total = 0 } = result
    //                 // setList(list.concat(l))
    //             },
    //         }
    //     );
    //     run();
    // }, [])

    return (
        <>
             this is list page
            {/*<div className={styles.header}>*/}
            {/*    <div className={styles.left}>*/}
            {/*        <Title level={3}>My Sync pages</Title>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={styles.content}>*/}
            {/*    /!* 问卷列表 *!/*/}
            {/*    {list.length > 0 &&*/}
            {/*        list.map((q: any) => {*/}
            {/*            const {_id} = q*/}
            {/*            return <QuestionCard key={_id} {...q} />*/}
            {/*        })}*/}
            {/*</div>*/}
        </>
    )
}

export default List
