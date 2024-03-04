import React, {FC, useEffect} from "react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import {Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {resetPageInfo} from "../../../store/PageInfoReducer";


const {TextArea} = Input;
const PageSetting: FC = () => {

    const pageInfo = useGetPageInfo();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue(pageInfo);
    }, [pageInfo])

    function handleValuesChange() {
        dispatch(resetPageInfo(form.getFieldsValue()));
    }

    return <Form
        layout="vertical"
        initialValues={pageInfo}
        onValuesChange={handleValuesChange}
        form={form}
    >
        <Form.Item label="Page Title" name="title" rules={[{required: true, message: 'please input title'}]}>
            <Input placeholder="please input title"/>
        </Form.Item>
        <Form.Item label="Page Description" name="desc">
            <TextArea/>
        </Form.Item>
    </Form>
}

export default PageSetting;