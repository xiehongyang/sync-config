import {ComponentStateType} from "../store/componentReducer";
import {useSelector} from "react-redux";
import {StateType} from "../store/index";


function useGetComponentInfo() {

    const components = useSelector<StateType>(state => state.components) as ComponentStateType;

    const { componentList = [], selectedId } = components;

    const selectedComponent = componentList.find(c => c.fe_id === selectedId);

    return {
        componentList,
        selectedId,
        selectedComponent
    }
}

export default useGetComponentInfo;