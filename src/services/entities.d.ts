export interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}


export interface TableList<T> {
    total: number
    list: T[]
}