import React, {FC} from 'react'
import {Outlet} from 'react-router-dom'
import {Layout, Spin} from 'antd'
import Logo from '../components/Logo'
import styles from './MainLayout.module.scss'
import UserInfo from "../components/UserInfo";
import useLoadUserData from "../hooks/useLoadUserData";

const {Header, Content, Footer} = Layout

const MainLayout: FC = () => {
    const {waitingUserData} = useLoadUserData();
    return (
        <Layout>
            <Header className={styles.header}>
                <Logo/>
                <UserInfo/>
            </Header>
            <Layout className={styles.main}>
                <Content>
                    {waitingUserData ? (
                        <div style={{textAlign: 'center', marginTop: '60px'}}>
                            <Spin/>
                        </div>
                    ) : (<Outlet/>)}
                </Content>
            </Layout>
            <Footer className={styles.footer}>Sync Config &copy;2024 - present.</Footer>
        </Layout>
    )
}

export default MainLayout
