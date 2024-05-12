import {configureStore} from "@reduxjs/toolkit";
import componentsReducer, {ComponentStateType} from './componentReducer';
import pageInfoReducer, {PageInfoType} from "../store/PageInfoReducer";
import userReducer, { UserStateType } from './userReducer'
import undoable, { excludeAction, StateWithHistory } from "redux-undo";

export type StateType = {
    user: UserStateType,
    components: StateWithHistory<ComponentStateType>,
    pageInfo: PageInfoType
}
export default configureStore({
    reducer: {
        user: userReducer,
        components: undoable(componentsReducer, {
            limit: 20,
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId'
            ])
        }),
        pageInfo: pageInfoReducer
    }
})