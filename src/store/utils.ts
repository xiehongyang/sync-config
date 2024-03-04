import {ComponentInfoType} from "../store/componentReducer";


export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
    const index = componentList.findIndex(c => c.fe_id === fe_id);
    if (index < 0) return '';

    let newSelectedId = '';
    const length = componentList.length;
    if (length <= 1) { // empty component
        newSelectedId = '';
    } else {
        if (index + 1 === length) { // if delete the last component
            newSelectedId = componentList[index - 1].fe_id; // then return the previous component
        } else { // if not select the last component, return the next component
            newSelectedId = componentList[index + 1].fe_id;
        }
    }
    return newSelectedId;
}