import axios, {ResDataType} from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
    const url = '/user/info'
    return (await axios.get(url)) as ResDataType;
}