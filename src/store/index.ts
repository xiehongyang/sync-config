import {configureStore} from "@reduxjs/toolkit";
import componentsReducer, {ComponentStateType} from './componentReducer';
import pageInfoReducer, {PageInfoType} from "../store/PageInfoReducer";
import userReducer, { UserStateType } from './userReducer'

export type StateType = {
    user: UserStateType,
    components: ComponentStateType,
    pageInfo: PageInfoType
}
export default configureStore({
    reducer: {
        user: userReducer,
        components: componentsReducer,
        pageInfo: pageInfoReducer
    }
})