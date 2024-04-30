import { getLocalStorage } from '@/utils/tools';
import { ProFormFieldProps } from '@ant-design/pro-form/lib/components/Field';
import { useControllableValue, useDebounceFn } from 'ahooks';
import { Button, Form, message, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import merge from 'lodash/merge';
import { useCallback, useMemo, useState } from 'react';
import { Access } from 'umi';
import styles from './index.less';

type IUploadEntity = any

function deleteFileService(url: string) {
  return Promise.resolve({
    code: 0,
    message: '',
    data: url
  })
}
/**
 * @上传文件的表单
 * 支持文件自动转换、string回显名称；
 */
const ProFormUploadFile = (props: ProFormFieldProps) => {
  const [disabled, setDisabled] = useState(false);
  const { run } = useDebounceFn((v: any) => setDisabled(!!v), { wait: 200 });
  const { formItemProps, fieldProps, ...restProps } = useMemo(
    () =>
      merge(
        {
          formItemProps: {
            normalize: (v) => v[0]?.originFileObj,
            getValueProps: (v?: string | any) => {
              run(v);
              if (typeof v === 'string') {
                return { fileList: [{ name: v }] };
              }
              return v ? { fileList: [v] } : undefined;
            },
            getValueFromEvent({ fileList }) {
              return fileList;
            },
          },
        } as typeof props,
        props,
      ),
    [props],
  );
  return (
    <Form.Item {...restProps} {...formItemProps} className={styles['upload-file']}>
      {/* @ts-ignore */}
      <Upload
        {...fieldProps}
        beforeUpload={() => false}
        maxCount={1}
        showUploadList={disabled ? { showPreviewIcon: false } : false}
      >
        <Button >上传文件</Button>
      </Upload>
    </Form.Item>
  );
};

export default ProFormUploadFile;

/**
 * @上传文件的组件
 * 支持文件自动转换、string回显名称；
 */
export const ProUploadFile = (
  props: {
    value?: any;
    onChange?: (val: any) => void;
    onlyShowName?: boolean;
  } & UploadProps & { downloadLink?: string },
) => {

  const { value, onChange, onlyShowName, downloadLink, ...fieldProps } = props;
  const [file, onFileChange] = useControllableValue({ value, onChange });
  const fileList: any = useMemo(() => {
    if (typeof file === 'string') {
      return [{ name: file }];
    }
    return file ? [file] : undefined;
  }, [file]);
  return onlyShowName ? (
    <span>{value}</span>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Upload
        {...fieldProps}
        fileList={fileList}
        beforeUpload={() => false}
        className={styles['upload-file']}
        onChange={({ fileList }) => onFileChange(fileList[0]?.originFileObj)}
        maxCount={1}
        showUploadList={{ showPreviewIcon: false }}
      >
        <Button>上传文件</Button>
      </Upload>
      <Access accessible={!!(downloadLink && file)}>
        <Button type="link" href={downloadLink} target="_blank">
          下载附件
        </Button>
      </Access>
    </div>
  );
};

/**
 * @多文件上传组件
 */
export const MultipleProUploadFile = (props: { value?: IUploadEntity, onChange?: (val: IUploadEntity) => void, batchDownloadFlag?: boolean } & UploadProps) => {
  const { value, onChange, maxCount, batchDownloadFlag = false, ...fieldProps } = props
  const [file, onFileChange] = useControllableValue({ value, onChange })

  const fileList: IUploadEntity[] = useMemo(() => {
    return file ? file.map((item: string | File) =>
      typeof item === 'string'
        ? {
          name: handleFileName(item),
          uid: Math.random(),
          url: handleFileUrl(item), // 视频类型文件处理
          ...(item.includes(';') ? { fileUrl: item } : {}),
          status: 'done',
        }
        : item) : undefined;
  }, [file]);

  const handleDownloadFile = useCallback((file: UploadFile) => {
    const { url, name } = file
    if (!url) return message.error('文件获取失败')
    return downloadFun(url, name)
  }, [])

  const handleBatchDownload = () => {
    if (fileList?.length) {
      fileList.forEach(({ url, name }) => {
        // 通过iframe再加上a标签保证能下载，只用iframe对于非二进制类型的文件不起作用
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        const a = document.createElement('a')
        a.href = window.location.origin + url
        a.type = 'download'
        a.download = name
        iframe.appendChild(a)
        a.click()
        document.body.appendChild(iframe)
        setTimeout(() => {
          iframe.remove()
        }, 10 * 60 * 1000);
      })
    }
    return
  }

  const handleFileChange = (fileList: UploadFile<any>[]) => onFileChange(fileList?.map(item => (item.url ? item : {
    response: item.response,
    status: item?.response?.code === 0 ? 'done' : 'error',
    uid: item.uid,
    name: item.name,
    url: item?.response?.data
  })))

  return <div style={{ position: 'relative' }}>
    <Upload  {...fieldProps}
      headers={{ Authorization: 'Bearer ' + getLocalStorage('token') }}
      fileList={fileList as []}
      {...maxCount ? { maxCount } : {}}
      beforeUpload={() => {
        const len = fileList?.length ?? 0
        if (maxCount && maxCount <= len) {
          message.info(`最多上传${maxCount}个`);
          return false
        }
        return true
      }}
      onChange={({ fileList }) => handleFileChange(fileList)}
      multiple
      showUploadList={{
        showPreviewIcon: true,
        showDownloadIcon: batchDownloadFlag,
        showRemoveIcon: true
      }}
      onPreview={(file) => {
        let url = handleFileUrl(file?.url || '')
        return window.open(window.location.origin + url, '_target')
      }}
      onDownload={handleDownloadFile}
      onRemove={(res: UploadFile<IUploadEntity> & { fileUrl?: string }) => {
        if (res.url) {
          let url = res?.fileUrl ? res.fileUrl : res.url
          url = url.startsWith('/') ? url.slice(1) : url
          deleteFileService(url).then(({ code, message: msg }) => {
            if (code === 0) return true
            else { message.error(msg); return false }
          })
        }
        return true
      }}
    >
      <Button>上传文件</Button>
    </Upload>
    <Access accessible={batchDownloadFlag}>
      <Button style={{ position: 'absolute', top: 0, right: '-15px' }} type='link' className='batch-delete-btn' onClick={() => handleBatchDownload()}>批量下载</Button>
    </Access>
  </div>
};

const downloadFun = (url: string, name: string) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.style.height = '0px'
  a.href = window.location.origin + handleFileUrl(url)
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

}

export const handleFileUrl = (url: string) => {
  let result = url?.split(';').length > 1 ? url.split(';')[1] : url
  result = result.startsWith('/') ? result : ('/' + result)
  return result
}

export const handleFileName = (url: string) => url.split('/')[url.split('/').length - 1].split('_').slice(1).join('_')
