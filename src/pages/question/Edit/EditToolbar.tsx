import React, {FC} from "react";
import {Button, Space, Tooltip} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {removeSelectedComponent} from "../../../store/componentReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
    const {selectedId} = useGetComponentInfo();
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(removeSelectedComponent())
    }

    return <Space>
        <Tooltip title="Delete">
            <Button shape="circle" icon={<DeleteOutlined/>} disabled={!selectedId} onClick={handleDelete}></Button>
        </Tooltip>
    </Space>
}

export default EditToolbar;