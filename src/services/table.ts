import { get } from ".";
import { TableList } from "./entities";

export function getListService(param: any) {
    return get<TableList<any>>('/v1/device/list', param)
}