


import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import QuestionLayout from "../layouts/QuestionLayout";
import Edit from "../pages/question/Edit/index";

// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'

// 路由懒加载，拆分 bundle ，优化首页体积
// const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'))
// const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'))

const router = createBrowserRouter([
    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            {
                path: 'edit/:id',
                element: <Edit />,
            }
        ],
    },
])

export default router

// ------------ 分割线 ------------

// 常用的路由，常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
    if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
    return false
}

export function isNoNeedUserInfo(pathname: string) {
    if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
    return false
}
