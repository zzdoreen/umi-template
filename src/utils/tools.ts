import { Modal, ModalFuncProps } from "antd";
import moment from "moment";

/**
 * 返回格式化的排序 {xxxOrder:: 'descend' | 'ascend'}
 * @param sorter 排序的字段、序号
 */
export function getProSorter(sorter: { [key: string]: 'descend' | 'ascend' | undefined }) {
    const field = Object.keys(sorter)[0]
    return field ?
        {
            [`${field}Order`]: sorter[field]
        }
        :
        {}
}

export function ModalConfirm(props: ModalFuncProps) {

    return Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        ...props
    })
}


/**
 * JSON序列化并本地存储
 * @param key 键名
 * @param val 值
 */
export function setLocalStorage(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
}
/**
 * 本地存储读取并反JSON序列化
 * @param key 键名
 * @param defaultValue 默认值，当反JSON序列化出错时返回该值
 */
export function getLocalStorage(key: string, defaultValue: any = null) {
    let result: any
    try {
        result = JSON.parse(window.localStorage.getItem(key) as string)
        if (result === null) throw '值为null，将返回默认值' //不存在时，返回默认值
    } catch {//避免缓存的原因，造成解析失败
        setLocalStorage(key, defaultValue)
        result = defaultValue
    } finally {
        return result
    }
}

/**
 * 根据字典与id，返回对应的文字
 * @param list 字典数组
 * @param id id
 */
export function getNameByListId(list: { name: string, id: number }[], id: number) {
    return list.find(e => e.id === id)?.name || ''
}

/**
 * 
 * @param list 字典表
 * @param available 可选的动态数组，默认为全部
 * @returns 用于protable的valueMap
 */
export function getvalueEnumMap(list: { label: string, value: number }[], availables?: number[]) {
    const m = new Map<number, string>()
    if (availables) {
        availables.forEach(value => {
            m.set(value, getNameByListId(list, value))
        })
    } else {
        list.forEach(({ label, value }) => {
            m.set(value, label)
        })
    }
    return m
}


/**
 * 格式化unix时间值
 * @param value 
 */
export const UnixTimeRender = (value: number, inValidText = '') => {
    if (!value) return '-'
    const m = moment.unix(value)
    if (m.isValid())
        return m.format('YYYY-MM-DD HH:mm:ss')
    return inValidText
}