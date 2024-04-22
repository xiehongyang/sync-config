import React, {FC, useEffect, useRef, useState} from 'react'
import {Typography, Spin, Empty} from 'antd'
import {useDebounceFn, useRequest, useTitle} from 'ahooks'
import styles from './common.module.scss'
import QuestionCard from "../../components/QuestionCard";
import ListSearch from '../../components/ListSearch';
import {useSearchParams} from "react-router-dom";
import {getQuestionListService} from "../../services/question";
import {LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY} from "../../constant";

const {Title} = Typography


const List: FC = () => {
    useTitle('Sync Config - My Sync page')

    const [started, setStarted] = useState(false);
    const [page, setPage] = useState(0);
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0)
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

    useEffect(() => {
        setStarted(false);
        setPage(0);
        setList([]);
        setTotal(0);
    }, [keyword]);

    const { run: load, loading } = useRequest(async () => {
        const data = await getQuestionListService({
            pageIndex: page,
            pageSize: LIST_PAGE_SIZE,
            title: keyword,
            isDelete: false,
        });
        return data;
    }, {
        manual: true,
        onSuccess(result) {
            const { list: l =[], count = 0 } = result;
            setList(list.concat(l));
            setTotal(count);
            setPage(page + 1);
        }
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const haveMoreData = total > list.length;


    const {run: tryLoadMore} = useDebounceFn(() => {
        const elem = containerRef.current;
        if (elem == null) {return}

        const domRect = elem.getBoundingClientRect();
        if (domRect == null) {
            return;
        }
        const { bottom } = domRect;
        if (bottom <= document.body.clientHeight) {
            load();
            setStarted(true);
        }
    }, {
        wait: 1000
    })

    useEffect(() => {
        tryLoadMore();
    }, [searchParams]);

    useEffect(() => {
        if (haveMoreData) {
            window.addEventListener('scroll', tryLoadMore);
        }

        return () => {
            window.removeEventListener('scroll', tryLoadMore);
        }
    }, [searchParams, haveMoreData]);

    const LoadMoreContentElem= () => {
        if (!started || loading) return <Spin />
        if (total === 0) return <Empty description={"No Data"} />
        if (!haveMoreData) {
            return <span>No more...</span>
        }
        return <span>Scroll to load more</span>
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>My Config pages</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch/>
                </div>
            </div>
            <div className={styles.content}>
                {loading && (<div style={{textAlign: "center"}}>
                    <Spin/>
                </div>)}
                {list.map((q: any) => {
                        const {_id} = q
                        return <QuestionCard key={_id} {...q} />
                    })}
            </div>
            <div className={styles.footer}>
                <div ref={containerRef}>
                    {LoadMoreContentElem()}
                </div>
            </div>
        </>
    )
}

export default List
