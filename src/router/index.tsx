import React, {lazy} from 'react'
import {createBrowserRouter} from 'react-router-dom'
import QuestionLayout from "../layouts/QuestionLayout";
import Edit from "../pages/question/Edit/index";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import ManageLayout from "../layouts/ManageLayout";
import List from '../pages/manage/List'

// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'

// 路由懒加载，拆分 bundle ，优化首页体积
// const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))
// const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: 'manage',
                element: <ManageLayout/>,
                children: [
                    {
                        path: 'list',
                        element: <List/>,
                    },
                ],
            },
            {
                path: '*', // 404 路由配置，都写在最后（兜底）
                element: <NotFound/>,
            },
        ],
    },
    {
        path: 'question',
        element: <QuestionLayout/>,
        children: [
            {
                path: 'edit/:id',
                element: <Edit/>,
            }
        ],
    },
    {
        path: '*', // 404 路由配置，都写在最后（兜底）
        element: <NotFound/>,
    },
])

export default router

// ------------ 分割线 ------------

// 常用的路由，常量
export const HOME_PATHNAME = '/';
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isAtHomePath(pathname: string) {
    return [HOME_PATHNAME].includes(pathname);
}

export function isNoNeedUserInfo(pathname: string) {
    return [HOME_PATHNAME].includes(pathname);
}
