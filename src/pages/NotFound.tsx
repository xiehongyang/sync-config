import React, {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {Result, Button} from 'antd'
import {HOME_PATHNAME} from '../router'

const NotFound: FC = () => {
    const nav = useNavigate()

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you're trying to access doesn't exist."
            extra={
                <Button type="primary" onClick={() => nav(HOME_PATHNAME)}>
                    Return to homepage
                </Button>
            }
        ></Result>
    )
}

export default NotFound
