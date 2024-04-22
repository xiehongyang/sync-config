import axios, { ResDataType } from './ajax'
// import type { ResDataType } from './ajax'

type SearchOption = {
    title: string
    isStar: boolean
    isDelete: boolean
    pageIndex: number
    pageSize: number
}

export async function createQuestionService(): Promise<ResDataType> {
    const url = '/works'
    const data = (await axios.post(url)) as ResDataType
    return data
}

export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/works/${id}`;
    const data =  (await axios.get(url)) as ResDataType;
    return data;
}

export async function updateQuestionService(id: string, opt: { [key: string]: any }): Promise<ResDataType> {
    const url = `/works/${id}`;
    const data = (await axios.patch(url, opt)) as ResDataType;
    return data;
}

export async function getQuestionListService(
    opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
    const url = '/works'
    const data = (await axios.get(url, { params: opt })) as ResDataType
    return data
}