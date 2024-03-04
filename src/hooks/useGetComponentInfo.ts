import {ComponentStateType} from "../store/componentReducer";
import {useSelector} from "react-redux";
import {StateType} from "../store/index";


function useGetComponentInfo() {

    const components = useSelector<StateType>(state => state.components) as ComponentStateType;

    const { componentList = [], selectedId } = components;
    return {
        componentList,
        selectedId
    }
}

export default useGetComponentInfo;