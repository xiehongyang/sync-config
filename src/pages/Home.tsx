import React, {FC, useCallback, useEffect} from 'react'
import {Button, Typography} from 'antd'
import styles from './Home.module.scss'
import {getToken, setToken} from "../utils/user-token";
import {useNavigate} from "react-router-dom";
import {MANAGE_INDEX_PATHNAME} from "../router/index";

const {Title, Paragraph} = Typography

const Home: FC = () => {

    const nav = useNavigate();

    function googleLoginCallback(e: MessageEvent) {
        if (e !== null &&
            typeof e === 'object' &&
            e.data !== null &&
            typeof e.data === 'object' &&
            e.data.hasOwnProperty('token') &&
            e.data.token !== null &&
            typeof e.data.token === 'string'
        ) {
            setToken(e.data.token);
            nav(MANAGE_INDEX_PATHNAME);
        }
    }

    useEffect(() => {
        window.addEventListener('message', googleLoginCallback);
        return () => {
            window.removeEventListener('message', googleLoginCallback);
        }
    }, []);

    const popupWindow = useCallback((url: string, windowName: string, w: number, h: number) => {
        const y = window.top!.outerHeight / 2 + window.top!.screenY - (h / 2);
        const x = window.top!.outerWidth / 2 + window.top!.screenX - (w / 2);
        return window.open(url, windowName, `target=_blank, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }, []);

    function onClickLogin() {
        if (getToken()) {
            nav(MANAGE_INDEX_PATHNAME);
            return;
        }
        popupWindow('http://localhost:3000/user/google', 'Google Auth', 500, 500);
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <Title>Sync Config</Title>
                <Paragraph>This is Sync Config</Paragraph>
                <div>
                    <Button type="primary" onClick={() => onClickLogin()}>
                        Login to Start Use
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Home
