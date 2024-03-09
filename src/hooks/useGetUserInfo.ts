import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

function useGetUserInfo() {
    const { username, picture, gmail } = useSelector<StateType>(state => state.user) as UserStateType
    return { username, picture, gmail }
}

export default useGetUserInfo
