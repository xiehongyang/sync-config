import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
    HOME_PATHNAME,
    isAtHomePath, isNoNeedUserInfo,
    MANAGE_INDEX_PATHNAME,
} from '../router/index'

function useNavPage(waitingUserData: boolean) {
    const { username } = useGetUserInfo()
    const { pathname } = useLocation()
    const nav = useNavigate()

    useEffect(() => {
        if (waitingUserData) return

        // already login
        if (username) {
            if (isAtHomePath(pathname)) {
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }

        // no login
        if (isNoNeedUserInfo(pathname)) {
            return
        } else {
            nav(HOME_PATHNAME)
        }
    }, [waitingUserData, username, pathname])
}

export default useNavPage
