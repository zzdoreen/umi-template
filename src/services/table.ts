import { ImportResult } from "@/components/Common/ImportComponent";
import { del, get, post, put } from ".";
import { TableList } from "./entities";

/**
 * 列表
 * @param param 
 * @returns 
 */
export function getListService(param: any) {
    return get<TableList<any>>('/v1/device/list', param)
}

/**
 * 导入
 * @param file 
 * @returns 
 */
export function importService(file: File) {
    const f = new FormData()
    f.append('file', file)
    return post<ImportResult>(`/import`, f);
}

/**
 * 导出
 * @param params 
 * @returns 
 */
export function exportService(params: object) {
    return get('/export', params)
}

/**
 * 新增
 * @param param 
 * @returns 
 */
export function addService(param: any) {
    return post('/device', param)
}

/**
 * 编辑
 * @param param 
 * @returns 
 */
export function editService(param: any) {
    return put('/device', param)
}

/**
 * 删除
 * @param ids 
 * @returns 
 */
export function delService(ids: string[]) {
    return del('/device', { ids })
}