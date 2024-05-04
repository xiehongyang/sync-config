import React, { FC, useEffect } from 'react'
import {Form, Input, InputNumber} from 'antd'
import {QuestionStagPropsType} from './interface'

const PropComponent: FC<QuestionStagPropsType> = (props: QuestionStagPropsType) => {
    const { name, category, onChange } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ name, category })
    }, [name, category])

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ name, category }}
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'please type title' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Category" name="category">
                <InputNumber />
            </Form.Item>
        </Form>
    )
}

export default PropComponent
