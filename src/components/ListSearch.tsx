import {ChangeEvent, FC, useEffect, useState} from "react";
import {Input} from "antd";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../constant";


const {Search} = Input;
const ListSearch: FC = () => {
    const [val, setVal] = useState('');
    const nav = useNavigate();
    const {pathname} = useLocation();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setVal(event.target.value);
    }

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        setVal(curVal);
    }, [searchParams]);

    function handleSearch(val: string) {
        nav({
            pathname,
            search: val === "" ? "" : `${LIST_SEARCH_PARAM_KEY}=${val}`
        })
    }

    return <Search size={"large"}
                   allowClear
                   placeholder={"Search Title"}
                   value={val}
                   onChange={handleChange}
                   onSearch={handleSearch}
                   style={{width: "200px"}}/>
}

export default ListSearch;