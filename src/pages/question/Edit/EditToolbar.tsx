import React, {FC} from "react";
import {Button, Space, Tooltip} from "antd";
import {DeleteOutlined, UndoOutlined, RedoOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {removeSelectedComponent} from "../../../store/componentReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
    const {selectedId} = useGetComponentInfo();
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(removeSelectedComponent())
    }

    function undo() {
        dispatch(UndoActionCreators.undo())
    }

    function redo() {
        dispatch(UndoActionCreators.redo())
    }

    return <Space>
        <Tooltip title="Delete">
            <Button shape="circle" icon={<DeleteOutlined/>} disabled={!selectedId} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip title="Undo">
            <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
        </Tooltip>
        <Tooltip title="Redo">
            <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
        </Tooltip>
    </Space>
}

export default EditToolbar;