import {ComponentPropsType} from "../../components/QuestionComponents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {arrayMove} from "@dnd-kit/sortable";
import {getNextSelectedId} from "../utils";


export type ComponentInfoType = {
    fe_id: string;
    type: string;
    title: string;
    props?: ComponentPropsType
}

export type ComponentStateType = {
    selectedId: string
    componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentStateType = {
    selectedId: '',
    componentList: [
        {fe_id: '2', type: 'questionInput', title: 'input'},
        {fe_id: '1', type: 'questionTitle', title: 'title'},
    ]
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
            return action.payload;
        },
        changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
            state.selectedId = action.payload;
        },
        addComponent: (state: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload;
            const {selectedId, componentList} = state;
            const index = componentList.findIndex(c => c.fe_id === selectedId);
            if (index < 0) {
                state.componentList.push(newComponent);
            } else {
                state.componentList.splice(index + 1, 0, newComponent);
            }
            state.selectedId = newComponent.fe_id;
        },
        removeSelectedComponent: (state: ComponentStateType) => {
            const { componentList = [], selectedId: removeId } = state;
            state.selectedId = getNextSelectedId(removeId, componentList);
            const index = componentList.findIndex(c => c.fe_id === removeId);
            componentList.splice(index, 1);
        },
        changeComponentTitle: (state: ComponentStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
            const {title, fe_id} = action.payload;
            const curComp = state.componentList.find(c => c.fe_id === fe_id);
            if (curComp) {
                curComp.title = title;
            }
        },
        moveComponent: (state: ComponentStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
            const {oldIndex, newIndex} = action.payload;
            state.componentList = arrayMove(state.componentList, oldIndex, newIndex);
        }
    }
})

export const {
    resetComponents,
    changeSelectedId,
    addComponent,
    changeComponentTitle,
    moveComponent,
    removeSelectedComponent
} = componentsSlice.actions;
export default componentsSlice.reducer;