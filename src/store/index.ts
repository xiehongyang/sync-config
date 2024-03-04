import {configureStore} from "@reduxjs/toolkit";
import componentsReducer, {ComponentStateType} from './componentReducer';
import pageInfoReducer, {PageInfoType} from "../store/PageInfoReducer";

export type StateType = {
    components: ComponentStateType,
    pageInfo: PageInfoType
}
export default configureStore({
    reducer: {
        components: componentsReducer,
        pageInfo: pageInfoReducer
    }
})