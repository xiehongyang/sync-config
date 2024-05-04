import React, { FC, useEffect } from 'react'
import {Checkbox, Form, Input, InputNumber} from 'antd'
import { QuestionHeaderTextPropsType } from './interface'

const PropComponent: FC<QuestionHeaderTextPropsType> = (props: QuestionHeaderTextPropsType) => {
    const { title, showSearch, fontSize, padding, onChange, } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, showSearch, fontSize, padding })
    }, [title, showSearch, fontSize, padding])

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ title, showSearch, fontSize, padding }}
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item label="title" name="title" rules={[{ required: true, message: 'please type title' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Font Size" name="fontSize">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Padding" name="padding">
                <InputNumber />
            </Form.Item>
            <Form.Item name="showSearch" valuePropName="checked">
                <Checkbox>Show Search</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent
