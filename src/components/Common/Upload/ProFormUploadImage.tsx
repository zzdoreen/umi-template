import { PlusOutlined } from "@ant-design/icons";
import { ProFormFieldProps } from "@ant-design/pro-form/lib/components/Field";
import { useDebounceFn } from "ahooks";
import { Form, Upload } from "antd";
import { useMemo, useState } from "react";
import styles from './index.less';
import { merge } from "lodash";

/**
 * @上传图片的表单
 * 支持文件自动转换、string回显图片；
 * @已知问题 form表单中使用时，选择图片后有两三次闪烁(line:18 wait<220)。
 */
const ProFormUploadImage = (props: ProFormFieldProps) => {
    const [disabled, setDisabled] = useState(false);
    const { run } = useDebounceFn(
        (v: any) => setDisabled(!!v),
        { wait: 200 }
    )
    const { formItemProps, fieldProps, ...restProps } = useMemo(() => merge({
        formItemProps: {
            normalize: v => v.fileList[0]?.originFileObj,
            getValueProps: (v?: string | any) => {
                run(v)
                if (typeof v === 'string') {
                    return { fileList: [{ url: v }] }
                }
                return v ? { fileList: [{ originFileObj: v }] } : undefined
            }
        },
    } as typeof props, props), [props])
    return <Form.Item  {...restProps} {...formItemProps} className={styles['upload-image']} >
        {/* @ts-ignore */}
        <Upload {...fieldProps} listType="picture-card" accept="image/*"
            maxCount={1}
            showUploadList={disabled ? { showPreviewIcon: false } : false}
        >
            {!disabled && <PlusOutlined style={{ fontSize: 28 }} />}
        </Upload>
    </Form.Item>
}

export default ProFormUploadImage