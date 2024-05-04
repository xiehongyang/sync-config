import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import styles from './Layers.module.scss';
import classNames from "classnames";
import {changeSelectedId, changeComponentTitle, moveComponent} from "../../../store/componentReducer";
import {Input, InputRef} from "antd";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import {DragOutlined} from '@ant-design/icons'

const Layers: FC = () => {
    const {componentList, selectedId} = useGetComponentInfo();
    const inputRef = useRef<InputRef>(null);
    const dispatch = useDispatch();
    const [changingTitleId, setChangingTitleId] = useState('');

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [changingTitleId]);

    function handleTitleClick(fe_id: string) {
        if (fe_id !== selectedId) {
            dispatch(changeSelectedId(fe_id));
            setChangingTitleId('');
            return;
        }
        setChangingTitleId(fe_id);
    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim();
        if (!newTitle || !selectedId) return;
        dispatch(changeComponentTitle({fe_id: selectedId, title: newTitle}));
    }

    const componentListWithId = componentList.map(c => {
        return {...c, id: c.fe_id}
    })

    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({oldIndex, newIndex}))
    }

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            {componentList.map(c => {
                const {fe_id, title} = c;
                const titleClassName = classNames(styles.title, {
                    [styles.selected]: fe_id === selectedId
                });
                return (
                    <SortableItem key={fe_id} id={fe_id}>
                        <div className={styles.wrapper}>
                            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                                {
                                    fe_id === changingTitleId ?
                                        <Input value={title}
                                               ref={inputRef}
                                               onPressEnter={() => setChangingTitleId('')}
                                               onBlur={() => setChangingTitleId('')}
                                               onChange={changeTitle}
                                        /> :
                                        title
                                }
                            </div>
                            <div className={styles.handler}>
                                <DragOutlined />
                            </div>
                        </div>
                    </SortableItem>);
            })}
        </SortableContainer>
    )
}

export default Layers;