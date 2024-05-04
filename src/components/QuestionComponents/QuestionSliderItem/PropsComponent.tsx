import React, { FC, useEffect } from 'react'
import {Form, Input, InputNumber} from 'antd'
import { QuestionSliderItemPropsType } from './interface'

const PropComponent: FC<QuestionSliderItemPropsType> = (props: QuestionSliderItemPropsType) => {
    const { name, category, imageBorder, onChange } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ name, category, imageBorder })
    }, [name, category, imageBorder])

    function handleValuesChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ name, category, imageBorder }}
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'please type title' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Category" name="category">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Image Border" name="imageBorder">
                <InputNumber />
            </Form.Item>
        </Form>
    )
}

export default PropComponent
