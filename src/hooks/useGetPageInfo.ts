import {useSelector} from "react-redux";
import {StateType} from "../store/index";
import {PageInfoType} from "../store/PageInfoReducer";


function useGetPageInfo() {
    return useSelector<StateType>(state => state.pageInfo) as PageInfoType;
}

export default useGetPageInfo;