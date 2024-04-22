import React, {FC} from "react";
import styles from './EditCanvas.module.scss';
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {changeSelectedId, ComponentInfoType, moveComponent} from "../../../store/componentReducer";
import {getComponentConfByType} from "../../../components/QuestionComponents";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import {Spin} from "antd";


function genComponent(componentInfo: ComponentInfoType) {
    const {type, props} = componentInfo;
    const componentConf = getComponentConfByType(type);
    if (componentConf === null || !componentConf) return null;
    const {Component} = componentConf;
    return <Component {...props} />;
}

type PropsType = {
    loading: boolean
}
const EditCanvas: FC<PropsType> = ({loading}) => {

    const dispatch = useDispatch();
    const {componentList, selectedId} = useGetComponentInfo();

    if (loading) {
        return <div style={{textAlign: "center", marginTop: "24px" }}>
            <Spin />
        </div>
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
        event.stopPropagation();
        dispatch(changeSelectedId(id));
    }

    const componentListWithId = componentList.map(c => {
        return {...c, id: c.fe_id}
    })

    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({oldIndex, newIndex}))
    }

    // console.log(componentList.map(c => genComponentConfig(c)));
    return (<SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        <div className={styles.canvas}>
            {
                componentList.map(c => {
                    const {fe_id} = c;
                    const classes = classNames(styles['component-wrapper'], {
                        [styles.selected]: c.fe_id === selectedId,
                    });
                    return (
                        <SortableItem key={fe_id} id={fe_id}>
                            <div className={classes}
                                 onClick={(e) => handleClick(e, fe_id)}
                            >
                                <div className={styles.component}>
                                    {genComponent(c)}
                                </div>
                            </div>
                        </SortableItem>
                    )
                })
            }
        </div>
    </SortableContainer>);
}

export default EditCanvas;