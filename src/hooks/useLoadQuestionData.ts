import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useRequest} from "ahooks";
import {getQuestionService} from "../services/question";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentReducer/index";
import {resetPageInfo} from "../store/PageInfoReducer";


function useLoadQuestionData() {
    const {id = ''} = useParams();
    const dispatch = useDispatch();
    const {data, loading, error, run} = useRequest(async (id) => {
        if (!id) throw new Error('no config id');
        const data = await getQuestionService(id);
        return data
    }, {
        manual: true
    })

    useEffect(() => {
        if (!data) return;
        const {title = '', description: desc = '', content = []} = data;
        let selectedId = ''
        if (content.length > 0) {
            selectedId = content[0].fe_id // 默认选中第一个组件
        }

        dispatch(resetComponents({componentList: content, selectedId}));
        dispatch(resetPageInfo({title, desc}))

    }, [data]);

    useEffect(() => {
        run(id);
    }, [id]);

    return { loading, error };
}

export default useLoadQuestionData;