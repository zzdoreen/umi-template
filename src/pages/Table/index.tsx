
import { ProColumns, ProFormDependency, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useCallback, useMemo, useRef, useState, } from 'react';
import ProTable, { ProFormModal, useProTable } from '@/components/ProTable';
import { callProTableData } from '@/services';
import { getListService, importService, exportService, addService, editService, delService } from '@/services/table';
import { ModalConfirm, UnixTimeRender, getvalueEnumMap } from '@/utils/tools';
import moment from 'moment';
import ImportProcess from '@/components/Common/ImportComponent';
import { ProUploadFile } from '@/components/Common/Upload/ProFormUploadFile';
import { TableListFormItem } from './components';

const TableList: React.FC<unknown> = () => {
  const currentSearchRef = useRef<object>()
  const [selectedArr, setSelectedArr] = useState<string[]>([]);

  const columns = useMemo(() => [
    {
      title: '名称',
      dataIndex: 'deviceId',
      tip: '名称是唯一的 key',
      // search: false
    },
    {
      title: '枚举类型',
      dataIndex: 'market',
      valueEnum: getvalueEnumMap([{ label: '类型一', value: 1 }, { label: '类型二', value: 2 }]),
      formItemProps: { rules: [{ required: true }] },
      fieldProps: {
        mode: 'multiple',
        maxTagCount: 'responsive'
      }
    },
    {
      title: '排序',
      dataIndex: 'market',
      // search: false,
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true },],
        addonAfter: '后缀',
        addonBefore: '前缀'
      },
      width: 100,
      fieldProps: { precision: 0, min: 1 }
    },
    {
      title: (_, type,) => type === 'form' ? 'emm form' : 'emm table',
      dataIndex: 'market',
      search: false,
      renderFormItem: () => <ProFormDependency name={['market']}>
        {
          ({ market }) => {
            if (market === 1 || (Array.isArray(market) && market[0] === 1))
              return <ProFormSelect name='type' options={[{ label: '类型一', value: 1 }, { label: '类型二', value: 2 }]} />
            else return <ProFormTextArea name='note' rules={[{ required: true }, { max: 15 }]} />
          }
        }
      </ProFormDependency>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: UnixTimeRender,
      hideInForm: true,
      width: 200,
      valueType: 'dateRange',
      search: {
        transform: (v) => {
          const [start, end] = v
          return {
            startAt: moment(start).startOf('day').unix(),
            endAt: moment(end).endOf('day').unix()
          }
        }
      }
    },
    {
      title: '文件',
      dataIndex: 'file',
      search: false,
      formItemProps: {
        rules: [{ required: true, message: '请上传图片' }]
      },
      renderFormItem: () => <ProUploadFile accept='.png' />,
      renderText: (_) => <Button type='link' target='_blank' href={_}>{_}</Button>
    },
    {
      title: 'table',
      dataIndex: 'table',
      search: false,
      hideInTable: true,
      renderFormItem: () => <TableListFormItem />
    },
    {
      dataIndex: 'id',
      hideInTable: true,
      search: false,
      formItemProps: { hidden: true }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, item) => <>
        <Button type="link" onClick={() => setModal({ visible: true, defaultFormValues: { ...item, file: 'http://xxx.png', table: [{ name: '1', sex: 2 }] }, title: '编辑' })} >编辑</Button>
        <Button type='link' danger onClick={() => onBatchDelete(item?.deviceId)}>删除</Button>
      </>
    },
  ] as ProColumns<any>[], []);

  const { proTableProps, proFormModalProps, setModal, reload, modal } = useProTable({
    columns,
    request: callProTableData(getListService),
  });

  const onSubmit = useCallback((item: any) => {
    const service = modal?.isAdd ? addService(item) : editService(item);
    return service.then(({ code, message: msg }) => {
      if (code === 0) {
        message.success(`${modal?.isAdd ? '新增' : '编辑'}成功`);
        reload(modal?.isAdd);
        setModal({ visible: false });
      } else
        message.error(msg || '操作失败');

    });
  }, [modal?.isAdd]);

  const formColumns: ProColumns<any, "text">[] = useMemo(() => {
    return proFormModalProps.columns.map(e => {
      if (e.dataIndex === 'status') {
        return {
          ...e,
          initialValue: 1,
          valueType: 'radio',
        }
      }
      return e
    })
  }, [proFormModalProps.columns])

  const onBatchDelete = useCallback((id?: string) => {
    ModalConfirm({
      content: id ? '确定删除此数据吗?' : `确定删除选中的${selectedArr?.length}项?`,
      onOk() {
        delService(id ? [id] : selectedArr).then(({ code, message: msg }) => {
          if (code === 0) {
            message.success('删除成功')
            setSelectedArr([])
            reload(true)
          } else message.error(msg || '删除失败')
        })
      }
    })
  }, [selectedArr])

  return <>
    <ProTable {...proTableProps} searchSpan={6} addText="新建" rowKey='deviceId'
      // 查询项默认展开
      search={{ defaultCollapsed: false }}
      beforeSearchSubmit={v => { currentSearchRef.current = v; return v }}
      extraActions={[<ImportProcess name='导入' template='' key='upload'
        service={importService} reload={reload} accept='.xlsx'
        tootip='仅支持xlsx格式文件，文件小于30MB'
        validator={f => {
          if (f.size > 30 * 1024 * 1024 || !/.xlsx$/.test(f.name)) {
            message.error("仅支持xlsx格式文件，文件小于30MB")
            return false
          }
          return true
        }}
      ><Button type="primary">导入数据</Button></ImportProcess>,
      <Button key='export' type='primary' onClick={() => exportService({ ...currentSearchRef.current })}>导出</Button>,
      <Button key='batchDel' danger disabled={selectedArr.length <= 0} type='primary' onClick={() => onBatchDelete()}>批量删除</Button>
      ]}
      scroll={{ y: 480 }}
      rowSelection={{
        onChange: (v) => setSelectedArr(v as string[]),
        selectedRowKeys: selectedArr,
        getCheckboxProps: () => ({ disabled: false })
      }}
    />
    <ProFormModal {...proFormModalProps} columns={formColumns} onSubmit={onSubmit as any} />
  </>
};

export default TableList;


    /* 
    const columns = [
    {
        title:'',  // 标签名称
        dataIndex:'', // 绑定字段
        ellipsis: true | false,
        valueEnum: [{label:'',value:''}],
        valueType:'text' | 'date' // 值类型 ...
        order: number // 表单中的权重 越大越靠前

        search: true | false | { transfer:(value)=>any }, // 搜索启用/隐藏
        // transfer 转化值的 key, 一般用于时间区间的转化
        search:{
            transform: (v?: [string, string]) => {
                    if (!v) return {}
                    const [s, e] = v
                    return {
                        startAt: moment(s).startOf('day').unix(),
                        endAt: moment(e).endOf('day').unix()
                    }
                }
         }


        colSize: number, // 表单占用格子数量 colSpan*span
        hideInSearch: true | false,
        hideInTable:true | false,
        hideInForm:true | false,
        initialValue:any, // 初始值

        // table的render
        renderText: (text,record,index,action)=>string,
        render: (text,record,index,action)=>ReactNode|ReactNode[],

        // 表单的输入组件 proFields / antd / 自定义组件
        renderFormItem: (item, ,form)=>RecatNode,
        // 表单配置
        fieldProps: {
            precision:1 // 精度 ... antd 表单组件相关配置
        },
        formItemProps: {  //  Form.Item 相关配置
            rules:[ 
                { required:true|false,message:'' },
                {
                   message:'',
                   validator: (record,value){
                      if(value)return Promise.resolve()
                      return Promise.reject()
                   }
               }
           ]
        }
    },
    ],

    valueType :
        password	密码输入框
        money	金额输入框
        textarea	文本域
        date	日期
        dateTime	日期时间
        dateWeek	周
        dateMonth	月
        dateQuarter	季度输入
        dateYear	年份输入
        dateRange	日期区间
        dateTimeRange	日期时间区间
        time	时间
        timeRange	时间区间
        text	文本框
        select	下拉框
        treeSelect	树形下拉框
        checkbox	多选框
        rate	星级组件
        radio	单选框
        radioButton	按钮单选框
        progress	进度条
        percent	百分比组件
        digit	数字输入框
        second	秒格式化
        avatar	头像
        code	代码框
        switch	开关
        fromNow	相对于当前时间
        image	图片
        jsonCode	代码框，但是带了 json 格式化
        color	颜色选择器
        cascader 级联选择器
    */