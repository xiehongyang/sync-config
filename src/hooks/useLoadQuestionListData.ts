import {useSearchParams} from "react-router-dom";
import {useRequest} from "ahooks";
import {LIST_PAGE_INDEX_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_PARAM_KEY} from "../constant";
import {getQuestionListService} from "../services/question";


type OptionType = {
    isStar: boolean,
    isDelete: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
    const [searchParams] = useSearchParams();
    const {isStar , isDelete} = opt;

    const {data, loading, error, refresh} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        const pageIndex = parseInt(searchParams.get(LIST_PAGE_INDEX_PARAM_KEY) || '') || 0;
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE ;

        const data = await getQuestionListService({title: keyword, isStar, isDelete, pageIndex, pageSize});
        return data;
    }, {
        refreshDeps: [searchParams]
    })
    return {data, loading, error, refresh};
}

export default useLoadQuestionListData;