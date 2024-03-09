import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
    timeout: 10 * 1000,
})

instance.interceptors.request.use(
    config => {
        config.baseURL = 'http://localhost:3000';
        config.headers['Authorization'] = `Bearer ${getToken()}` // JWT
        return config
    },
    error => Promise.reject(error)
)


instance.interceptors.response.use(res => {
    const resData = (res.data || {}) as ResType
    const { success, statusCode, msg, result } = resData

    if (!success && statusCode !== 200) {
        // 错误提示
        if (msg) {
            message.error(msg)
        }

        throw new Error(msg)
    }

    return result as any;
})

export default instance

export type ResType = {

    success: boolean,
    statusCode: number,
    msg?: string,
    result: ResDataType,
}

export type ResDataType = {
    [key: string]: any
}
