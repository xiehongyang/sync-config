import React, {FC, useEffect, useState} from "react";
import {Pagination} from "antd";
import {LIST_PAGE_INDEX_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY} from "../constant";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {
    total: number;
}
const ListPage: FC<PropsType> = (props: PropsType) => {
    const {total} = props;
    const [current, setCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
    const [searchParams] = useSearchParams();
    const nav = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        const pageIndex = parseInt(searchParams.get(LIST_PAGE_INDEX_PARAM_KEY) || '') || 0;
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE ;
        setCurrent(pageIndex);
        setPageSize(pageSize);
    }, [searchParams]);

    function handlePageChange(pageIndex: number, pageSize: number) {
        searchParams.set(LIST_PAGE_INDEX_PARAM_KEY, (pageIndex).toString());
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
        nav({
            pathname,
            search: searchParams.toString(),
        });
    }

    return <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange}></Pagination>
}

export default ListPage;