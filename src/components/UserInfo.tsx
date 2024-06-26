import React, {FC} from 'react'
import {Avatar, Button, Dropdown, Menu, MenuProps, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {HOME_PATHNAME, MANAGE_INDEX_PATHNAME} from '../router'
import {getToken, removeToken} from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import {logoutReducer} from '../store/userReducer'
import {popupWindow} from "../utils/pop-up-window";

const UserInfo: FC = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    // const { data } = useRequest(getUserInfoService) // ajax
    // const { username, nickname } = data || {}
    const {username, picture, gmail} = useGetUserInfo() // 从 redux 中获取用户信息

    function logout(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        dispatch(logoutReducer());
        removeToken();
        message.success('logout success')
        nav(HOME_PATHNAME);
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: gmail,
        },
        {
            key: '2',
            danger: true,
            label: (
                <a onClick={(e) => logout(e)}>
                    Logout
                </a>
            )
        },
    ];

    function onClickLogin() {
        if (getToken()) {
            nav(MANAGE_INDEX_PATHNAME);
            return;
        }
        popupWindow('http://localhost:3000/user/google', 'Google Auth', 500, 500);
    }

    const UserInfo = (
        <Dropdown menu={{items}}>
            <span style={{color: '#e8e8e8'}}>
                <UserOutlined/>
                {username}
                <Avatar src={<img src={picture} alt="avatar"/>}/>
            </span>
        </Dropdown>
    )

    const Login = <Button type="link" onClick={onClickLogin}>LogIn</Button>

    return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
