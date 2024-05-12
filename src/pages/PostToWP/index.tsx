import React, {FC, useState} from "react";
import useLoadUserData from "../../hooks/useLoadUserData";
import useNavPage from "../../hooks/useNavPage";
import {Content} from "antd/es/layout/layout";
import {Layout, Input, Button, Form, Select, Upload, Modal, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {MANAGE_INDEX_PATHNAME} from "../../router";

const {Sider} = Layout;
const {TextArea} = Input;
const {Option} = Select;
const PostToWP: FC = () => {
    const {waitingUserData} = useLoadUserData();
    useNavPage(waitingUserData);
    // State to hold categories
    const [categories, setCategories] = useState(['News', 'Blog']);
    // State to hold the new category input
    const [newCategory, setNewCategory] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [content, setContent] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setContent(content + generatedText);
        setModalVisible(false);
        setGeneratedText('');
    };

    const handleCancel = () => {
        setModalVisible(false);
        setGeneratedText('');
    };
    // Function to add a new category
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');  // Clear the input after adding
        }
    };

    const handleUploadChange = (info: any) => {
        // Assuming the API response has a URL in the response for preview
        let fileList = [...info.fileList];
        // You can only show the last X recent uploaded images
        fileList = fileList.slice(-5);
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        setFileList(fileList);
    };

    const handleAIUploadChange = (info: any) => {
        // if (info.file.status === 'done') {
        setLoading(true);
        setTimeout(() => {
            setGeneratedText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
            setLoading(false);
        }, 3000); // Simulating a 3-second delay for backend processing
        // }
    };

    function handlePublish() {
        message.success('post successful');
        nav(MANAGE_INDEX_PATHNAME);
    }

    return (
        <Layout>
            <Layout>
                <Content style={{padding: '20px'}}>
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            <Input placeholder="Enter title"/>
                        </Form.Item>
                        <Form.Item label="Content">
                            <TextArea rows={4} placeholder="Enter content" value={content}
                                      onChange={e => setContent(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handlePublish}>
                                Publish
                            </Button>
                            <Button type="default" onClick={showModal} style={{marginLeft: '10px'}}>
                                AI Generate
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
                <Sider width={300} style={{background: '#f0f2f5', padding: '20px'}}>
                    <Form layout="vertical">
                        <Form.Item label="Category">
                            <Select
                                value={newCategory}
                                placeholder="Select or add a category"
                                onChange={setNewCategory}
                                dropdownRender={menu => (
                                    <>
                                        {menu}
                                        <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8, alignItems: 'center'}}>
                                            <Input style={{flex: 'auto'}} value={newCategory}
                                                   onChange={e => setNewCategory(e.target.value)}/>
                                            <Button type="link" onClick={handleAddCategory} style={{flex: 'none'}}>
                                                Add
                                            </Button>
                                        </div>
                                    </>
                                )}
                            >
                                {categories.map((category, index) => (
                                    <Option key={index} value={category}>{category}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Featured Image">
                            <Upload.Dragger
                                name="files"
                                action="/upload.do"
                                listType="picture"
                                onChange={handleUploadChange}
                            >
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload</p>
                            </Upload.Dragger>
                            {/*<div style={{ marginTop: '16px' }}>*/}
                            {/*    {fileList.map(file => (*/}
                            {/*        <Image*/}
                            {/*            key={file!.uid}*/}
                            {/*            src={file!.url || 'data:image/png;base64,' + file.thumbUrl}*/}
                            {/*            alt={file!.name}*/}
                            {/*            style={{ width: '100px', marginRight: '8px' }}*/}
                            {/*        />*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </Form.Item>
                    </Form>
                </Sider>

                <Modal
                    title="AI Generate Text from Image"
                    visible={modalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                            Add Text to Content
                        </Button>,
                    ]}
                >
                    <Upload
                        name="files"
                        action="/upload.do"
                        onChange={handleAIUploadChange}
                        listType="picture"
                    >
                        <Button icon={<InboxOutlined/>}>Click to Upload Image</Button>
                    </Upload>
                    {generatedText && (
                        <div style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f0f0f0'}}>
                            <p><strong>AI-Generated Text:</strong></p>
                            <p>{generatedText}</p>
                        </div>
                    )}
                </Modal>
            </Layout>
        </Layout>
    )
}

export default PostToWP;