// 导入文件流程组件
import { BaseResponse } from '@/services/entities';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, List, message, Modal, Row, Spin, Typography, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import moment from 'moment';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { utils, writeFile } from 'xlsx/dist/xlsx.mini.min';
// import xlsx from 'xlsx/dist/xlsx.mini.min';
import style from './index.less';


/**
 * 导入组件
 * @param props ImportProcessProps
 */
export default function ImportProcess(props: ImportProcessProps) {
    const { template, service, name, reload, tootip, accept = ".xls,.xlsx", validator } = props
    const [visible, setvisible] = useState(false);
    const [step, setstep] = useState(Step.START);
    const [result, setresult] = useState<ImportResult>({ success: 0, failed: [] })
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const fileRef = useRef<RcFile>()
    const beforeUpload = useCallback((file: RcFile, validate: ImportProcessProps['validator']) => {
        if (validate && !validate(file)) return Upload.LIST_IGNORE
        // setFileList([])
        fileRef.current = file
        return false
    }, [])
    const upload = useCallback(() => {
        if (!fileRef.current) return message.error('请选择文件！')
        setstep(Step.LOADING)
        service(fileRef.current).then(({ code, data, message: msg }) => {
            // 抛出错误，统一处理
            if (code !== 0) throw msg
            setresult(data)
            setstep(Step.END)
        }).catch(err => {// 发生错误
            message.error(err || '导入失败，请重试')
            setstep(Step.START)
        })
        return
    }, [])
    // 导入完成后，卸载此组件时重置列表，外层Modal需配置destroyOnClose属性
    const onCancel = useCallback(() => {
        step === Step.END && reload?.(true)
        setstep(Step.START)
        setFileList([])
        fileRef.current = undefined
        setvisible(false)
    }, [step])
    // 开始导入
    let BodyContent: ReactNode
    let footer: ReactNode
    if (step === Step.START) {
        BodyContent = <List className={style.start}>
            <Row className="title">请按模板标准格式导入数据</Row>
            <Row className="template-link"><Typography.Link href={template} download>下载导入模板</Typography.Link></Row>
            <Upload beforeUpload={f => beforeUpload(f, validator)} accept={accept}
                showUploadList={{ showRemoveIcon: false }}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList.slice(-1))} >
                <Button type="primary" ghost>选择文件</Button>
            </Upload>
            <span className="tooltip">{tootip}</span>
        </List>
        footer = <>
            <Button onClick={onCancel} >取消</Button>
            <Button onClick={upload} type="primary" >导入</Button>
        </>
    }
    // 导入中
    else if (step === Step.LOADING) {
        BodyContent = <List className={style.loading}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} tip="导入中" />
        </List>
        footer = null
    }
    // 导入结束
    else {
        const { success, failed } = result!
        BodyContent = <List className={style.end}>
            <Typography>导入完成，完成
                <Typography.Text style={{ padding: '0 4px' }} strong>{success}</Typography.Text>
                条，失败
                <Typography.Text style={{ padding: '0 4px' }} strong type={failed.length ? 'danger' : undefined}>{failed.length}</Typography.Text>
                条
            </Typography>
            {failed.length > 0 && <Typography.Link onClick={() => downloadFailResult(failed, name)}>下载失败日志</Typography.Link>}
        </List>
        footer = <Button onClick={onCancel} type="primary">确定</Button>
    }

    return <>
        <span onClick={() => setvisible(true)}>
            {props.children}
        </span>
        <Modal title={`导入${name}`} visible={visible} maskClosable={false} footer={footer}
            onCancel={onCancel}
        >
            {BodyContent}
        </Modal>
    </>
}
enum Step {
    START,
    LOADING,
    END
}
export type ImportResult = { success: number, failed: { index: number, reason: string }[] }
interface ImportProcessProps {
    template: string,
    name: string
    service: (file: RcFile) => Promise<BaseResponse<ImportResult>>,
    reload?: (resetIndex: boolean) => void,
    children?: ReactNode,
    tootip?: ReactNode
    accept?: string
    validator?: (file: RcFile) => boolean
}

function downloadFailResult(data: ImportResult['failed'], name: string) {

    // 自定义下载的header，注意是数组中的数组哦
    const Header = [['行号', '失败原因']];

    // 官方文档中的描述：converts an array of arrays of JS data to a worksheet.
    const headerWs = utils.aoa_to_sheet(Header);
    const ws = utils.sheet_add_aoa(headerWs,
        data.map(({ index, reason }) => [index, reason]),
        { origin: "A2" }
    );

    /* 新建空workbook，然后加入worksheet */
    const wb = utils.book_new();

    // 可以自定义下载之后的sheetname
    utils.book_append_sheet(wb, ws);

    /* 生成xlsx文件 */
    writeFile(wb, `${name}导入失败日志${moment().format('YYYYMMDDHHmmss')}.xlsx`);
}

interface UploadProcessProps {
    name: string
    service: (file: RcFile) => Promise<BaseResponse<undefined>>,
    reload?: (resetIndex?: boolean) => void,
    children?: ReactNode,
    tootip?: ReactNode
    accept?: string
    validator?: (file: RcFile) => boolean
}
/**
 * 上传文件，没有反馈的结果
 * @param props 
 * @returns 
 */
export function UploadProcess(props: UploadProcessProps) {
    const { service, name, reload, tootip, accept = ".xls,.xlsx", validator } = props
    const [visible, setvisible] = useState(false);
    const [step, setstep] = useState(Step.START);
    const [result, setresult] = useState(false)
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const fileRef = useRef<RcFile>()
    const beforeUpload = useCallback((file: RcFile, validate: ImportProcessProps['validator']) => {
        if (validate && !validate(file)) return Upload.LIST_IGNORE
        fileRef.current = file
        return false
    }, [])

    const upload = useCallback(() => {
        if (!fileRef.current) return message.error('请选择文件！')
        setstep(Step.LOADING)
        service(fileRef.current).then(({ code, message: msg }) => {
            setresult(code === 0)
            // 抛出错误，统一处理
            if (code !== 0) throw msg
            setstep(Step.END)
        }).catch(err => {// 发生错误
            message.error(err || '导入失败，请重试')
            setstep(Step.START)
        })
        return
    }, [])

    // 导入完成后，卸载此组件时重置列表，外层Modal需配置destroyOnClose属性
    const onCancel = useCallback(() => {
        step === Step.END && reload?.()
        setstep(Step.START)
        setFileList([])
        fileRef.current = undefined
        setvisible(false)
    }, [step])
    // 开始导入
    let BodyContent: ReactNode
    let footer: ReactNode

    if (step === Step.START) {
        BodyContent = <List className={style.start}>
            <Upload beforeUpload={f => beforeUpload(f, validator)} accept={accept}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList.slice(-1))}
            >
                <Button type="primary" ghost>选择文件</Button>
            </Upload>
            <span className="tooltip" >{tootip}</span>
        </List>
        footer = <>
            <Button onClick={onCancel} >取消</Button>
            <Button onClick={upload} type="primary">导入</Button>
        </>
    }
    // 导入中
    else if (step === Step.LOADING) {
        BodyContent = <List className={style.loading}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} tip="上传中" />
        </List>
        footer = null
    }
    // 导入结束
    else {
        BodyContent = <List className={style.end}>
            <Typography>{result ? '上传完成' : '上传失败'}</Typography>
        </List>
        footer = <Button onClick={onCancel} type="primary">确定</Button>
    }

    return <>
        <span onClick={() => setvisible(true)}>
            {props.children}
        </span>
        <Modal title={`上传${name}`} visible={visible} maskClosable={false} footer={footer}
            onCancel={onCancel}
        >
            {BodyContent}
        </Modal>
    </>
}