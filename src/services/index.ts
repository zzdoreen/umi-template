import { OptionType } from '@/config/dictions';
import { getProSorter } from '@/utils/tools';
import protobuf from 'protobufjs';
import { request } from 'umi';
import { BaseResponse } from './entities';
// import { string2buffer } from './websocket';

export type paramsType = { [key: string]: any };


function post<T = undefined>(url: string, params: paramsType): Promise<BaseResponse<T>> {
    return request(url, {
        method: "POST",
        data: params,
    });
}

function get<T = undefined>(url: string, params?: paramsType): Promise<BaseResponse<T>> {
    return request(url, {
        method: "GET",
        params: params,
    });
}

function put<T = undefined>(url: string, params: paramsType): Promise<BaseResponse<T>> {
    return request(url, {
        method: "PUT",
        data: params,
    });
}

function del<T = undefined>(url: string, params: paramsType = {}): Promise<BaseResponse<T>> {
    return request(url, {
        method: "DELETE",
        params
    });
}

function deletes<T = undefined>(url: string, params: paramsType = {}): Promise<BaseResponse<T>> {
    return request(url, {
        method: "DELETE",
        data: params
    });
}

function callProTableData<T>(service: (params: any) => Promise<BaseResponse<{ list: T[], total: number }>>, onFail?: (m: string) => void) {
    return (params: any & Record<'current' | 'pageSize', number>, sorter = {}, filter = {}) => {
        const { current, pageSize, _timestamp, ...rest } = params
        return service({
            pageNum: current,
            pageSize,
            // ...(_timestamp ? {} : getPageQuery()), //不再需要 解决protable默认表单值初次查询不带上的bug,从url的query读取初始值
            ...rest,
            ...getProSorter(sorter)
        }).then(({ code, message, data }) => {
            if (code !== 0 && onFail) {
                onFail(message)
            }
            // ADD 未分页数据处理
            let list = [], total = 0

            if (Array.isArray(data) || !data) {
                list = data || []
                total = list.length
            } else {
                list = (data.list as []) || []
                total = data.total || 0
            }
            return ({
                data: list,
                total,
                success: code === 0
            })
        })
    }
}


function callOptionsData<T, P>(
    service: (params: P) => Promise<BaseResponse<T[]>>,
    mapFunc?: (item: T, index: number) => OptionType
) {
    return (params: P) => {
        return service(params).then(({ code, data }) => {
            if (code === 0)
                return mapFunc ? data.map(mapFunc) : data as any
            return [] as OptionType[]
        })
    }
}

/**
 * 获取protobuf类型对象
 */
let proto: {
    [key: string]: protobuf.Type
}

export async function getProto() {
    if (proto) return proto
    return protobuf.load("/protobuf/deliver.proto")
        .then(root => {
            const Authentication = root.lookupType("deliver.Authentication")
            const Consequence = root.lookupType("deliver.Consequence")
            const Heartbeat = root.lookupType("deliver.Heartbeat")
            const Warning = root.lookupType("deliver.Warning")
            const Rain = root.lookupType("deliver.Rain")
            const Control = root.lookupType("deliver.Control")
            const Rainfall = root.lookupType("deliver.Rainfall")
            const Judge = root.lookupType("deliver.Judge")
            const Earthquake = root.lookupType("deliver.CalEarlywarning")
            return proto = {
                Authentication,
                Consequence,
                Heartbeat,
                Warning,
                Control,
                Rain,
                Rainfall,
                Judge,
                Earthquake
            }
        })
}
/**
 * 将返回的protobuf二进制格式数据转成js对象
 */
/* async function arrayBufferToJSON(response: BaseResponse<string>, key: string) {
  const { code, data } = response
  if (code !== 0) return response
  const proto = await getProto()
  const FieldName = proto[key]
  return { code, data: FieldName.toObject(FieldName.decode(string2buffer(window.atob(data)))) }
}
 */
export {
    post, get, put, del, deletes, callProTableData, callOptionsData,
    // arrayBufferToJSON
};
