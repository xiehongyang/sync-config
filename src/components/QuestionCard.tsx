import React, {FC, useState} from "react";
import styles from './QuestionCard.module.scss';
import {Button, Divider, message, Modal, Popconfirm, Space} from "antd";
import {EditOutlined, StarOutlined, CopyOutlined, DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {useRequest} from "ahooks";
import {updateQuestionService} from "../services/question";

const {confirm} = Modal
type PropsType = {
    uuid: string;
    title: string;
    isStar: boolean;
    createdAt: string;
}
const QuestionCard: FC<PropsType> = (props) => {
    const {uuid, title, createdAt, isStar} = props;
    const nav = useNavigate();
    const [isStarState, setIsStarState] = useState(isStar);

    const {loading: changeStarLoading, run: changeStar} = useRequest(async () => {
        await updateQuestionService(uuid, {isStar: !isStarState})
    }, {
        manual: true,
        onSuccess() {
            setIsStarState(!isStarState);
            message.success("config update");
        }
    })

    function duplicate() {

    }

    const [isDeletedState, setIsDeletedState] = useState(false)
    const { loading: deleteLoading, run: deleteQuestion } = useRequest(
        async () => await updateQuestionService(uuid, { isDelete: true }),
        {
            manual: true,
            onSuccess() {
                message.success('delete success')
                setIsDeletedState(true)
            },
        }
    )

    function del() {
        confirm({
            title: 'Confirm delele the config?',
            icon: <ExclamationCircleOutlined/>,
            onOk: deleteQuestion,
        })
    }

    if (isDeletedState) return null;

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={`/question/edit/${uuid}`}>
                        <Space>

                            {isStarState && <StarOutlined style={{color: "red"}}/>}
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <span>{createdAt}</span>
                </div>
            </div>
            <Divider/>
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    <Button icon={<EditOutlined/>}
                            type={"text"}
                            size={"small"}
                            onClick={() => nav(`/question/edit/${uuid}`)}
                    >Edit Config</Button>
                </div>
                <div className={styles.right}>
                    <Space>
                        <Button type={"text"}
                                icon={<StarOutlined/>}
                                size={"small"}
                                onClick={changeStar}
                                disabled={changeStarLoading}
                        >
                            {isStarState ? 'Cancel Star' : "Star"}
                        </Button>
                        <Popconfirm
                            title="Confirm copy this Config"
                            okText="Confirm"
                            cancelText="Cancel"
                            onConfirm={duplicate}
                        >
                            <Button type={"text"}
                                    icon={<CopyOutlined/>}
                                    size={"small"}
                            >
                                Copy
                            </Button>
                        </Popconfirm>
                        <Button type={"text"}
                                icon={<DeleteOutlined/>}
                                size={"small"}
                                onClick={del}
                                disabled={deleteLoading}
                        >
                            Delete
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard;