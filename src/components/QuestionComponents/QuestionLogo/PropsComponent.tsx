import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import { QuestionLogoPropsType } from './interface'

const PropComponent: FC<QuestionLogoPropsType> = (props: QuestionLogoPropsType) => {
    const { showMenu=true, showLogo=true, showSearch=true, onChange} = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            showMenu,
            showLogo,
            showSearch,
        })
    }, [showMenu, showLogo, showSearch])

    function handleValueChange() {
        if (onChange) {
            onChange(form.getFieldsValue())
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={handleValueChange}
            initialValues={{ showMenu, showLogo, showSearch }}
        >
            <Form.Item name="showMenu" valuePropName="checked">
                <Checkbox>Show Menu</Checkbox>
            </Form.Item>
            <Form.Item name="showLogo" valuePropName="checked">
                <Checkbox>Show Logo</Checkbox>
            </Form.Item>
            <Form.Item name="showSearch" valuePropName="checked">
                <Checkbox>Show Search</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent
